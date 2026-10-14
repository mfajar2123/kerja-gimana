<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps<{ kind: string; title: string; intro: string }>()
interface ModerationItem { kind: string; id: string; created_at: string; data: Record<string, unknown> }
const page = ref(1)
const { data, refresh, pending, error } = await useFetch<{ items: ModerationItem[]; per_page: number }>('/api/admin', { query: computed(() => ({ section: 'queue', kind: props.kind, page: page.value })) })
useListNavigation(page, pending, '.admin-content')
const busy = ref<string | null>(null)
const notice = ref('')
const fail = ref('')
const feedback = ref<HTMLElement | null>(null)
async function revealFeedback() { await nextTick(); feedback.value?.focus() }
const moderate = async (item: ModerationItem, status: string) => {
  if (busy.value) return
  const note = window.prompt('Catatan internal moderator (minimal 10 karakter):')
  if (note === null) return
  if (note.trim().length < 10) { notice.value = ''; fail.value = 'Catatan perlu minimal 10 karakter.'; await revealFeedback(); return }
  busy.value = item.id; fail.value = ''; notice.value = ''
  const reason = status === 'published' ? 'meets_guidelines' : status === 'resolved' ? 'other' : 'unsupported_claim'
  try { await $fetch('/api/admin/moderate', { method: 'POST', body: { kind: item.kind, id: item.id, status, reason, note } }); notice.value = 'Keputusan moderasi tersimpan.'; await refresh() }
  catch (e: unknown) { fail.value = requestMessage(e, 'Perubahan belum tersimpan.') }
  finally { busy.value = null; await revealFeedback() }
}
watch(() => props.kind, () => { page.value = 1 })
const pretty = (value: unknown) => typeof value === 'string' ? value : JSON.stringify(value)
const fieldLabels: Record<string, string> = {
  company: 'Perusahaan', name: 'Nama', job_title: 'Jabatan', employment_start: 'Mulai bekerja', employment_end: 'Selesai bekerja',
  positives: 'Hal positif', improvements: 'Hal yang perlu diperbaiki', advice: 'Saran', role: 'Peran', location: 'Lokasi',
  amount: 'Gaji pokok (rupiah)', period: 'Periode penghasilan', basis: 'Basis penghasilan', position: 'Posisi', stages: 'Tahapan interview',
  questions: 'Pertanyaan interview', industry: 'Industri', website: 'Website', description: 'Deskripsi', reason: 'Alasan laporan',
  details: 'Detail laporan', review_id: 'Referensi ulasan', content: 'Isi tanggapan', evidence: 'Bukti kewenangan', email: 'Email balasan', subject: 'Topik', message: 'Pesan',
}
const ratingLabels: Record<string, string> = { overall: 'Rating keseluruhan', work_life: 'Keseimbangan hidup', compensation: 'Kompensasi', management: 'Manajemen', career: 'Perkembangan karier' }
function ratings(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []
  return Object.entries(value).filter(([key, score]) => key in ratingLabels && typeof score === 'number' && score >= 1 && score <= 5)
}
function requestMessage(error: unknown, fallback: string) {
  if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'statusMessage' in error.data && typeof error.data.statusMessage === 'string') return error.data.statusMessage
  return fallback
}
</script>
<template><section class="admin-content" tabindex="-1"><header class="page-heading"><h1>{{ title }}</h1><p>{{ intro }}</p></header><p v-if="notice" ref="feedback" tabindex="-1" class="notice" role="status">{{ notice }}</p><p v-if="fail" ref="feedback" tabindex="-1" class="notice notice-error" role="alert">{{ fail }}</p><LoadError v-if="error" message="Antrean belum bisa dimuat. Belum ada keputusan yang berubah." :retrying="pending" @retry="refresh()" /><p v-else-if="pending" class="field-hint">Memuat antrean…</p><div v-else-if="data?.items?.length" class="admin-queue"><article v-for="item in data.items" :key="item.kind + item.id" class="admin-item"><header><span class="admin-kind">{{ item.kind }}</span><time>{{ new Date(item.created_at).toLocaleString('id-ID') }}</time></header><h2>{{ item.data?.name || item.data?.company || item.data?.subject || 'Kiriman baru' }}</h2><dl><template v-for="(value,key) in item.data" :key="key"><template v-if="!['status','author_reference','ratings'].includes(String(key))"><dt>{{ fieldLabels[String(key)] || String(key).replaceAll('_',' ') }}</dt><dd>{{ pretty(value) }}</dd></template></template><template v-for="[key, score] in ratings(item.data.ratings)" :key="`rating-${key}`"><dt>{{ ratingLabels[key] }}</dt><dd>{{ score }} / 5</dd></template></dl><details v-if="item.data?.author_reference"><summary>Referensi akun (khusus moderator)</summary><code>{{ item.data.author_reference }}</code></details><footer><button v-if="!['report','contact'].includes(item.kind)" class="button button-red button-small" :disabled="!!busy" @click="moderate(item,'published')">{{ item.kind === 'representative' ? 'Verifikasi' : 'Setujui / tayangkan' }}</button><button class="button button-outline button-small" :disabled="!!busy" @click="moderate(item,'rejected')">Tolak</button><button v-if="item.kind==='report' || item.kind==='contact'" class="button button-outline button-small" :disabled="!!busy" @click="moderate(item,'resolved')">{{ item.kind === 'report' ? 'Tindak lanjuti & sembunyikan ulasan' : 'Tandai selesai' }}</button></footer></article></div><div v-else-if="!error && !pending" class="empty-state"><p>Antrean bersih. Belum ada kiriman yang perlu ditinjau.</p></div><nav aria-label="Halaman antrean moderasi" class="pagination"><button class="button button-outline button-small" :disabled="page === 1 || pending" @click="page--">Sebelumnya</button><span>Halaman {{ page }}</span><button class="button button-outline button-small" :disabled="pending || (data?.items.length ?? 0) < (data?.per_page ?? 50) || page >= 1000" @click="page++">Berikutnya</button></nav></section></template>
