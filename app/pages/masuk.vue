<script setup lang="ts">
useSeoMeta({ title: 'Masuk — KerjaGimana', robots: 'noindex, nofollow' })
const route = useRoute()
const status = computed(() => {
  if (route.query.status === 'switched-account') return 'Akun sebelumnya sudah keluar. Silakan masuk dengan akun lain.'
  if (route.query.status === 'verification-failed') return 'Tautan verifikasi tidak lagi berlaku. Minta tautan baru atau coba masuk lagi.'
  if (route.query.status === 'access-denied') return 'Akun belum bisa masuk saat ini. Hubungi tim dukungan jika kamu butuh bantuan.'
  return ''
})
</script>
<template><div class="product-page"><p v-if="status" class="page-message" role="status">{{ status }}</p><AuthForm mode="login" /></div></template>
