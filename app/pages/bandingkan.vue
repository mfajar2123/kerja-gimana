<script setup lang="ts">
import { ArrowRight, Check, Plus, X } from '@lucide/vue'
import type { Company, DirectoryResult } from '#shared/types'
useSeoMeta({ title: 'Bandingkan perusahaan — KerjaGimana', description: 'Bandingkan informasi kerja dari dua atau tiga perusahaan yang sudah terdaftar di KerjaGimana.' })
const query = ref('')
const selectedCompanies = ref<Company[]>([])
const ids = computed(() => selectedCompanies.value.map(company => company.id))
const page = ref(1)
const searchQuery = ref('')
const selection = await useFetch<DirectoryResult>('/api/companies', {
  query: computed(() => ({ q: searchQuery.value, page: page.value })), key: 'comparison-available-companies',
})
const { data: compared, status, error, execute, clear } = await useFetch<Company[]>('/api/compare', {
  query: computed(() => ({ ids: ids.value.join(',') })), immediate: false, watch: false, key: 'company-comparison',
})
watch(ids, values => { if (values.length >= 2) void execute(); else clear() })
let timer: ReturnType<typeof setTimeout> | undefined
watch(query, value => { if (timer) clearTimeout(timer); timer = setTimeout(() => { searchQuery.value = value.trim(); page.value = 1 }, 220) })
onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
function toggle(company: Company) {
  if (ids.value.includes(company.id)) selectedCompanies.value = selectedCompanies.value.filter(item => item.id !== company.id)
  else if (ids.value.length < 3) selectedCompanies.value = [...selectedCompanies.value, company]
}
const comparisonMetrics = [
  { key: 'overall', label: 'Rating keseluruhan' }, { key: 'work_life', label: 'Keseimbangan hidup' },
  { key: 'compensation', label: 'Kompensasi' }, { key: 'management', label: 'Manajemen' }, { key: 'career', label: 'Peluang berkembang' },
]
</script>
<template>
  <section class="page-editorial compare-page">

    <header class="directory-intro"><div><h1>Dua pilihan.<br><span class="type-red">Lihat lebih jelas.</span></h1><p>Pilih dua atau tiga perusahaan. Setiap angka diambil dari informasi yang sudah tersedia.</p></div><span class="compare-count">{{ ids.length }} / 3 dipilih</span></header>
    <div class="compare-search"><label for="compare-search">Cari perusahaan</label><input id="compare-search" v-model="query" type="search" maxlength="100" placeholder="Ketik nama perusahaan"></div>
    <div v-if="selectedCompanies.length" class="compare-selection" role="group" aria-label="Perusahaan yang dipilih">
      <button v-for="company in selectedCompanies" :key="company.id" type="button" class="compare-selection-chip" :aria-label="`Batalkan pilihan ${company.name}`" @click="toggle(company)">{{ company.name }}<X :size="15" aria-hidden="true" /></button>
      <p v-if="ids.length === 3" role="status">Maksimal tiga perusahaan. Batalkan salah satu pilihan untuk menggantinya.</p>
    </div>
    <div v-if="selection.error.value" class="form-notice form-notice-error" role="alert"><p>Daftar perusahaan belum bisa dimuat. Pilihanmu tetap tersimpan.</p><button type="button" class="button button-outline button-small" :disabled="selection.status.value === 'pending'" @click="selection.refresh()">Coba lagi</button></div>
    <div class="compare-option-list">
      <label v-for="company in selection.data.value?.companies ?? []" :key="company.id" class="compare-option" :class="{ selected: ids.includes(company.id) }">
        <input type="checkbox" :checked="ids.includes(company.id)" :disabled="!ids.includes(company.id) && ids.length >= 3" @change="toggle(company)">
        <span class="company-initial" aria-hidden="true">{{ company.name.slice(0,1) }}</span><span><strong>{{ company.name }}</strong><small>{{ company.industry }} · {{ company.review_count }} review</small></span><Check v-if="ids.includes(company.id)" :size="17" aria-hidden="true"/><Plus v-else :size="17" aria-hidden="true"/>
      </label>
      <p v-if="selection.status.value === 'pending'" class="directory-status">Sedang mencari perusahaan…</p>
      <p v-else-if="!selection.error.value && !selection.data.value?.configured" class="directory-status">Direktori belum tersedia. Coba kembali sebentar lagi.</p>
      <p v-else-if="!selection.error.value && !selection.data.value?.companies.length" class="directory-status">Belum ada perusahaan yang cocok.</p>
      <p v-if="selection.data.value?.total && selection.data.value.total > 20" class="directory-status">Cari nama yang lebih spesifik untuk membandingkan perusahaan berikutnya.</p>
    </div>
    <div v-if="ids.length < 2" class="empty-state"><p>Pilih sedikitnya dua perusahaan untuk memulai perbandingan.</p></div>
    <div v-else-if="error" class="form-notice form-notice-error" role="alert"><p>Perbandingan belum bisa dimuat.</p><button type="button" class="button button-outline button-small" :disabled="status === 'pending'" @click="execute()">Coba lagi</button></div>
    <div v-else-if="status === 'pending'" class="directory-status" role="status">Sedang memuat perbandingan…</div>
    <section v-else-if="compared?.length" class="comparison-table-wrap" aria-label="Hasil perbandingan perusahaan, geser untuk melihat semua kolom" tabindex="0">
      <table class="comparison-table"><thead><tr><th scope="col">Informasi</th><th v-for="company in compared" :key="company.id" scope="col"><button type="button" class="compare-remove" :aria-label="`Hapus ${company.name} dari perbandingan`" @click="toggle(company)"><X :size="14" aria-hidden="true"/></button>{{ company.name }}</th></tr></thead><tbody>
        <tr v-for="metric in comparisonMetrics" :key="metric.key"><th scope="row">{{ metric.label }}</th><td v-for="company in compared" :key="company.id">{{ company.ratings[metric.key] === null ? 'Belum ada data' : `${company.ratings[metric.key]} / 5` }}</td></tr>
        <tr><th scope="row">Review diterbitkan</th><td v-for="company in compared" :key="company.id">{{ company.review_count }}</td></tr>
        <tr><th scope="row">Lokasi tercatat</th><td v-for="company in compared" :key="company.id">{{ company.location || 'Belum ada data' }}</td></tr>
        <tr><th scope="row">Ringkasan gaji</th><td v-for="company in compared" :key="company.id"><NuxtLink :to="`/perusahaan/${company.slug}/gaji`">{{ company.salary.length ? `${company.salary.length} kelompok gaji` : 'Belum cukup data' }} <ArrowRight :size="13" aria-hidden="true"/></NuxtLink></td></tr>
        <tr><th scope="row">Profil</th><td v-for="company in compared" :key="company.id"><NuxtLink :to="`/perusahaan/${company.slug}`">Lihat perusahaan <ArrowRight :size="13" aria-hidden="true"/></NuxtLink></td></tr>
      </tbody></table>
    </section>
  </section>
</template>
