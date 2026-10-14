<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const { viewer, busy, signOut } = useAccount()
const ready = ref(false)
onMounted(() => { ready.value = true })
const switchAccount = () => signOut('/masuk?next=%2Fadmin&status=switched-account')
function returnHome(event: MouseEvent) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  // Clear Nuxt's error state as well as changing the route. Modified clicks keep normal link behavior.
  return clearError({ redirect: '/' })
}
const title = computed(() => props.error.statusCode === 404 ? 'Halaman ini belum ada.' : props.error.statusCode === 403 ? 'Akses ini dibatasi.' : 'Sebentar, ada kendala.')
const explanation = computed(() => props.error.statusCode === 404
  ? 'Tautannya mungkin sudah berubah, atau perusahaan ini belum tersedia di direktori.'
  : props.error.statusCode === 403
    ? 'Akunmu belum memiliki akses ke halaman ini. Kembali ke beranda untuk melanjutkan.'
    : 'Halaman belum bisa dimuat. Coba kembali ke beranda dan ulangi sebentar lagi.')
useSeoMeta({ title: () => `${title.value} — KerjaGimana`, robots: 'noindex,nofollow' })
</script>

<template>
  <NuxtLayout>
    <section class="form-shell error-page" aria-labelledby="error-title">
      <p class="form-kicker"><span class="eyebrow-mark" />{{ error.statusCode }}</p>
      <h1 id="error-title">{{ title }}</h1>
      <p class="form-intro">{{ explanation }}</p>
      <template v-if="error.statusCode === 403 && viewer">
        <p class="form-intro">Kamu sedang masuk sebagai {{ viewer.display_name }}. Untuk memakai akun admin lain, keluar dari akun ini terlebih dahulu.</p>
        <UiButton variant="outline" :disabled="busy || !ready" @click="switchAccount">Keluar dan ganti akun</UiButton>
      </template>
      <NuxtLink class="button button-red" to="/" @click.capture="returnHome">Kembali ke beranda</NuxtLink>
    </section>
  </NuxtLayout>
</template>
