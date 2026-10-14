<script setup lang="ts">
import type { Company, SalaryInsight } from '#shared/types'
const route = useRoute(); const slug = computed(() => String(route.params.slug))
const { data: company } = useNuxtData<Company>(`company-${slug.value}`)
const { data, error, pending, refresh } = await useFetch<SalaryInsight[]>(() => `/api/companies/${encodeURIComponent(slug.value)}/salaries`, { key: `salary-${slug.value}` })
const experienceLabels: Record<string, string> = { entry: 'Pemula', mid: 'Menengah', senior: 'Senior', lead: 'Pimpinan tim' }
const employmentLabels: Record<string, string> = { full_time: 'Penuh waktu', part_time: 'Paruh waktu', contract: 'Kontrak', internship: 'Magang' }
useSeoMeta({ title: () => `Ringkasan gaji ${company.value?.name ?? 'perusahaan'} — KerjaGimana`, description: () => `Ringkasan gaji yang telah dimoderasi di ${company.value?.name ?? 'perusahaan'}, bila sampelnya mencukupi.` })
</script>
<template>
  <section v-if="company" class="page-editorial company-data-page">
    <nav class="breadcrumbs" aria-label="Breadcrumb"><NuxtLink to="/perusahaan">Perusahaan</NuxtLink><span>/</span><NuxtLink :to="`/perusahaan/${slug}`">{{ company.name }}</NuxtLink><span>/</span><span aria-current="page">Informasi gaji</span></nav>
    <header class="subpage-intro"><h1>Gaji di <span class="type-red">{{ company.name }}.</span></h1><p>Angka ditampilkan sebagai median per bulan. Gross dan take home pay dihitung terpisah.</p></header>
    <CompanyTabs :slug="slug" />
    <p class="field-privacy-note">Hanya kelompok dengan setidaknya lima pelapor unik yang ditampilkan. Rentang sampel dibulatkan untuk membantu menjaga privasi.</p>
    <div v-if="error" class="form-notice form-notice-error" role="alert"><p>Ringkasan gaji belum bisa dimuat. Coba lagi untuk melihat data yang tersedia.</p><button type="button" class="button button-outline button-small" :disabled="pending" @click="refresh()">Coba lagi</button></div>
    <p v-else-if="pending" class="directory-status" role="status">Memuat ringkasan gaji…</p>
    <div v-else-if="data?.length" class="salary-table-wrap" role="region" aria-label="Ringkasan gaji, geser untuk melihat semua kolom" tabindex="0"><table class="salary-table"><caption>Median gaji pokok bulanan dalam rupiah, tanpa tunjangan dan bonus</caption><thead><tr><th scope="col">Peran</th><th scope="col">Lokasi</th><th scope="col">Status kerja</th><th scope="col">Pengalaman</th><th scope="col">Jenis gaji</th><th scope="col">Jumlah sampel</th><th scope="col">Median per bulan</th></tr></thead><tbody><tr v-for="(item,index) in data" :key="`${item.role}-${item.location}-${item.salary_basis}-${index}`"><td>{{ item.role }}</td><td>{{ item.location }}</td><td>{{ employmentLabels[item.employment_type] || item.employment_type }}</td><td>{{ experienceLabels[item.experience_level] || item.experience_level }}</td><td>{{ item.salary_basis === 'gross' ? 'Gross (sebelum potongan)' : 'Take home pay (setelah potongan)' }}</td><td>{{ item.sample_band }}</td><td>{{ new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(item.median_monthly) }}</td></tr></tbody></table></div>
    <p v-else class="empty-state">Belum ada kelompok gaji dengan cukup pelapor untuk menampilkan ringkasan.</p>
    <NuxtLink class="button button-red contribution-link" :to="`/lapor-gaji?company=${company.id}`">Bagikan informasi gaji</NuxtLink>
  </section>
</template>
