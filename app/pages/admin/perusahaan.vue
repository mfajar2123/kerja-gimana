<script setup lang="ts">
import { DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'
import { X } from '@lucide/vue'
interface AdminCompany { id: string; name: string; slug: string; industry: string; industry_slug: string; description: string; website: string | null; status: string; verified: boolean; featured: boolean; locations: Array<{ city: string }> }
const page = ref(1)
const companiesRequest = useFetch<{ items: AdminCompany[]; per_page: number }>('/api/admin', { query: computed(() => ({ section: 'companies', page: page.value })) })
const industriesRequest = useFetch<Array<{ name: string; slug: string }>>('/api/industries')
const [{ data, refresh, error, pending }, { data: industries }] = await Promise.all([companiesRequest, industriesRequest])
useListNavigation(page, pending, '.admin-queue')
const editing = ref<string | null>(null)
const busy = ref(false)
const editError = ref('')
const editErrorNode = ref<HTMLElement | null>(null)
let trigger: HTMLButtonElement | null = null
const form = reactive({ name: '', slug: '', industry: '', location: '', website: '', description: '', verified: false, featured: false })
function edit(company: AdminCompany, event: MouseEvent) {
  trigger = event.currentTarget as HTMLButtonElement
  editError.value = ''
  editing.value = company.id
  Object.assign(form, { name: company.name, slug: company.slug, industry: company.industry_slug, location: company.locations[0]?.city || '', website: company.website || '', description: company.description, verified: company.verified, featured: company.featured })
}
function closeEditor() { if (!busy.value) editing.value = null }
function restoreFocus(event: Event) {
  event.preventDefault()
  trigger?.focus({ preventScroll: true })
}
function focusEditor(event: Event) {
  event.preventDefault()
  document.getElementById('admin-company-name')?.focus({ preventScroll: true })
}
async function save() {
  if (busy.value || !editing.value) return
  busy.value = true
  editError.value = ''
  try { await $fetch(`/api/admin/companies/${editing.value}`, { method: 'PATCH', body: { ...form } }); await refresh(); noteCompany.value = editing.value; note.value = 'Profil tersimpan dan tercatat dalam audit.'; editing.value = null }
  catch (error) { editError.value = requestMessage(error); await nextTick(); editErrorNode.value?.focus() }
  finally { busy.value = false }
}
const note = ref('')
const noteCompany = ref<string | null>(null)
const updateCompany = async (company: AdminCompany) => { if (busy.value) return; busy.value = true; noteCompany.value = company.id; const approved = company.status === 'pending'; try { await $fetch('/api/admin/moderate', { method: 'POST', body: { kind: 'company', id: company.id, status: approved ? 'published' : 'rejected', reason: approved ? 'meets_guidelines' : 'unsupported_claim', note: approved ? 'Perusahaan ditinjau dan dikonfirmasi oleh moderator.' : 'Perlu konfirmasi tambahan sebelum tampil di direktori.' } }); note.value = approved ? 'Perusahaan disetujui.' : 'Status perusahaan diperbarui.'; await refresh() } catch (e: unknown) { note.value = requestMessage(e) } finally { busy.value = false } }
function requestMessage(error: unknown) { if (error && typeof error === 'object' && 'data' in error && error.data && typeof error.data === 'object' && 'statusMessage' in error.data && typeof error.data.statusMessage === 'string') return error.data.statusMessage; return 'Perubahan gagal disimpan.' }
useSeoMeta({ title: 'Perusahaan — KerjaGimana', robots: 'noindex,nofollow' })
</script>
<template>
<section class="app-page"><div class="page-shell"><p class="eyebrow"><span class="eyebrow-mark" /> MODERASI INTERNAL</p><header class="page-heading"><h1>Daftar perusahaan</h1><p>Periksa usulan dan tandai status verifikasi dengan bukti.</p></header><LoadError v-if="error" message="Daftar perusahaan belum bisa dimuat." :retrying="pending" @retry="refresh()" />
<div class="admin-queue" tabindex="-1" :aria-busy="pending"><article v-for="company in data?.items" :key="company.id" class="admin-item"><header><span class="admin-kind">{{ company.status }}</span><span>{{ company.industry }}</span></header><h2>{{ company.name }}</h2><p>{{ company.slug }} · {{ company.locations?.map(location => location.city).join(', ') || 'Lokasi belum ada' }}</p><footer><button class="button button-outline button-small" :disabled="busy" aria-haspopup="dialog" @click="edit(company, $event)">Edit profil</button><button v-if="company.status==='pending'" class="button button-red button-small" :disabled="busy" @click="updateCompany(company)">Setujui perusahaan</button><NuxtLink v-if="company.status==='approved'" :to="`/perusahaan/${company.slug}`" class="text-link">Lihat profil</NuxtLink></footer><p v-if="note && noteCompany === company.id" class="notice" role="status">{{ note }}</p></article></div><nav aria-label="Halaman perusahaan admin" class="pagination"><button class="button button-outline button-small" :disabled="page === 1 || pending || busy" @click="page--">Sebelumnya</button><span>Halaman {{ page }}</span><button class="button button-outline button-small" :disabled="pending || busy || (data?.items.length ?? 0) < (data?.per_page ?? 50) || page >= 1000" @click="page++">Berikutnya</button></nav></div>
<DialogRoot :open="!!editing" @update:open="value => { if (!value) closeEditor() }">
<DialogPortal><DialogOverlay class="editor-overlay" />
<DialogContent class="company-editor" @open-auto-focus="focusEditor" @close-auto-focus="restoreFocus" @pointer-down-outside.prevent @escape-key-down="event => { if (busy) event.preventDefault() }">
<header class="editor-heading"><div><DialogTitle as="h2">Edit profil perusahaan</DialogTitle><DialogDescription>{{ form.name }} · Perubahan dicatat dalam audit.</DialogDescription></div><button type="button" class="editor-close" aria-label="Tutup editor" :disabled="busy" @click="closeEditor"><X :size="20" aria-hidden="true" /></button></header>
<form class="product-form" :aria-busy="busy" @submit.prevent="save">
<p v-if="editError" ref="editErrorNode" class="notice notice-error" role="alert" tabindex="-1">{{ editError }}</p>
<fieldset class="editor-fields" :disabled="busy">
<div class="product-field"><label for="admin-company-name">Nama perusahaan</label><input id="admin-company-name" v-model="form.name" required minlength="2" maxlength="120"></div>
<div class="product-field"><label for="admin-company-slug">Slug</label><input id="admin-company-slug" v-model="form.slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxlength="150"></div>
<div class="product-field"><label for="admin-company-industry">Industri</label><select id="admin-company-industry" v-model="form.industry" required><option v-for="item in industries" :key="item.slug" :value="item.slug">{{ item.name }}</option></select></div>
<div class="product-field"><label for="admin-company-location">Kota kantor</label><input id="admin-company-location" v-model="form.location" required minlength="2" maxlength="100"><small>Lokasi baru ditambahkan; lokasi lama tetap tersimpan.</small></div>
<div class="product-field"><label for="admin-company-website">Website HTTPS (opsional)</label><input id="admin-company-website" v-model="form.website" type="url" maxlength="300"></div>
<div class="product-field"><label for="admin-company-description">Deskripsi</label><textarea id="admin-company-description" v-model="form.description" required minlength="20" maxlength="2000" rows="4" /></div>
<label class="choice-option"><input v-model="form.verified" type="checkbox">Bukti perusahaan sudah diverifikasi</label>
<label class="choice-option"><input v-model="form.featured" type="checkbox">Tampilkan sebagai pilihan direktori</label>
</fieldset>
<footer class="editor-actions"><button type="submit" class="button button-red" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan profil' }}</button><button type="button" class="button button-outline" :disabled="busy" @click="closeEditor">Batal</button></footer>
</form></DialogContent></DialogPortal></DialogRoot></section>
</template>
