import assert from 'node:assert/strict'
import { createHash, randomBytes } from 'node:crypto'
import { loadEnvFile } from 'node:process'
import { readFile, writeFile } from 'node:fs/promises'
import { createClient } from '@supabase/supabase-js'

loadEnvFile('.env')
const client = createClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
assert.equal(new URL(process.env.NUXT_SUPABASE_URL).hostname, 'rqssvemdbysfuaspjhdt.supabase.co', 'Demo data is scoped to the authorized KerjaGimana project.')
const dataset = 'kerjagimana-demo-v1'
const manifestPath = '.demo-data.local.json'
let manifest = { dataset, accounts: [], records: {} }
try { manifest = JSON.parse(await readFile(manifestPath, 'utf8')); assert.equal(manifest.dataset, dataset) } catch (error) { if (error.code !== 'ENOENT') throw error }
const checked = (result, label) => { assert.equal(result.error, null, `${label}: ${result.error?.message || ''}`); return result.data }
function id(label) {
  const hash = createHash('sha256').update(`${dataset}:${label}`).digest('hex')
  return `${hash.slice(0,8)}-${hash.slice(8,12)}-5${hash.slice(13,16)}-a${hash.slice(17,20)}-${hash.slice(20,32)}`
}
async function save() { await writeFile(manifestPath, JSON.stringify(manifest, null, 2), { mode: 0o600 }) }
async function existingDemoUsers() {
  const users = []
  for (let page = 1; ; page++) {
    const data = checked(await client.auth.admin.listUsers({ page, perPage: 100 }), 'List demo accounts')
    users.push(...data.users.filter(user => user.app_metadata?.demo_dataset === dataset))
    if (data.users.length < 100) break
  }
  return users
}
async function seed(table, rows) {
  if (!rows.length) return
  manifest.records[table] = [...new Set([...(manifest.records[table] || []), ...rows.map(row => row.id)])]
  await save()
  checked(await client.from(table).upsert(rows.map(row => ({ ...row, created_at: fixtureTime }))), `Seed ${table}`)
}
if (process.argv.includes('--clean')) {
  // Only IDs from this private manifest and accounts with a server-owned demo tag.
  for (const table of ['audit_logs','moderation_actions','company_responses','review_reports','review_ratings','salary_reports','interview_experiences','reviews','company_representatives','contact_messages','company_locations','companies']) {
    const ids = manifest.records[table] || []
    if (ids.length) checked(await client.from(table).delete().in(table === 'review_ratings' ? 'review_id' : 'id', ids), `Clean ${table}`)
  }
  for (const user of await existingDemoUsers()) checked(await client.auth.admin.deleteUser(user.id), 'Clean tagged demo user')
  manifest = { dataset, accounts: [], records: {} }; await save()
  let env = await readFile('.env', 'utf8')
  env = env.replace(/^NUXT_PUBLIC_DEMO_DATA_ENABLED=.*$/m, 'NUXT_PUBLIC_DEMO_DATA_ENABLED=false')
  await writeFile('.env', env)
  console.log('Removed only this demo dataset. Existing user data was preserved.')
  process.exit(0)
}

