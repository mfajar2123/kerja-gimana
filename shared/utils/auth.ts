export interface AccountViewer {
  id: string
  email: string
  display_name: string
  role: 'user' | 'admin'
}

export const isAdminPath = (path: string) => path.toLowerCase() === '/admin' || path.toLowerCase().startsWith('/admin/')
export const isGuestPath = (path: string) => ['/masuk', '/daftar'].includes(path.toLowerCase().replace(/\/+$/, ''))
export const isPrivatePath = (path: string) => ['/dashboard', '/admin', '/tulis-review', '/lapor-gaji', '/cerita-interview', '/perusahaan/usulkan']
  .some(prefix => path.toLowerCase() === prefix || path.toLowerCase().startsWith(`${prefix}/`))

export function accountDestination(next: unknown, role: AccountViewer['role']) {
  const fallback = role === 'admin' ? '/admin' : '/dashboard'
  const unsafe = (value: string) => value.includes('\\') || Array.from(value).some(char => char.charCodeAt(0) < 32)
  if (typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//') || unsafe(next)) return fallback
  try {
    const url = new URL(next, 'https://kerjagimana.local')
    const path = decodeURIComponent(url.pathname)
    if (url.origin !== 'https://kerjagimana.local' || path.startsWith('//') || unsafe(path) ||
      isGuestPath(path.replace(/\/$/, '')) || path === '/api' || path.startsWith('/api/') || path.startsWith('/_') ||
      (isAdminPath(path) && role !== 'admin')) return fallback
    return `${url.pathname}${url.search}${url.hash}`
  } catch { return fallback }
}
