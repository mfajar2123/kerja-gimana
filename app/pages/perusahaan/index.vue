<script setup lang="ts">
import { ArrowLeft, ArrowRight, Search, X } from '@lucide/vue'
import type { Company, DirectoryResult } from '#shared/types'
import { directorySchema } from '#shared/schemas'

useSeoMeta({ title: 'Cari perusahaan — KerjaGimana', description: 'Cari perusahaan dan lihat informasi kerja yang tersedia di KerjaGimana.' })
const route = useRoute()
const router = useRouter()
const query = reactive({ q: '', industry: '', location: '', page: 1 })
function readQuery() {
  return directorySchema.safeParse({ q: route.query.q ?? '', industry: route.query.industry ?? '', location: route.query.location ?? '', page: route.query.page ?? 1 })
}
const initialQuery = readQuery()
if (initialQuery.success) Object.assign(query, initialQuery.data)
let restoringRoute = false
watch(() => [query.q, query.industry, query.location], () => { if (!restoringRoute) query.page = 1 }, { flush: 'sync' })
watch(() => route.query, () => {
  const parsed = readQuery()
  if (!parsed.success) return
  restoringRoute = true
  Object.assign(query, parsed.data)
  restoringRoute = false
}, { flush: 'sync' })
const filterKey = computed(() => JSON.stringify(query))
const response = useFetch<DirectoryResult>('/api/companies', {
  query: computed(() => ({ ...query })), watch: [filterKey], key: 'company-directory',
})
const paginationStep = ref(0)
useListNavigation(paginationStep, response.pending, '.directory-results, .directory-page .empty-state')
const companies = computed<Company[]>(() => response.data.value?.companies ?? [])
const total = computed(() => response.data.value?.total ?? 0)
const lastPage = computed(() => Math.min(1000, Math.max(1, Math.ceil(total.value / 20))))
const industries = ref<Array<{ name: string; slug: string }>>([])
const statusText = computed(() => {
  if (response.status.value === 'pending') return 'Sedang memuat perusahaan…'
  if (response.error.value) return 'Direktori belum bisa dimuat. Coba lagi nanti.'
  if (response.data.value && !response.data.value.configured) return 'Direktori belum terhubung ke database. Tidak ada data buatan yang ditampilkan.'
  if (!total.value) return 'Belum ada perusahaan untuk filter ini.'
  return `Menampilkan ${Math.min((query.page - 1) * 20 + 1, total.value)}–${Math.min(query.page * 20, total.value)} dari ${total.value} perusahaan.`
})

const industryResult = await useFetch<Array<{ name: string; slug: string }>>('/api/industries', { key: 'directory-industries' })
industries.value = industryResult.data.value ?? []
watch(query, value => {
  const current = readQuery()
  if (current.success && JSON.stringify(current.data) === JSON.stringify(value)) return
  void router.replace({ query: Object.fromEntries(Object.entries(value).filter(([key, item]) => item && !(key === 'page' && item === 1))) })
}, { deep: true })
function clearFilters() { Object.assign(query, { q: '', industry: '', location: '', page: 1 }) }
function changePage(page: number) {
  if (response.pending.value || page < 1 || page > lastPage.value) return
  query.page = page
  paginationStep.value++
}
</script>

<template>
  <section class="page-editorial directory-page">

    <div class="directory-intro">
      <div><h1>Cari tahu<br><span class="type-red">sebelum memilih.</span></h1><p>Cari perusahaan untuk melihat pengalaman kerja dan informasi yang tersedia.</p></div>
      <NuxtLink class="text-link" to="/perusahaan/usulkan">Belum ada perusahaan? Usulkan <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
    </div>

    <form class="directory-filters" role="search" @submit.prevent="query.page = 1">
      <label class="directory-query" for="directory-q"><Search :size="17" aria-hidden="true"/><span class="sr-only">Cari nama perusahaan</span><input id="directory-q" v-model="query.q" maxlength="100" placeholder="Nama perusahaan"></label>
      <label class="directory-filter" for="directory-industry"><span class="sr-only">Filter bidang industri</span><select id="directory-industry" v-model="query.industry"><option value="">Semua bidang</option><option v-for="industry in industries" :key="industry.slug" :value="industry.slug">{{ industry.name }}</option></select></label>
      <label class="directory-filter" for="directory-location"><span class="sr-only">Filter lokasi</span><input id="directory-location" v-model="query.location" maxlength="100" placeholder="Kota"></label>
      <button type="button" class="clear-filter" :disabled="!query.q && !query.industry && !query.location" @click="clearFilters"><X :size="15" aria-hidden="true"/> Hapus filter</button>
    </form>

    <div v-if="response.error.value" class="form-notice form-notice-error" role="alert"><p>Direktori belum bisa dimuat. Filtermu tetap tersimpan.</p><button type="button" class="button button-outline button-small" :disabled="response.pending.value" @click="response.refresh()">Coba lagi</button></div>
    <p v-else-if="response.status.value === 'pending' || companies.length" class="directory-status" role="status" aria-live="polite">{{ statusText }}</p>
    <div v-if="!response.error.value && companies.length" class="directory-results" tabindex="-1" :aria-busy="response.pending.value">
      <NuxtLink v-for="company in companies" :key="company.id" class="directory-row" :to="`/perusahaan/${company.slug}`">
        <span class="company-initial" aria-hidden="true">{{ company.name.charAt(0).toUpperCase() }}</span>
        <span class="directory-row-main"><strong>{{ company.name }}</strong><small>{{ company.industry }}<template v-if="company.location"> · {{ company.location }}</template></small></span>
        <span class="directory-row-score"><strong>{{ company.ratings.overall ?? '—' }}</strong><small>{{ company.review_count }} review</small></span>
        <ArrowRight :size="17" aria-hidden="true"/>
      </NuxtLink>
    </div>
    <div v-else-if="!response.error.value && response.status.value !== 'pending'" class="empty-state" tabindex="-1">
      <p role="status">{{ statusText }}</p>
      <NuxtLink class="text-link" to="/perusahaan/usulkan">Usulkan perusahaan <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
    </div>
    <nav v-if="lastPage > 1" class="pagination" aria-label="Halaman direktori">
      <button type="button" :disabled="query.page <= 1 || response.pending.value" aria-label="Halaman sebelumnya" @click="changePage(query.page - 1)"><ArrowLeft :size="16" aria-hidden="true"/> Sebelumnya</button>
      <span>Halaman {{ query.page }} dari {{ lastPage }}</span>
      <button type="button" :disabled="query.page >= lastPage || response.pending.value" aria-label="Halaman berikutnya" @click="changePage(query.page + 1)">Berikutnya <ArrowRight :size="16" aria-hidden="true"/></button>
    </nav>
  </section>
</template>
