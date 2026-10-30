<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!import.meta.client) return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')

  // Auto-play when entering viewport, pause when exiting to save resources
  if (!reduced.matches && 'IntersectionObserver' in window && containerRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        if (!videoRef.value || !entry) return
        if (entry.isIntersecting) {
          videoRef.value.play().catch(() => {})
        } else {
          videoRef.value.pause()
        }
      },
      { threshold: 0.25 }
    )
    observer.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="containerRef"
    class="video-section section-pad"
    aria-label="Video KerjaGimana"
  >
    <div class="video-player-wrap reveal">
      <video
        ref="videoRef"
        class="video-element"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        poster="/video/poster-20s.png"
        aria-label="Video promosi KerjaGimana: cari tahu dulu sebelum kerja di sana"
      >
        <source src="/video/kerjagimana-horizontal-20s-genz.mp4" type="video/mp4">
        Browser kamu tidak mendukung pemutar video HTML5.
      </video>
    </div>
  </section>
</template>
