import { describe, expect, it } from 'vitest'
import { accountDestination, isPrivatePath } from '../../shared/utils/auth'

describe('account navigation', () => {
  it('uses the correct home for each account and preserves legitimate destinations', () => {
    expect(accountDestination(undefined, 'user')).toBe('/dashboard')
    expect(accountDestination(undefined, 'admin')).toBe('/admin')
    expect(accountDestination('/tulis-review?company=abc#form', 'user')).toBe('/tulis-review?company=abc#form')
    expect(accountDestination('/admin/review?page=2', 'admin')).toBe('/admin/review?page=2')
    expect(accountDestination('/dashboard', 'admin')).toBe('/dashboard')
  })
  it.each(['https://evil.example', '//evil.example', '/\\evil.example', '/%2f%2fevil.example', '/%5cevil.example', '/masuk', '/daftar/', '/api/auth/logout', '/_nuxt/file', '/admin', '/%61dmin/review', '/%zz'])('prevents unsafe redirects and login loops for %s', next => {
    expect(accountDestination(next, 'user')).toBe('/dashboard')
  })
  it('protects route boundaries without treating similarly named public pages as private', () => {
    expect(isPrivatePath('/admin/review')).toBe(true)
    expect(isPrivatePath('/dashboard/pengaturan')).toBe(true)
    expect(isPrivatePath('/ADMIN/review')).toBe(true)
    expect(accountDestination('/ADMIN', 'user')).toBe('/dashboard')
    expect(isPrivatePath('/administrator')).toBe(false)
    expect(isPrivatePath('/perusahaan')).toBe(false)
  })
})
