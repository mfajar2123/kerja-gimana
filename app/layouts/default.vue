<script setup lang="ts">
import { ArrowUpRight, Menu, X } from '@lucide/vue'
import { isAdminPath } from '#shared/utils/auth'
import displayFont from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url'
import bodyFont from '@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2?url'

useHead({ link: [
  { rel: 'preload', as: 'font', type: 'font/woff2', href: displayFont, crossorigin: '' },
  { rel: 'preload', as: 'font', type: 'font/woff2', href: bodyFont, crossorigin: '' },
] })

const route = useRoute()
const { viewer, busy, actionError, signOut } = useAccount()
const inAdmin = computed(() => viewer.value?.role === 'admin' && isAdminPath(route.path))
const open = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
watch(() => route.fullPath, () => { open.value = false })
function toggleMenu() { open.value = !open.value }
function closeOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    open.value = false
    menuButton.value?.focus()
  }
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', closeOnEscape))

const publicLinks = [
  { to: '/perusahaan', label: 'Perusahaan' },
  { to: '/bandingkan', label: 'Bandingkan' },
  { to: '/artikel', label: 'Artikel' },
  { to: '/tentang', label: 'Tentang kami' },
]
const links = computed(() => inAdmin.value ? [
  { to: '/admin', label: 'Ringkasan' },
  { to: '/admin/review', label: 'Moderasi' },
  { to: '/admin/perusahaan', label: 'Perusahaan' },
  { to: '/admin/pengguna', label: 'Pengguna' },
] : publicLinks)
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="site-shell">
    <a class="skip-link" href="#main-content">Langsung ke konten</a>
    <header class="topbar" :class="{ 'admin-topbar': inAdmin }">
      <NuxtLink class="wordmark" to="/" aria-label="KerjaGimana, beranda">
        <span class="wordmark-symbol" aria-hidden="true">K<span>.</span></span>
        <span>kerja<span class="wordmark-light">gimana</span></span>
      </NuxtLink>

      <nav class="desktop-nav" aria-label="Navigasi utama">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
      </nav>

      <div class="nav-actions">
        <LazyAccountMenu v-if="viewer" />
        <NuxtLink v-else class="nav-login" to="/masuk">Masuk</NuxtLink>
        <NuxtLink class="button button-small button-red" :to="inAdmin ? '/admin/review' : '/tulis-review'">
          {{ inAdmin ? 'Antrean moderasi' : 'Tulis review' }} <ArrowUpRight :size="15" aria-hidden="true" />
        </NuxtLink>
        <button
          ref="menuButton"
          class="mobile-menu-button"
          type="button"
          :aria-expanded="open"
          aria-controls="mobile-navigation"
          :aria-label="open ? 'Tutup menu' : 'Buka menu'"
          @click="toggleMenu"
        >
          <X v-if="open" :size="22" aria-hidden="true" />
          <Menu v-else :size="22" aria-hidden="true" />
        </button>
      </div>

      <Transition name="menu">
      <nav v-if="open" id="mobile-navigation" class="mobile-nav" aria-label="Navigasi seluler">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</NuxtLink>
        <template v-if="viewer">
          <NuxtLink v-if="viewer.role === 'admin' && !inAdmin" to="/admin">Ruang admin</NuxtLink>
          <NuxtLink to="/dashboard">Dashboard saya</NuxtLink>
          <NuxtLink to="/dashboard/pengaturan">Profil dan pengaturan</NuxtLink>
          <button type="button" :disabled="busy" @click="signOut('/masuk?status=switched-account')">Keluar dan ganti akun</button>
        </template>
        <NuxtLink v-else to="/masuk">Masuk ke akun</NuxtLink>
        <NuxtLink v-if="!inAdmin" to="/tulis-review">Tulis review</NuxtLink>
      </nav>
      </Transition>
    </header>
    <p v-if="actionError" class="account-action-notice" role="alert">{{ actionError }}</p>

    <main id="main-content" :class="{ 'home-main': isHome }">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="footer-top">
        <div>
          <NuxtLink class="wordmark footer-mark" to="/" aria-label="KerjaGimana, beranda">
            <span class="wordmark-symbol" aria-hidden="true">K<span>.</span></span>
            <span>kerja<span class="wordmark-light">gimana</span></span>
          </NuxtLink>
          <p class="footer-tagline">Sebelum kerja di sana, cari tahu dulu.</p>
        </div>
        <nav class="footer-links" aria-label="Navigasi footer">
          <NuxtLink to="/perusahaan">Cari perusahaan</NuxtLink>
          <NuxtLink to="/bandingkan">Bandingkan</NuxtLink>
          <NuxtLink to="/panduan-review">Panduan review</NuxtLink>
          <NuxtLink to="/artikel">Artikel</NuxtLink>
          <NuxtLink to="/kontak">Kontak</NuxtLink>
          <NuxtLink to="/privasi">Privasi</NuxtLink>
          <NuxtLink to="/ketentuan">Ketentuan</NuxtLink>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} KerjaGimana</span>
      </div>
    </footer>
    <NuxtRouteAnnouncer />
  </div>
</template>
