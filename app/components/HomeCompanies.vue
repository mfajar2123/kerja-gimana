<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from '@lucide/vue'
import type { Company, CompanyStatistics, DirectoryResult } from '#shared/types'

const section = ref<HTMLElement | null>(null)
const directoryRequest = useFetch<DirectoryResult>('/api/companies', { query: { page: 1 }, key: 'home-featured-companies', server: false, immediate: false, watch: false })
const statisticsRequest = useFetch<CompanyStatistics>('/api/statistics', { key: 'home-real-statistics', server: false, immediate: false, watch: false })
const { data: directory, error, pending } = directoryRequest
const { data: statistics } = statisticsRequest
const featuredCompanies = computed<Company[]>(() => directory.value?.companies.slice(0, 3) ?? [])
let observer: IntersectionObserver | undefined
async function load() {
  if (pending.value) return
  await Promise.all([directoryRequest.execute(), statisticsRequest.execute()])
}
onMounted(() => {
  if (!('IntersectionObserver' in window)) { void load(); return }
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) { observer?.disconnect(); void load() }
  }, { rootMargin: '600px' })
  if (section.value) observer.observe(section.value)
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section ref="section" class="featured-section section-pad" aria-labelledby="featured-title">
    <div class="featured-header reveal">
      <div><h2 id="featured-title">Mulai dari<br>perusahaan <span class="type-red">pilihanmu.</span></h2></div>
      <NuxtLink class="text-link" to="/perusahaan">Jelajahi direktori <ArrowRight :size="17" aria-hidden="true" /></NuxtLink>
    </div>
    <div class="featured-data reveal" :aria-busy="pending">
      <p v-if="!directory && !error" class="featured-empty" role="status">Memuat perusahaan…</p>
      <div v-else-if="error" class="featured-empty" role="alert"><p>Daftar perusahaan belum dapat dimuat.</p><button type="button" class="button button-outline" :disabled="pending" @click="load">{{ pending ? 'Memuat…' : 'Coba lagi' }}</button></div>
      <div v-else-if="featuredCompanies.length" class="featured-list">
        <NuxtLink v-for="company in featuredCompanies" :key="company.id" :to="`/perusahaan/${company.slug}`" class="featured-row">
          <span class="featured-initial" aria-hidden="true">{{ company.name.charAt(0).toUpperCase() }}</span>
          <span class="featured-meta"><strong>{{ company.name }}</strong><small>{{ company.industry }}<template v-if="company.location"> · {{ company.location }}</template></small></span>
          <span class="featured-score"><strong>{{ company.ratings.overall === null ? '—' : company.ratings.overall }}</strong><small>{{ company.review_count ? `${company.review_count} review` : 'Belum ada review' }}</small></span>
          <ArrowUpRight :size="19" aria-hidden="true" />
        </NuxtLink>
      </div>
      <p v-else class="featured-empty">
        <template v-if="directory && !directory.configured">Direktori belum terhubung. Saat ini belum ada data perusahaan yang bisa kami tampilkan.</template>
        <template v-else>Belum ada perusahaan yang terdaftar. <NuxtLink to="/perusahaan/usulkan">Usulkan perusahaan pertama.</NuxtLink></template>
      </p>
      <div v-if="statistics?.configured && (statistics.companies || statistics.reviews || statistics.salary_reports)" class="real-statistics" aria-label="Data tersedia di KerjaGimana">
        <div v-if="statistics.companies"><span>{{ statistics.companies }}</span><small>perusahaan tercatat</small></div>
        <div v-if="statistics.reviews"><span>{{ statistics.reviews }}</span><small>review terbit</small></div>
        <div v-if="statistics.salary_reports"><span>{{ statistics.salary_reports }}</span><small>laporan gaji dimoderasi</small></div>
      </div>
    </div>
  </section>
</template>
