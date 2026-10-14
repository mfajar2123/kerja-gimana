<script setup lang="ts">
const props = defineProps<{ slug: string }>()
const route = useRoute()
const links = computed(() => [
  { to: `/perusahaan/${props.slug}`, label: 'Ringkasan' },
  { to: `/perusahaan/${props.slug}/review`, label: 'Pengalaman kerja' },
  { to: `/perusahaan/${props.slug}/gaji`, label: 'Informasi gaji' },
  { to: `/perusahaan/${props.slug}/interview`, label: 'Interview' },
])
</script>

<template>
  <nav id="company-sections" class="company-tabs" aria-label="Informasi perusahaan">
    <NuxtLink v-for="link in links" :key="link.to" :to="link.to" :aria-current="route.path.replace(/\/$/, '') === link.to ? 'page' : undefined">{{ link.label }}</NuxtLink>
  </nav>
</template>
