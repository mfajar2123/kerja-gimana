<script setup lang="ts">
import type { Company, PublicInterview } from '#shared/types'
const route = useRoute(); const slug = computed(() => String(route.params.slug))
const { data: company } = useNuxtData<Company>(`company-${slug.value}`)
const page = ref(1)
const { data, pending, error } = await useFetch<{ interviews: PublicInterview[]; total: number; page: number; per_page: number }>(
  () => `/api/companies/${encodeURIComponent(slug.value)}/interviews`, { key: `interviews-${slug.value}`, query: computed(() => ({ page: page.value })) },
)
useListNavigation(page, pending, '.interview-list, .company-data-page .empty-state')
useSeoMeta({ title: () => `Proses interview ${company.value?.name ?? 'perusahaan'} — KerjaGimana`, description: () => `Pengalaman interview yang dimoderasi di ${company.value?.name ?? 'perusahaan'}.` })
</script>
<template>
  <section v-if="company" class="page-editorial company-data-page">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/perusahaan">Perusahaan</NuxtLink><span>/</span><NuxtLink :to="`/perusahaan/${slug}`">{{ company.name }}</NuxtLink><span>/</span><span aria-current="page">Interview</span></nav>
    <header class="subpage-intro"><h1>Interview di <span class="type-red">{{ company.name }}.</span></h1><p>{{ data?.total ?? 0 }} cerita yang sudah dimoderasi. Nama dan akun pengguna tidak ditampilkan.</p></header>
    <CompanyTabs :slug="slug" />
    <p v-if="error" class="notice notice-error" role="alert">Cerita interview belum dapat dimuat. Coba lagi nanti.</p>
    <p v-else-if="!data?.interviews.length" class="empty-state" tabindex="-1">Belum ada cerita interview yang dapat ditampilkan.</p>
    <div v-else class="review-list interview-list" tabindex="-1" :aria-busy="pending"><article v-for="item in data.interviews" :key="item.id" class="review-entry"><div class="review-meta"><div><strong>{{ item.position }}</strong><small>{{ item.duration_days }} hari · Kesulitan {{ item.difficulty }}/5 · {{ { positive:'Positif', neutral:'Biasa saja', negative:'Kurang baik' }[item.experience] }}</small></div><span>{{ { offer:'Mendapat tawaran', rejected:'Tidak dilanjutkan', withdrew:'Mengundurkan diri', unknown:'Tidak disebutkan' }[item.outcome] }}</span></div><h2>Tahapan proses</h2><p>{{ item.stages }}</p><h2>Pertanyaan umum</h2><p>{{ item.questions }}</p></article></div>
    <nav v-if="data && data.total > data.per_page" class="pagination" aria-label="Halaman interview"><button type="button" :disabled="pending || page <= 1" @click="page--">← Sebelumnya</button><span>{{ pending ? 'Memuat…' : `Halaman ${page}` }}</span><button type="button" :disabled="pending || page * data.per_page >= data.total" @click="page++">Berikutnya →</button></nav>
    <NuxtLink class="button button-red contribution-link" :to="`/cerita-interview?company=${company.id}`">Bagikan pengalaman interview</NuxtLink>
  </section>
</template>