const existing = await existingDemoUsers()
for (const [index, name] of ['pengguna-1','pengguna-2','pengguna-3','pengguna-4','pengguna-5','pengguna-6','wakil','admin','ditangguhkan'].entries()) {
  const email = `${name}@kerjagimana-demo.example`
  const saved = manifest.accounts.find(account => account.email === email)
  const password = saved?.password || `Demo!${randomBytes(24).toString('base64url')}`
  let user = existing.find(account => account.email === email)
  if (!user) user = checked(await client.auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { demo_dataset: dataset } }), 'Create tagged demo account').user
  else if (!saved) checked(await client.auth.admin.updateUserById(user.id, { password }), 'Set demo password')
  const account = { id: user.id, email, password, role: name === 'admin' ? 'admin' : 'user', status: name === 'ditangguhkan' ? 'suspended' : 'active' }
  const savedIndex = manifest.accounts.findIndex(item => item.email === email)
  if (savedIndex < 0) manifest.accounts.push(account)
  else manifest.accounts[savedIndex] = account
  await save()
  checked(await client.from('profiles').update({ display_name: `DEMO ${name}`, role: account.role, status: account.status }).eq('id', user.id), 'Update demo profile')
  assert.equal(manifest.accounts[index].email, email)
}
const users = manifest.accounts
const fixtureTime = new Date().toISOString()
const admin = users[7].id
const representative = users[6].id
const industries = checked(await client.from('industries').select('id,slug'), 'Industry taxonomy')
const industry = slug => { const item = industries.find(row => row.slug === slug); assert.ok(item, `Industry ${slug}`); return item.id }
const companies = [
  ['aurora-teknologi','Aurora Teknologi','teknologi','Jakarta','approved'],
  ['lentera-kreatif','Lentera Kreatif','media-kreatif','Bandung','approved'],
  ['cakrawala-logistik','Cakrawala Logistik','logistik-transportasi','Surabaya','approved'],
  ['usulan-nusantara','Usulan Nusantara','teknologi','Yogyakarta','pending'],
  ['usulan-ditolak','Usulan Ditolak','teknologi','Semarang','rejected'],
].map(([slug,name,category,city,status], index) => ({ id: id(`company-${index}`), name: `DEMO — ${name}`, slug: `demo-${slug}`, industry_id: industry(category), description: 'DATA DEMO FIKTIF untuk pengujian KerjaGimana. Perusahaan ini bukan organisasi nyata. Informasi kerja dan seluruh kontribusinya merupakan simulasi.', website: `https://${slug}.example`, status, verified: index === 0, featured: index < 2, created_by: users[5].id, city }))
// Refuse to overwrite a record outside this dataset, even if a slug was reused.
for (const company of companies) {
  const prior = checked(await client.from('companies').select('id,name,created_by').eq('slug',company.slug).maybeSingle(), 'Check demo slug')
  assert.ok(!prior || (prior.id === company.id && prior.name.startsWith('DEMO') && prior.created_by === users[5].id), 'A demo slug belongs to another dataset; stopping.')
}
await seed('companies', companies.map(company => Object.fromEntries(Object.entries(company).filter(([key]) => key !== 'city'))))
await seed('company_locations', companies.map((company,index) => ({ id: id(`location-${index}`), company_id: company.id, city: company.city, province: company.city === 'Jakarta' ? 'DKI Jakarta' : 'Provinsi demo', status: company.status === 'approved' ? 'approved' : company.status })))
const reviews = []
for (let c = 0; c < 3; c++) {
  for (let n = 0; n < (c === 0 ? 9 : 4); n++) {
    const status = n < (c === 0 ? 5 : 3) ? 'published' : n === 5 || (c > 0 && n === 3) ? 'pending' : n === 6 ? 'draft' : n === 7 ? 'rejected' : 'removed'
    reviews.push({ id: id(`review-${c}-${n}`), company_id: companies[c].id, author_id: users[n].id, job_title: `DEMO Analis ${n+1}`, employment_status: n % 2 ? 'former' : 'current', employment_start: 2022, employment_end: n % 2 ? 2025 : null, positives: 'DATA DEMO FIKTIF. Tim saling membantu, dokumentasi tersedia, dan jadwal diskusi disepakati bersama.', improvements: 'DATA DEMO FIKTIF. Koordinasi lintas tim dan kejelasan prioritas masih dapat ditingkatkan dalam simulasi ini.', advice: 'DATA DEMO FIKTIF. Tanyakan ekspektasi peran dan ritme kolaborasi saat proses seleksi.', status, published_at: status === 'published' ? fixtureTime : null, moderation_reason: ['published','rejected','removed'].includes(status) ? 'other' : null, moderation_note: ['published','rejected','removed'].includes(status) ? 'DEMO: keputusan sintetis untuk pengujian status moderasi.' : null })
  }
}
await seed('reviews', reviews)
const ratings = reviews.map((review,index)=>({ review_id: review.id, overall: 3+index%3, work_life: 3+index%2, compensation: 3+index%3, management: 3+index%2, career: 4 }))
manifest.records.review_ratings = ratings.map(row=>row.review_id); await save()
checked(await client.from('review_ratings').upsert(ratings), 'Seed ratings')
const salaries = []
for (let c = 0; c < 3; c++) for (let n = 0; n < (c === 0 ? 6 : 4); n++) for (const basis of c === 0 ? ['gross','take_home'] : ['gross']) {
  const yearly = n === 0
  const amount = (8_000_000 + n*1_000_000) * (basis === 'gross' ? 1 : 0.85)
  salaries.push({ id:id(`salary-${c}-${n}-${basis}`), company_id:companies[c].id, author_id:users[n].id, role:'Analis Data DEMO', location:companies[c].city, employment_type:'full_time', experience_level:'mid', base_salary_idr:yearly ? amount*12 : amount, salary_period:yearly ? 'yearly' : 'monthly', salary_basis:basis, allowances_idr_monthly:500_000, bonus_idr_yearly:2_000_000, status:n === 5 ? 'pending' : 'published', published_at:n === 5 ? null : fixtureTime })
}
for (const [index,status] of ['rejected','removed'].entries()) salaries.push({ ...salaries[0], id:id(`salary-${status}`), author_id:users[7+index].id, status, published_at:null })
await seed('salary_reports', salaries)
const interviews = []
for (let c = 0; c < 3; c++) for (let n = 0; n < 4; n++) interviews.push({ id:id(`interview-${c}-${n}`), company_id:companies[c].id, author_id:users[n].id, position:'DEMO Analis Produk', stages:'DATA DEMO FIKTIF: seleksi dokumen, diskusi awal, studi kasus, dan pembahasan bersama tim.', difficulty:3+n%2, experience:['positive','neutral','negative','neutral'][n], duration_days:14+n*7, questions:'DATA DEMO FIKTIF. Jelaskan cara menyusun prioritas dan mengevaluasi hasil sebuah proyek tim.', outcome:n === 0 ? 'offer' : n === 1 ? 'rejected' : 'unknown', status:n === 3 ? 'pending' : 'published', published_at:n === 3 ? null : fixtureTime })
await seed('interview_experiences', interviews)
await seed('company_representatives', [
  { id:id('rep-verified'),company_id:companies[0].id,author_id:representative,status:'verified',verification_evidence:'DEMO: bukti kewenangan sintetis, bukan dokumen identitas nyata.',verified_by:admin,verified_at:fixtureTime },
  { id:id('rep-pending'),company_id:companies[1].id,author_id:users[5].id,status:'pending',verification_evidence:'DEMO: permintaan untuk menguji antrean verifikasi wakil perusahaan.' },
  { id:id('rep-rejected'),company_id:companies[2].id,author_id:users[4].id,status:'rejected',verification_evidence:'DEMO: contoh bukti tidak mencukupi untuk verifikasi perusahaan.' },
])
await seed('company_responses', ['published','pending','rejected','removed'].map((status,index)=>({ id:id(`response-${index}`),company_id:companies[0].id,review_id:reviews[index].id,author_id:representative,content:'DATA DEMO FIKTIF. Terima kasih atas masukan simulasi ini. Kami meninjau dokumentasi dan prioritas kerja bersama tim.',evidence:'DEMO: kewenangan sintetis yang hanya digunakan untuk QA.',status,published_at:status === 'published' ? fixtureTime : null })))
await seed('review_reports', ['pending','resolved','rejected'].map((status,index)=>({ id:id(`report-${index}`),review_id:reviews[index === 1 ? 8 : index].id,author_id:users[4].id,reason:'disputed_claim',details:'DATA DEMO FIKTIF. Laporan ini hanya menguji tindak lanjut moderator dan bukan tuduhan mengenai perusahaan nyata.',status,moderation_note:status === 'pending' ? null : 'DEMO: laporan sudah ditinjau untuk pengujian.',resolved_at:status === 'pending' ? null : fixtureTime })))
await seed('contact_messages', ['pending','resolved','rejected'].map((status,index)=>({ id:id(`contact-${index}`),author_id:users[index].id,email:users[index].email,subject:`DEMO — Bantuan akun ${index+1}`,message:'DATA DEMO FIKTIF. Pesan ini disimpan untuk menguji antrean bantuan, penanganan privasi, dan status penyelesaian.',status })))
const moderated = [...reviews.map(row=>({ ...row,kind:'review' })), ...salaries.map(row=>({ ...row,kind:'salary' })), ...interviews.map(row=>({ ...row,kind:'interview' }))].filter(row=>['published','rejected','removed'].includes(row.status))
await seed('moderation_actions', moderated.map(row=>({ id:id(`moderation-${row.id}`),actor_id:admin,content_type:row.kind,content_id:row.id,from_status:'pending',to_status:row.status,reason:'other',note:'DEMO: rekaman moderasi sintetis, dibuat khusus untuk pengujian fitur.' })))
await seed('audit_logs', moderated.map(row=>({ id:id(`audit-${row.id}`),actor_id:admin,action:'demo_seed',target_type:row.kind,target_id:row.id,metadata:{ demo_dataset:dataset,status:row.status } })))
let env = await readFile('.env','utf8')
env = /^NUXT_PUBLIC_DEMO_DATA_ENABLED=/m.test(env) ? env.replace(/^NUXT_PUBLIC_DEMO_DATA_ENABLED=.*$/m,'NUXT_PUBLIC_DEMO_DATA_ENABLED=true') : `${env.trimEnd()}\nNUXT_PUBLIC_DEMO_DATA_ENABLED=true\n`
await writeFile('.env',env)
console.log(JSON.stringify({ dataset, accounts:users.length, records:Object.fromEntries(Object.entries(manifest.records).map(([table,ids])=>[table,ids.length])), credentialsFile:manifestPath }))
