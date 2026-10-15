<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
</script>

<template>
  <section id="kompas-ai" class="ai-preview-section section-pad" aria-labelledby="ai-preview-title" aria-describedby="ai-preview-status">
    <div class="ai-preview-copy reveal">
      <h2 id="ai-preview-title">Kompas <span class="type-red">Karier AI.</span></h2>
      <TypewriterDesc class="ai-preview-intro" text="Pahami cerita kerja, bandingkan pilihan, dan siapkan interview. Kami merencanakan asisten AI yang membantu kamu melihat gambaran besarnya, dengan rujukan ke sumber informasi." />
      <p id="ai-preview-status" class="ai-preview-status"><span lang="en">Coming soon.</span> Masih direncanakan, belum tersedia.</p>
      <NuxtLink class="text-link" to="/bandingkan">Bandingkan perusahaan sekarang <ArrowUpRight :size="17" aria-hidden="true" /></NuxtLink>
    </div>
  </section>
</template>
