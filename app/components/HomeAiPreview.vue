<script setup lang="ts">
import { ArrowUpRight, Compass, BookOpen, ListChecks, Scale } from '@lucide/vue'

const capabilities = [
  { icon: BookOpen, title: 'Pahami pola di balik cerita', text: 'Rencana ringkasan budaya kerja dari ulasan yang sudah dimoderasi, lengkap dengan tautan ke sumbernya.' },
  { icon: Scale, title: 'Bandingkan yang penting buatmu', text: 'Rencana perbandingan berdasarkan prioritasmu: keseimbangan hidup, perkembangan karier, atau kompensasi.' },
  { icon: ListChecks, title: 'Bawa pertanyaan yang lebih tepat', text: 'Rencana panduan pertanyaan interview dari informasi yang tersedia dan hal yang masih perlu kamu pastikan.' },
]
</script>

<template>
  <section id="kompas-ai" class="ai-preview-section section-pad" aria-labelledby="ai-preview-title" aria-describedby="ai-preview-status">
    <div class="ai-preview-top">
      <span class="eyebrow"><Compass :size="18" aria-hidden="true" />KOMPAS KARIER AI</span>
      <p id="ai-preview-status" class="ai-preview-status"><span lang="en">Coming soon</span> · Belum tersedia</p>
    </div>
    <div class="ai-preview-layout">
      <div class="ai-preview-copy">
        <h2 id="ai-preview-title">Lebih cepat paham.<br><span class="type-red">Lebih siap memilih.</span></h2>
        <p class="ai-preview-intro">Kami merencanakan asisten riset karier berbasis AI untuk membantu kamu memahami informasi perusahaan, sesuai hal yang paling penting buatmu.</p>
        <ul class="ai-capabilities">
          <li v-for="capability in capabilities" :key="capability.title">
            <component :is="capability.icon" :size="21" aria-hidden="true" />
            <div><h3>{{ capability.title }}</h3><p>{{ capability.text }}</p></div>
          </li>
        </ul>
      </div>
      <aside class="ai-preview-example" aria-labelledby="ai-example-title">
        <p class="eyebrow">GAMBARAN KONSEP</p>
        <h3 id="ai-example-title">Mulai dari pertanyaanmu.</h3>
        <blockquote>“Aku ingin berkembang tanpa mengorbankan waktu pribadi. Apa yang perlu aku cari tahu dari dua perusahaan ini?”</blockquote>
        <p class="ai-example-caption">Contoh pertanyaan, bukan percakapan AI aktif.</p>
        <ol class="ai-example-steps">
          <li><span aria-hidden="true">01</span><div><strong>Prioritasmu</strong><p>Tentukan hal yang penting dalam pekerjaan berikutnya.</p></div></li>
          <li><span aria-hidden="true">02</span><div><strong>Sumber yang bisa dibaca</strong><p>Telusuri ulasan terbit dan ringkasan gaji yang memenuhi batas privasi.</p></div></li>
          <li><span aria-hidden="true">03</span><div><strong>Pertimbangan yang jelas</strong><p>Lihat konteks, perbedaan pengalaman, dan kekurangan data.</p></div></li>
        </ol>
        <p class="ai-preview-note">Fitur ini masih dalam tahap perencanaan. Belum ada layanan AI aktif atau tanggal rilis yang ditetapkan.</p>
      </aside>
    </div>
    <div class="ai-preview-bottom">
      <p>Arah yang kami tuju: ringkasan bersumber, batas data yang jelas, dan keputusan tetap di tanganmu.</p>
      <NuxtLink class="text-link" to="/bandingkan">Bandingkan perusahaan sekarang <ArrowUpRight :size="17" aria-hidden="true" /></NuxtLink>
    </div>
  </section>
</template>
