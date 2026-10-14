<script setup lang="ts">
import { Search } from '@lucide/vue'
import type { Company, DirectoryResult } from '#shared/types'

const props = defineProps<{ modelValue: string; hint?: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const query = ref('')
const pickerId = `company-picker-${useId()}`
const searchTerm = ref('')
const { data, status, error, refresh } = await useFetch<DirectoryResult>('/api/companies', {
  query: computed(() => ({ q: searchTerm.value, page: 1 })),
  key: `company-picker-${useId()}`,
})
const { data: preselected } = await useAsyncData(`${pickerId}-selected`, async () => {
  if (!props.modelValue) return null
  return await $fetch<Company>(`/api/companies/by-id/${encodeURIComponent(props.modelValue)}`).catch(() => null)
}, { watch: [() => props.modelValue] })
const companies = computed<Company[]>(() => {
  const items = data.value?.companies ?? []
  return preselected.value && !items.some(item => item.id === preselected.value?.id) ? [preselected.value, ...items] : items
})
const selected = computed(() => companies.value.find(company => company.id === props.modelValue))
let debounce: ReturnType<typeof setTimeout> | undefined
watch(query, value => {
  if (debounce) clearTimeout(debounce)
  debounce = setTimeout(() => { searchTerm.value = value.trim() }, 220)
})
onBeforeUnmount(() => { if (debounce) clearTimeout(debounce) })
</script>

<template>
  <div class="picker-field">
    <label :for="pickerId">Perusahaan</label>
    <div class="picker-search">
      <Search :size="17" aria-hidden="true" />
      <input :id="pickerId" v-model="query" type="search" maxlength="100" placeholder="Cari nama perusahaan" autocomplete="off">
    </div>
    <select
      :value="modelValue"
      required
      aria-label="Pilih perusahaan"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>Pilih perusahaan dari direktori</option>
      <option v-for="company in companies" :key="company.id" :value="company.id">{{ company.name }}<template v-if="company.location"> · {{ company.location }}</template></option>
    </select>
    <LoadError v-if="error" message="Daftar perusahaan belum bisa dimuat." :retrying="status === 'pending'" @retry="refresh()" />
    <small v-else-if="selected">{{ selected.industry }}<template v-if="selected.location"> · {{ selected.location }}</template></small>
    <small v-else-if="status === 'pending'">Mencari perusahaan…</small>
    <small v-else-if="!data?.configured">Direktori belum tersedia. Coba kembali sebentar lagi.</small>
    <small v-else-if="query.trim().length >= 2 && !companies.length">Belum ditemukan. <NuxtLink to="/perusahaan/usulkan">Usulkan perusahaan ini.</NuxtLink></small>
    <small v-else>{{ hint || 'Perusahaan yang dipilih harus sudah ada di direktori.' }}</small>
  </div>
</template>
