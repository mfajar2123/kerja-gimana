<script setup lang="ts">
import { Search, TextSearch, Scale } from '@lucide/vue'

const steps = [
  { number: '01', title: 'Cari perusahaannya', body: 'Mulai dari nama perusahaan yang lagi kamu pertimbangkan.', icon: Search, to: '/perusahaan' },
  { number: '02', title: 'Baca pengalaman karyawan', body: 'Lihat cerita kerja, rentang gaji, dan proses interview yang sudah dimoderasi.', icon: TextSearch, to: '/panduan-review' },
  { number: '03', title: 'Bandingkan sebelum memilih', body: 'Pisahkan data yang tersedia dari informasi yang belum cukup.', icon: Scale, to: '/bandingkan' },
]
const active = ref(0)
const stepNodes: HTMLElement[] = []
let observer: IntersectionObserver | undefined
function setStepNode(node: unknown, index: number) {
  const element = node && typeof node === 'object' && '$el' in node ? node.$el : node
  if (import.meta.client && element instanceof HTMLElement) stepNodes[index] = element
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const focusedIndex = stepNodes.findIndex(node => node === document.activeElement)
    if (focusedIndex >= 0) {
      active.value = focusedIndex
      return
    }
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
    if (visible) active.value = Number((visible.target as HTMLElement).dataset.step)
  }, { rootMargin: '-25% 0px -45% 0px', threshold: [0.1, 0.4, 0.7] })
  stepNodes.forEach(node => observer?.observe(node))
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <section class="story-section section-pad" aria-labelledby="story-title">
    <div class="story-intro reveal">

      <h2 id="story-title">Biar langkah<br>berikutnya <span class="type-red">lebih yakin.</span></h2>
      <TypewriterDesc text="Informasi untuk bantu kamu menimbang. Pilihan akhirnya tetap milikmu." />
    </div>
    <div class="story-layout">
      <div class="story-visual" :class="`story-visual-step-${active + 1}`" aria-hidden="true">

        <Transition name="story-content" mode="out-in">
          <div :key="active" class="story-visual-content">
            <div class="story-emblem"><component :is="steps[active]?.icon" :size="46" :stroke-width="1.45" /></div>
            <p class="story-visual-title">{{ steps[active]?.title }}</p>
          </div>
        </Transition>
        <div class="story-meter"><span :style="{ width: `${((active + 1) / steps.length) * 100}%` }" /></div>
      </div>
      <div class="story-steps">
        <NuxtLink
          v-for="(step, index) in steps"
          :key="step.number"
          :ref="(el) => setStepNode(el, index)"
          class="story-step"
          :class="{ 'is-active': active === index }"
          :data-step="index"
          :to="step.to"
          @mouseenter="active = index"
          @focus="active = index"
        >

          <span class="story-step-content"><strong>{{ step.title }}</strong><span>{{ step.body }}</span></span>
          <span class="story-step-rule" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
