<script setup lang="ts">
import { ArrowUpRight, MapPin } from '@lucide/vue'
import type { Company } from '#shared/types'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data } = useNuxtData<Company>(`company-${slug.value}`)
const company = computed(() => data.value)
useSeoMeta({
  title: () => company.value ? `${company.value.name} — KerjaGimana` : 'Perusahaan — KerjaGimana',
  description: () => company.value ? `Lihat informasi pengalaman kerja yang tersedia di ${company.value.name}.` : 'Cari informasi perusahaan di KerjaGimana.',
  ogTitle: () => company.value ? `${company.value.name} — KerjaGimana` : 'KerjaGimana',
})
const ratings = computed(() => [
  { label: 'Pengalaman keseluruhan', value: company.value?.ratings.overall },
  { label: 'Keseimbangan hidup', value: company.value?.ratings.work_life },
  { label: 'Kompensasi', value: company.value?.ratings.compensation },
  { label: 'Manajemen', value: company.value?.ratings.management },
  { label: 'Peluang berkembang', value: company.value?.ratings.career },
])
</script>

<template>
  <article v-if="company" class="page-editorial company-detail-page">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/perusahaan">Perusahaan</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ company.name }}</span></nav>
    <header class="company-hero-detail">
      <div class="company-detail-mark" aria-hidden="true">{{ company.name.slice(0, 1) }}</div>
      <div class="company-heading"><p class="company-industry">{{ company.industry }}</p><h1>{{ company.name }}</h1><p><MapPin :size="15" aria-hidden="true"/> {{ company.location || 'Lokasi belum tercatat' }}<span v-if="company.verified" class="verification-pill">DIVERIFIKASI</span></p></div>
      <a v-if="company.website" class="text-link" :href="company.website" target="_blank" rel="noopener noreferrer">Website resmi <ArrowUpRight :size="16" aria-hidden="true" /></a>
    </header>
    <p class="company-description">{{ company.description }}</p>

    <section class="company-rating-summary" aria-labelledby="rating-title">
      <div class="rating-overview"><span class="rating-number">{{ company.ratings.overall ?? '—' }}</span><span id="rating-title">{{ company.review_count ? `${company.review_count} review yang sudah dimoderasi` : 'Belum ada review yang diterbitkan' }}</span></div>
      <dl class="rating-breakdown"><div v-for="rating in ratings" :key="rating.label"><dt>{{ rating.label }}</dt><dd>{{ rating.value ?? 'Belum ada data' }}</dd></div></dl>
    </section>

    <CompanyTabs :slug="company.slug" />

    <section class="company-next-steps"><h2>Cari tahu lebih lanjut.</h2><p>Periksa informasi yang tersedia. Jika belum ada cukup data, kami akan menampilkannya apa adanya.</p><div class="company-next-links"><NuxtLink :to="`/perusahaan/${company.slug}/review`">Baca pengalaman kerja</NuxtLink><NuxtLink :to="`/perusahaan/${company.slug}/gaji`">Lihat ringkasan gaji</NuxtLink><NuxtLink :to="`/perusahaan/${company.slug}/interview`">Lihat cerita interview</NuxtLink></div></section>
    <aside class="contribution-prompt"><h2>Pengalamanmu bisa melengkapi ceritanya.</h2><NuxtLink class="button button-red" :to="`/tulis-review?company=${company.id}`">Tulis review</NuxtLink></aside>
  </article>
</template>
