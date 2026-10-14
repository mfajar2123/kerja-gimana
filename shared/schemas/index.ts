import { z } from 'zod'

const text = (min = 1, max = 4000) => z.string().trim().min(min).max(max)
const uuid = z.uuid()
export const ratingSchema = z.coerce.number().int().min(1).max(5)
export const ratingsSchema = z.object({
  overall: ratingSchema, work_life: ratingSchema, compensation: ratingSchema,
  management: ratingSchema, career: ratingSchema,
}).strict()
export const reviewSchema = z.object({
  company_id: uuid, job_title: text(2, 100), employment_status: z.enum(['current', 'former']),
  employment_start: z.coerce.number().int().min(1970).max(new Date().getFullYear()),
  employment_end: z.coerce.number().int().min(1970).max(new Date().getFullYear()).nullable(),
  ratings: ratingsSchema, positives: text(30), improvements: text(30), advice: text(0, 2000).default(''),
  status: z.literal('pending').default('pending'),
}).strict().refine(v => v.employment_status === 'current' ? v.employment_end === null : v.employment_end !== null && v.employment_end >= v.employment_start,
  { message: 'Periode kerja belum sesuai.', path: ['employment_end'] })
export const salarySchema = z.object({
  company_id: uuid, role: text(2, 100), location: text(2, 100),
  employment_type: z.enum(['full_time', 'part_time', 'contract', 'internship']),
  experience_level: z.enum(['entry', 'mid', 'senior', 'lead']),
  base_salary: z.coerce.number().min(10000).max(10000000000),
  salary_period: z.enum(['monthly', 'yearly']), salary_basis: z.enum(['gross', 'take_home']),
  allowances: z.coerce.number().min(0).max(1000000000).default(0),
  bonus: z.coerce.number().min(0).max(1000000000).default(0),
}).strict()
export const interviewSchema = z.object({
  company_id: uuid, position: text(2, 100), stages: text(5, 2000),
  difficulty: ratingSchema, experience: z.enum(['positive', 'neutral', 'negative']),
  duration_days: z.coerce.number().int().min(0).max(365), questions: text(20, 4000),
  outcome: z.enum(['offer', 'rejected', 'withdrew', 'unknown']).default('unknown'),
}).strict()
export const companySchema = z.object({
  name: text(2, 120), industry: text(2, 80), location: text(2, 100),
  website: z.url().max(300).refine(v => {
    try { return new URL(v).protocol === 'https:' } catch { return false }
  }, 'Gunakan alamat HTTPS.').or(z.literal('')),
  description: text(20, 2000),
}).strict()
export const reportSchema = z.object({ review_id: uuid, reason: z.enum(['privacy', 'harassment', 'spam', 'disputed_claim']), details: text(20, 2000) }).strict()
export const responseSchema = z.object({ company_id: uuid, review_id: uuid.nullable(), content: text(30, 4000), evidence: text(20, 2000) }).strict()
export const contactSchema = z.object({ email: z.email().max(254), subject: text(3, 120), message: text(20, 4000) }).strict()
export const authSchema = z.object({ email: z.email().max(254), password: z.string().min(15).max(128) }).strict()
export const loginSchema = z.object({ email: z.email().max(254), password: z.string().min(1).max(128) }).strict()
export const moderationSchema = z.object({
  kind: z.enum(['review', 'salary', 'interview', 'company', 'report', 'response', 'representative', 'contact']), id: uuid,
  status: z.enum(['published', 'rejected', 'removed', 'resolved']),
  reason: z.enum(['meets_guidelines', 'privacy', 'spam', 'unsupported_claim', 'harassment', 'duplicate', 'other']),
  note: text(10, 2000),
}).strict()
export const directorySchema = z.object({
  q: text(0, 100).default(''), industry: text(0, 80).default(''), location: text(0, 100).default(''),
  page: z.coerce.number().int().min(1).max(1000).default(1),
}).strict()
