<script setup lang="ts">
import { ArrowLeft, ArrowRight, Search, X } from '@lucide/vue'
import type { ArticleDirectoryResult } from '#shared/articles'
import { articleDirectorySchema } from '#shared/schemas'

const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const canonical = computed(() => `${config.public.siteUrl.replace(/\/$/, '')}/artikel`)
useSeoMeta({
  title: 'Artikel dunia kerja dan karier — KerjaGimana',
  description: 'Artikel tentang dunia kerja Indonesia, gaji, lowongan, dan perkembangan karier dengan sumber yang jelas.',
  ogTitle: 'Artikel dunia kerja dan karier — KerjaGimana',
  ogDescription: 'Informasi dan cerita untuk memahami dunia kerja dengan lebih jernih.',
  ogType: 'website',
  ogUrl: canonical,
  ogImage: () => `${config.public.siteUrl.replace(/\/$/, '')}/images/articles/pasar-kerja.webp`,
  twitterCard: 'summary_large_image',
})
useHead({ link: [{ rel: 'canonical', href: canonical }] })

function readQuery() {
  return articleDirectorySchema.safeParse({
    q: route.query.q ?? '',
    category: route.query.category ?? '',
    page: route.query.page ?? 1,
  })
}

const initialQuery = readQuery()
const filters = reactive({ q: initialQuery.success ? initialQuery.data.q : '', category: initialQuery.success ? initialQuery.data.category : '', page: initialQuery.success ? initialQuery.data.page : 1 })
const debouncedQuery = ref(filters.q.trim())
let debounceTimer: ReturnType<typeof setTimeout> | undefined
let restoringRoute = false

watch(() => [filters.q, filters.category], () => { if (!restoringRoute) filters.page = 1 }, { flush: 'sync' })
watch(() => filters.q, (value) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => { debouncedQuery.value = value.trim() }, 250)
})

watch(() => route.query, () => {
  const parsed = readQuery()
  if (!parsed.success) return
  restoringRoute = true
  Object.assign(filters, parsed.data)
  debouncedQuery.value = parsed.data.q.trim()
  restoringRoute = false
}, { flush: 'sync' })

const response = useFetch<ArticleDirectoryResult>('/api/articles', {
  query: computed(() => ({ q: debouncedQuery.value, category: filters.category, page: filters.page })),
  key: 'article-directory',
})
const articles = computed(() => response.data.value?.articles ?? [])
const categories = computed(() => response.data.value?.categories ?? [])
const total = computed(() => response.data.value?.total ?? 0)
const lastPage = computed(() => Math.max(1, Math.ceil(total.value / (response.data.value?.pageSize ?? 9))))
watch(lastPage, pageCount => { if (filters.page > pageCount) filters.page = pageCount })
const statusText = computed(() => {
  if (response.status.value === 'pending') return 'Sedang memuat artikel…'
  if (response.error.value) return 'Artikel belum bisa dimuat. Coba lagi nanti.'
  if (!total.value) return 'Tidak ada artikel yang cocok dengan pencarian atau filter ini.'
  const from = (filters.page - 1) * (response.data.value?.pageSize ?? 9) + 1
  return `Menampilkan ${from}–${Math.min(filters.page * (response.data.value?.pageSize ?? 9), total.value)} dari ${total.value} artikel.`
})
const paginationStep = ref(0)
useListNavigation(paginationStep, response.pending, '.article-directory-results, .articles-page .empty-state')

watch(filters, (value) => {
  if (restoringRoute) return
  const current = readQuery()
  if (current.success && JSON.stringify(current.data) === JSON.stringify(value)) return
  const query = Object.fromEntries(Object.entries(value).filter(([key, item]) => item && !(key === 'page' && item === 1)))
  void router.replace({ query })
}, { deep: true })

function clearFilters() {
  Object.assign(filters, { q: '', category: '', page: 1 })
}

function changePage(page: number) {
  if (response.pending.value || page < 1 || page > lastPage.value) return
  filters.page = page
  paginationStep.value++
}

onBeforeUnmount(() => { if (debounceTimer) clearTimeout(debounceTimer) })
</script>

<template>
  <div class="articles-page">
    <header class="articles-hero section-pad">
      <nav class="article-breadcrumb" aria-label="Breadcrumb"><NuxtLink to="/">Beranda</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Artikel</span></nav>
      <p class="article-eyebrow">Jurnal KerjaGimana</p>
      <h1>Lebih tahu.<br><span class="type-red">Lebih siap.</span></h1>
      <p class="articles-hero-description">Kabar, data, dan sudut pandang untuk menemani perjalanan kariermu.</p>
    </header>
    <section class="articles-list section-pad" aria-labelledby="latest-articles">
      <div class="articles-list-heading"><div><h2 id="latest-articles">Artikel terbaru</h2><p>Wawasan yang bisa kamu bawa ke langkah berikutnya.</p></div></div>
      <form class="article-filters" role="search" @submit.prevent="filters.page = 1">
        <label class="article-search" for="article-q"><Search :size="17" aria-hidden="true"/><span class="sr-only">Cari artikel</span><input id="article-q" v-model="filters.q" type="search" maxlength="100" placeholder="Cari judul atau topik artikel"></label>
        <label class="article-category" for="article-category"><span class="sr-only">Filter kategori artikel</span><select id="article-category" v-model="filters.category"><option value="">Semua kategori</option><option v-for="category in categories" :key="category" :value="category">{{ category }}</option></select></label>
        <button type="button" class="article-clear" :disabled="!filters.q && !filters.category" @click="clearFilters"><X :size="15" aria-hidden="true"/> Hapus filter</button>
      </form>
      <div v-if="response.error.value" class="form-notice form-notice-error" role="alert"><p>Artikel belum bisa dimuat. Filtermu tetap tersimpan.</p><button type="button" class="button button-outline button-small" :disabled="response.pending.value" @click="response.refresh()">Coba lagi</button></div>
      <p v-else class="article-status" role="status" aria-live="polite">{{ statusText }}</p>
      <div v-if="articles.length" class="articles-grid article-directory-results" tabindex="-1" :aria-busy="response.pending.value">
        <ArticleCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
      <div v-else-if="!response.error.value && response.status.value !== 'pending'" class="empty-state article-empty" tabindex="-1">
        <p role="status">{{ statusText }}</p><button v-if="filters.q || filters.category" type="button" class="text-link" @click="clearFilters">Hapus pencarian dan filter <X :size="16" aria-hidden="true"/></button>
      </div>
      <nav v-if="lastPage > 1" class="pagination article-pagination" aria-label="Halaman artikel">
        <button type="button" :disabled="filters.page <= 1 || response.pending.value" aria-label="Halaman sebelumnya" @click="changePage(filters.page - 1)"><ArrowLeft :size="16" aria-hidden="true"/> Sebelumnya</button>
        <span>Halaman {{ filters.page }} dari {{ lastPage }}</span>
        <button type="button" :disabled="filters.page >= lastPage || response.pending.value" aria-label="Halaman berikutnya" @click="changePage(filters.page + 1)">Berikutnya <ArrowRight :size="16" aria-hidden="true"/></button>
      </nav>
    </section>
  </div>
</template>
