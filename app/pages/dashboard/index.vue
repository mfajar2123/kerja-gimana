<script setup lang="ts">
import { ArrowUpRight, FileText, Settings2, ShieldCheck } from '@lucide/vue'

definePageMeta({ middleware: [] })
const meRequest = useFetch<{ id: string; email: string; display_name: string; role: string }>('/api/me')
const contributionsRequest = useFetch('/api/me/contributions')
const [{ data: me, error: meError, pending: mePending, refresh: refreshMe }, { data: contributions, refresh, error: contributionsError, pending }] = await Promise.all([meRequest, contributionsRequest])
const statusLabel: Record<string, string> = { pending: 'Menunggu tinjauan', published: 'Tayang', rejected: 'Ditolak', removed: 'Dihapus' }
const { signOut: logout, busy: loggingOut } = useAccount()
useSeoMeta({ title: 'Dashboard — KerjaGimana', robots: 'noindex,nofollow' })
</script>

<template>
  <section class="app-page">
    <div class="page-shell">

      <header class="page-heading dashboard-heading"><div><h1>Hai, {{ me?.display_name || 'teman' }}.</h1><p>Pantau kiriman dan catatan moderator. Ulasan terbit tidak menampilkan nama atau email akunmu.</p></div><UiButton variant="outline" class="button button-outline button-small" :disabled="loggingOut" @click="logout()">{{ loggingOut ? 'Sedang keluar…' : 'Keluar' }}</UiButton></header>
      <LoadError v-if="meError" message="Profil akun belum bisa dimuat." :retrying="mePending" @retry="refreshMe()" />
      <nav class="dashboard-nav" aria-label="Navigasi dashboard"><NuxtLink to="/dashboard"><ShieldCheck :size="17" /> Ringkasan</NuxtLink><NuxtLink to="/dashboard/review"><FileText :size="17" /> Kontribusi saya</NuxtLink><NuxtLink to="/dashboard/pengaturan"><Settings2 :size="17" /> Pengaturan</NuxtLink><NuxtLink v-if="me?.role === 'admin'" to="/admin">Admin</NuxtLink></nav>
      <section class="dashboard-panel"><div class="panel-heading"><div><h2>Kontribusi terbaru</h2></div><NuxtLink class="text-link" to="/dashboard/review">Lihat semua <ArrowUpRight :size="15" /></NuxtLink></div>
        <LoadError v-if="contributionsError" message="Aktivitas belum bisa dimuat. Kirimanmu tidak berubah." :retrying="pending" @retry="refresh()" />
        <p v-else-if="pending" role="status">Memuat aktivitas…</p>
        <div v-else-if="contributions?.items?.length" class="contribution-list"><article v-for="item in contributions.items.slice(0, 5)" :key="item.id" class="contribution-row"><div><strong>{{ item.company }}</strong><p>{{ item.kind === 'review' ? 'Ulasan tempat kerja' : item.kind === 'salary' ? 'Laporan gaji' : item.kind === 'interview' ? 'Cerita interview' : 'Usulan perusahaan' }} · {{ new Date(item.created_at).toLocaleDateString('id-ID') }}</p></div><span class="status-pill" :data-status="item.status">{{ statusLabel[item.status] || item.status }}</span></article></div>
        <div v-else class="empty-state"><FileText :size="26" /><p>Belum ada kontribusi. Ceritamu bisa membantu orang lain mengambil keputusan.</p><NuxtLink class="button button-red button-small" to="/tulis-review">Tulis ulasan</NuxtLink></div>
      </section>
      <section class="dashboard-callout"><div><h2>Identitasmu tetap pribadi.</h2><p>Ulasan yang tayang tidak memuat nama atau alamat email akunmu. Kamu bisa mengelola data dan menghapus akun kapan saja.</p></div><NuxtLink to="/dashboard/pengaturan" class="button button-outline">Kelola akun <ArrowUpRight :size="16" /></NuxtLink></section>
      <button class="text-link refresh-link" :disabled="pending" @click="refresh()">{{ pending ? 'Memuat…' : 'Perbarui aktivitas' }}</button>
    </div>
  </section>
</template>
