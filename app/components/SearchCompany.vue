<script setup lang="ts">
import { ArrowDownRight, ArrowRight, Search, X } from '@lucide/vue'
import type { Company, DirectoryResult } from '#shared/types'

const search = ref('')
const activeIndex = ref(-1)
const submittedQuery = ref('')
const focused = ref(false)
const { data, status, error, execute, clear } = useFetch<DirectoryResult>('/api/companies', {
  query: computed(() => ({ q: submittedQuery.value, page: 1 })),
  key: 'company-search-home',
  server: false, immediate: false, watch: false,
})
watch(submittedQuery, value => {
  if (value.length >= 2) void execute()
  else clear()
})
const matches = computed<Company[]>(() => data.value?.companies.slice(0, 5) ?? [])
const busy = computed(() => status.value === 'pending' || (search.value.trim().length >= 2 && submittedQuery.value !== search.value.trim()))
const suggestionOpen = computed(() => focused.value && search.value.trim().length >= 2)
const hasSuggestions = computed(() => suggestionOpen.value && !busy.value && !error.value && matches.value.length > 0)

let timer: ReturnType<typeof setTimeout> | undefined
watch(search, (value) => {
  activeIndex.value = -1
  if (timer) clearTimeout(timer)
  const query = value.trim()
  if (query.length < 2) {
    submittedQuery.value = ''
    return
  }
  timer = setTimeout(() => { submittedQuery.value = query }, 220)
})

function selectWithKeyboard(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    focused.value = false
    activeIndex.value = -1
    return
  }
  if (!matches.value.length || busy.value) return
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    focused.value = true
    activeIndex.value = (activeIndex.value + 1) % matches.value.length
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = activeIndex.value <= 0 ? matches.value.length - 1 : activeIndex.value - 1
  } else if (event.key === 'Enter' && activeIndex.value >= 0) {
    event.preventDefault()
    navigateTo(`/perusahaan/${matches.value[activeIndex.value]?.slug}`)
  }
}
function closeOnFocusOut(event: FocusEvent) {
  if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node | null)) focused.value = false
}
onBeforeUnmount(() => { if (timer) clearTimeout(timer) })
</script>

<template>
  <section id="cari" class="discovery-section section-pad" aria-labelledby="discovery-title">
    <div class="discovery-heading reveal">

      <h2 id="discovery-title">Lagi kepikiran<br><span class="type-red">perusahaan mana?</span></h2>
      <TypewriterDesc text="Ketik nama perusahaan untuk melihat informasi yang sudah tersedia." />
    </div>

    <div class="discovery-search-block reveal" @focusout="closeOnFocusOut">
      <div class="discovery-search" :class="{ 'is-searching': busy }">
        <Search :size="21" aria-hidden="true" />
        <label class="sr-only" for="home-company-search">Cari nama perusahaan</label>
        <input
          id="home-company-search"
          v-model="search"
          type="search"
          placeholder="Coba cari nama perusahaan..."
          autocomplete="off"
          role="combobox"
          aria-autocomplete="list"
          :aria-expanded="hasSuggestions"
          :aria-controls="hasSuggestions ? 'home-company-results' : undefined"
          :aria-activedescendant="hasSuggestions && activeIndex >= 0 ? `home-company-option-${activeIndex}` : undefined"
          aria-describedby="search-note"
          @focus="focused = true"
          @input="focused = true"
          @keydown="selectWithKeyboard"
        >
        <button v-if="search" class="search-clear" type="button" aria-label="Hapus pencarian" @click="search = ''">
          <X :size="18" aria-hidden="true" />
        </button>
        <NuxtLink v-else to="/perusahaan" class="search-submit" aria-label="Lihat direktori perusahaan">
          <ArrowRight :size="18" aria-hidden="true" />
        </NuxtLink>
      </div>
      <p id="search-note" class="search-note">
        <template v-if="error">Pencarian belum tersedia. Coba lagi sebentar lagi.</template>
        <template v-else-if="data && !data.configured">Direktori belum terhubung ke database. Belum ada hasil untuk ditampilkan.</template>
        <template v-else>Hasil dicari dari perusahaan yang sudah terdaftar.</template>
      </p>

      <ul v-if="suggestionOpen && busy" class="search-results" aria-label="Hasil pencarian" aria-busy="true">
        <li class="search-result-message">Lagi mencari perusahaan…</li>
      </ul>
      <ul v-else-if="suggestionOpen && !error && matches.length" id="home-company-results" class="search-results" role="listbox" aria-label="Perusahaan yang ditemukan">
        <li v-for="(company, index) in matches" :key="company.id">
          <NuxtLink
            :id="`home-company-option-${index}`"
            :to="`/perusahaan/${company.slug}`"
            class="search-result"
            role="option"
            :aria-selected="activeIndex === index"
            :class="{ 'is-active': activeIndex === index }"
          >
            <span class="company-initial" aria-hidden="true">{{ company.name.charAt(0).toUpperCase() }}</span>
            <span><strong>{{ company.name }}</strong><small>{{ company.industry }}<template v-if="company.location"> · {{ company.location }}</template></small></span>
            <ArrowDownRight :size="18" aria-hidden="true" />
          </NuxtLink>
        </li>
      </ul>
      <div v-else-if="suggestionOpen && data?.configured && !busy && !error && !matches.length" class="search-results search-result-message" role="status">
        Belum ada perusahaan yang cocok. <NuxtLink to="/perusahaan/usulkan">Usulkan perusahaan ini</NuxtLink>
      </div>

      <NuxtLink class="text-link discovery-directory" to="/perusahaan">Lihat direktori perusahaan <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
    </div>
  </section>
</template>
