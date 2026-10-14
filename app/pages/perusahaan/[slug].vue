<script setup lang="ts">
import type { Company } from '#shared/types'

// Keep the company record while switching sections; each child only loads its own content.
definePageMeta({ key: route => String(route.params.slug) })
const slug = String(useRoute().params.slug)
const { error } = await useFetch<Company>(`/api/companies/${encodeURIComponent(slug)}`, { key: `company-${slug}` })
if (error.value) throw createError({ statusCode: error.value.statusCode === 404 ? 404 : 503, statusMessage: error.value.statusCode === 404 ? 'Perusahaan tidak ditemukan.' : 'Layanan perusahaan belum tersedia.' })
</script>

<template>
  <NuxtPage />
</template>
