<script setup lang="ts">
const route = useRoute()
const mode = computed(() => route.query.mode === 'reset' ? 'reset' : 'recovery')
useSeoMeta({ title: () => mode.value === 'reset' ? 'Atur kata sandi — KerjaGimana' : 'Pulihkan akun — KerjaGimana', robots: 'noindex, nofollow' })
</script>
<template><div class="product-page"><AuthForm :mode="mode" /></div></template>
