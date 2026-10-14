<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
const route = useRoute()
const { data, error, pending, execute } = await useFetch('/api/admin', { query: { section: 'overview' }, immediate: route.path === '/admin', watch: false })
watch(() => route.path, path => { if (path === '/admin') void execute() })
const statisticLabels: Record<string, string> = { published_reviews: 'Ulasan tayang', pending_reviews: 'Ulasan menunggu', pending_salaries: 'Laporan gaji menunggu', pending_interviews: 'Cerita interview menunggu', pending_reports: 'Laporan menunggu', pending_companies: 'Usulan perusahaan', pending_responses: 'Tanggapan menunggu', pending_representatives: 'Verifikasi menunggu', users: 'Pengguna', companies: 'Perusahaan', pending_contacts: 'Pesan menunggu' }
const links = [{ to: '/admin/review', title: 'Moderasi', note: 'Tinjau kiriman, laporan, dan permintaan.' }, { to: '/admin/perusahaan', title: 'Perusahaan', note: 'Periksa perusahaan dan kelola daftar.' }, { to: '/admin/laporan', title: 'Laporan', note: 'Tangani laporan dan sengketa.' }, { to: '/admin/pengguna', title: 'Pengguna', note: 'Kelola status akses akun.' }]
useSeoMeta({ title: 'Admin — KerjaGimana', robots: 'noindex,nofollow' })
</script>
<template>
  <div class="admin-layout">
    <nav v-if="route.path !== '/admin'" class="admin-section-nav" aria-label="Navigasi admin">
      <NuxtLink to="/admin">Ringkasan admin</NuxtLink>
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.title }}</NuxtLink>
    </nav>
    <NuxtPage v-if="route.path !== '/admin'" />
    <section v-else class="app-page">
      <div class="page-shell">

        <header class="page-heading"><h1>Ruang admin</h1><p>Tinjauan dilakukan manusia dan semua keputusan dicatat.</p></header>
        <LoadError v-if="error" message="Ringkasan admin belum bisa dimuat." :retrying="pending" @retry="execute()" />
        <p v-if="pending" class="field-hint" role="status">Memuat ringkasan admin…</p>
        <div v-if="!error && !pending" class="admin-stats"><div v-for="(value, key) in data" :key="key"><strong>{{ value }}</strong><span>{{ statisticLabels[String(key)] || 'Menunggu tinjauan' }}</span></div></div>
        <nav class="admin-links" aria-label="Bagian admin"><NuxtLink v-for="link in links" :key="link.to" :to="link.to"><span><strong>{{ link.title }}</strong><small>{{ link.note }}</small></span><ArrowUpRight :size="18" /></NuxtLink></nav>
      </div>
    </section>
  </div>
</template>
