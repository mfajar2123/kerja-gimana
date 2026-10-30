import { describe, expect, it } from 'vitest'
import { authSchema, companySchema, moderationSchema, ratingsSchema, reviewSchema, salarySchema } from '../../shared/schemas'
import { detectPersonalInformation, monthlySalary, SALARY_MIN_SAMPLE } from '../../shared/constants/privacy'

const company = '00000000-0000-4000-8000-000000000001'
const reviewBase = {
  company_id: company, job_title: 'Analis', employment_status: 'former', employment_start: 2022, employment_end: 2024,
  ratings: { overall: 4, work_life: 3, compensation: 4, management: 3, career: 5 }, positives: 'Tim saling membantu dan proses kerja cukup jelas.',
  improvements: 'Jadwal rapat sering berubah dan perlu koordinasi yang lebih baik.',
}

describe('shared input rules', () => {
  it('accepts an omitted company website and rejects malformed or insecure URLs without throwing', () => {
    const base = { name: 'Perusahaan baru', industry: 'Teknologi', location: 'Jakarta', description: 'Keterangan perusahaan yang cukup panjang untuk validasi.' }
    expect(companySchema.safeParse({ ...base, website: '' }).success).toBe(true)
    expect(companySchema.safeParse({ ...base, website: 'https://example.com' }).success).toBe(true)
    expect(companySchema.safeParse({ ...base, website: 'not a URL' }).success).toBe(false)
    expect(companySchema.safeParse({ ...base, website: 'http://example.com' }).success).toBe(false)
  })

  it('rejects incomplete or out-of-range ratings', () => {
    expect(ratingsSchema.safeParse({ overall: 6, work_life: 3, compensation: 3, management: 3, career: 3 }).success).toBe(false)
    expect(ratingsSchema.safeParse({ overall: 4, work_life: 3, compensation: 3, management: 3, career: 3, author_id: 'leak' }).success).toBe(false)
  })

  it('requires consistent employment periods before a review is submitted', () => {
    expect(reviewSchema.safeParse(reviewBase).success).toBe(true)
    expect(reviewSchema.safeParse({ ...reviewBase, employment_status: 'current', employment_end: 2024 }).success).toBe(false)
    expect(reviewSchema.safeParse({ ...reviewBase, employment_end: null }).success).toBe(false)
    expect(reviewSchema.safeParse({ ...reviewBase, status: 'published' }).success).toBe(false)
    expect(reviewSchema.safeParse({ ...reviewBase, status: 'draft' }).success).toBe(false)
  })

  it('accepts only the documented user-facing moderation states', () => {
    const base = { kind: 'representative', id: company, status: 'published', reason: 'meets_guidelines', note: 'Bukti perusahaan sudah diperiksa oleh moderator.' }
    expect(moderationSchema.safeParse(base).success).toBe(true)
    expect(moderationSchema.safeParse({ ...base, kind: 'profile' }).success).toBe(false)
  })

  it('normalizes yearly salary without changing monthly values and keeps the minimum cohort at five', () => {
    expect(monthlySalary(120_000_000, 'yearly')).toBe(10_000_000)
    expect(monthlySalary(10_000_000, 'monthly')).toBe(10_000_000)
    expect(SALARY_MIN_SAMPLE).toBe(5)
    const salary = { company_id: company, role: 'Desainer', location: 'Bandung', employment_type: 'full_time', experience_level: 'mid', base_salary: 12_000_000, salary_period: 'monthly', salary_basis: 'gross' }
    expect(salarySchema.safeParse(salary).success).toBe(true)
    expect(salarySchema.safeParse({ ...salary, salary_basis: 'secret' }).success).toBe(false)
  })

  it('detects common personal contact details and enforces authentication password length', () => {
    expect(detectPersonalInformation('Hubungi saya di orang@example.com')).toBe(true)
    expect(detectPersonalInformation('Hubungi saya besok sore')).toBe(false)
    expect(authSchema.safeParse({ email: 'a@example.com', password: 'short' }).success).toBe(false)
    expect(authSchema.safeParse({ email: 'a@example.com', password: '1234567' }).success).toBe(false)
    expect(authSchema.safeParse({ email: 'a@example.com', password: '12345678' }).success).toBe(true)
    expect(authSchema.safeParse({ email: 'a@example.com', password: 'x'.repeat(129) }).success).toBe(false)
  })
})
