<script setup lang="ts">
import { Flag } from '@lucide/vue'
import type { Company, PublicReview } from '#shared/types'
const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data: company } = useNuxtData<Company>(`company-${slug.value}`)
const page = ref(1)
const { data, pending, error } = await useFetch<{ reviews: PublicReview[]; total: number; page: number; per_page: number }>(
  () => `/api/companies/${encodeURIComponent(slug.value)}/reviews`, { query: computed(() => ({ page: page.value })), key: `reviews-${slug.value}` },
)
useListNavigation(page, pending, '.review-list, .company-data-page .empty-state')
useSeoMeta({ title: () => `Pengalaman kerja di ${company.value?.name ?? 'perusahaan'} — KerjaGimana`, description: () => `Baca pengalaman kerja yang telah dimoderasi di ${company.value?.name ?? 'perusahaan'}.` })
function reportReview(review: PublicReview) { navigateTo({ path: '/kontak', query: { tentang: review.id, kategori: 'review' } }) }
</script>

<template>
  <section v-if="company" class="page-editorial company-data-page">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/perusahaan">Perusahaan</NuxtLink><span>/</span><NuxtLink :to="`/perusahaan/${slug}`">{{ company.name }}</NuxtLink><span>/</span><span aria-current="page">Pengalaman kerja</span></nav>
    <header class="subpage-intro"><h1>Kerja di <span class="type-red">{{ company.name }}.</span></h1><p>{{ data?.total ?? 0 }} cerita yang telah dimoderasi. Review ditampilkan tanpa nama akun.</p></header>
    <CompanyTabs :slug="slug" />
    <p v-if="error" class="notice notice-error" role="alert">Pengalaman kerja belum dapat dimuat. Coba lagi nanti.</p>
    <p v-else-if="!data?.reviews.length" class="empty-state" tabindex="-1">Belum ada review yang diterbitkan. Cerita yang dikirim akan ditinjau moderator terlebih dahulu.</p>
    <div v-else class="review-list" tabindex="-1" :aria-busy="pending">
      <article v-for="review in data.reviews" :key="review.id" class="review-entry">
        <div class="review-meta"><div><strong>{{ review.job_title }}</strong><small>{{ review.employment_status === 'current' ? 'Masih bekerja' : 'Mantan karyawan' }} · {{ review.employment_start }}<template v-if="review.employment_end">–{{ review.employment_end }}</template></small></div><time>{{ review.published_month }}</time></div>
        <dl class="review-ratings"><div v-for="(value, rating) in review.ratings" :key="rating"><dt>{{ rating.replaceAll('_', ' ') }}</dt><dd>{{ value }} / 5</dd></div></dl>
        <div class="review-body"><div><h2>Yang berjalan baik</h2><p>{{ review.positives }}</p></div><div><h2>Yang bisa lebih baik</h2><p>{{ review.improvements }}</p></div><div v-if="review.advice"><h2>Saran</h2><p>{{ review.advice }}</p></div></div>
        <p class="review-context">Pengalaman ini ditulis oleh pengguna terverifikasi. Jabatan dan rentang waktu dibagikan penulis, tetap dapat membantu orang lain menebak identitasnya.</p>
        <div v-for="response in review.company_responses" :key="response.id" class="company-response"><div class="response-byline">TANGGAPAN PERUSAHAAN <time>{{ response.published_month }}</time></div><p>{{ response.content }}</p></div>
        <button class="report-link" type="button" @click="reportReview(review)"><Flag :size="14" aria-hidden="true"/> Laporkan review</button>
        <CompanyResponseForm :company-id="company.id" :review-id="review.id" />
      </article>
    </div>
    <nav v-if="data && data.total > data.per_page" class="pagination" aria-label="Halaman pengalaman kerja"><button type="button" :disabled="pending || page <= 1" @click="page--">← Sebelumnya</button><span>{{ pending ? 'Memuat…' : `Halaman ${page}` }}</span><button type="button" :disabled="pending || page * data.per_page >= data.total" @click="page++">Berikutnya →</button></nav>
  </section>
</template>
