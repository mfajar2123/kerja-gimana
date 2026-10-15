<script setup lang="ts">
import { ArrowUpRight, ArrowRight, Plus, Minus } from '@lucide/vue'

useSeoMeta({
  title: 'KerjaGimana — Sebelum kerja di sana, cari tahu dulu.',
  description: 'Cari tahu lebih banyak tentang perusahaan, pengalaman kerja, transparansi gaji, dan proses interview. Sebelum kerja di sana, cari tahu dulu.',
  ogTitle: 'KerjaGimana — Sebelum kerja di sana, cari tahu dulu.',
  ogDescription: 'Baca pengalaman kerja dan bandingkan informasi perusahaan sebelum mengambil keputusan.',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
const questions = [
  { question: 'Apa itu KerjaGimana?', answer: 'KerjaGimana adalah tempat untuk mencari tahu lebih banyak tentang pengalaman kerja, kisaran gaji, dan proses interview di perusahaan. Informasi yang tampil berasal dari kontribusi pengguna dan melewati moderasi.' },
  { question: 'Apakah review penulisnya anonim?', answer: 'Review yang diterbitkan tidak menampilkan nama atau akun penulis. Kami tetap menyimpan informasi akun secara terpisah untuk keamanan dan pengelolaan kontribusi. Karena posisi, periode kerja, atau isi cerita bisa mengungkap identitas secara tidak langsung, baca Panduan Review sebelum mengirim.' },
  { question: 'Kenapa belum ada nilai gaji untuk sebagian perusahaan?', answer: 'Informasi gaji hanya ditampilkan sebagai ringkasan ketika satu kelompok memiliki setidaknya lima pelapor unik. Jumlah sampel kecil disembunyikan untuk membantu menjaga privasi.' },
  { question: 'Bagaimana cara menyampaikan cerita di KerjaGimana?', answer: 'Buat akun dan verifikasi email, lalu kirim review, cerita interview, atau laporan gaji. Tim moderator akan memeriksa kontribusi sebelum informasi tersebut dipublikasikan.' },
  { question: 'Apakah Kompas Karier AI sudah bisa dipakai?', answer: 'Belum. Kompas Karier AI masih dalam tahap perencanaan dan ditandai Coming soon. Rencananya, fitur ini membantu merangkum informasi bersumber, membandingkan prioritas kerja, dan menyiapkan pertanyaan interview. Saat ini kamu sudah bisa membaca ulasan, melihat ringkasan gaji yang tersedia, dan membandingkan perusahaan secara langsung.' },
]

interface HeroChar {
  char: string
  delay: number
  muted?: boolean
}

const CHAR_DELAY = 55
const LINE_PAUSE = 160

const lineOneChars: HeroChar[] = []
let currentDelay = 80

for (const ch of 'Kerja') {
  lineOneChars.push({ char: ch, delay: currentDelay, muted: false })
  currentDelay += CHAR_DELAY
}
lineOneChars.push({ char: ' ', delay: currentDelay, muted: false })
currentDelay += CHAR_DELAY

for (const ch of 'di sana.') {
  lineOneChars.push({ char: ch, delay: currentDelay, muted: true })
  currentDelay += CHAR_DELAY
}

currentDelay += LINE_PAUSE

const lineTwoChars: HeroChar[] = []
for (const ch of 'Kenali dulu') {
  lineTwoChars.push({ char: ch, delay: currentDelay })
  currentDelay += CHAR_DELAY
}

currentDelay += LINE_PAUSE

const lineThreeChars: HeroChar[] = []
for (const ch of 'ceritanya.') {
  lineThreeChars.push({ char: ch, delay: currentDelay })
  currentDelay += CHAR_DELAY
}

const footDelay = currentDelay + 140
</script>

<template>
  <div class="homepage">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-content">
        <h1 id="hero-title" class="hero-title">
          <span class="hero-line hero-line-one">
            <span
              v-for="(item, idx) in lineOneChars"
              :key="`l1-${idx}`"
              :class="[
                item.char === ' ' ? 'hero-char-space' : 'hero-char',
                { 'hero-char-muted': item.muted }
              ]"
              :style="item.char !== ' ' ? { animationDelay: `${item.delay}ms` } : undefined"
            >{{ item.char === ' ' ? '\u00A0' : item.char }}</span>
          </span>
          <span class="hero-line hero-line-two">
            <span
              v-for="(item, idx) in lineTwoChars"
              :key="`l2-${idx}`"
              :class="item.char === ' ' ? 'hero-char-space' : 'hero-char'"
              :style="item.char !== ' ' ? { animationDelay: `${item.delay}ms` } : undefined"
            >{{ item.char === ' ' ? '\u00A0' : item.char }}</span>
          </span>
          <span class="hero-line hero-line-three">
            <span
              v-for="(item, idx) in lineThreeChars"
              :key="`l3-${idx}`"
              class="hero-char type-red"
              :style="{ animationDelay: `${item.delay}ms` }"
            >{{ item.char }}</span>
            <span class="hero-cursor" aria-hidden="true" />
          </span>
        </h1>
        <div class="hero-foot" :style="{ animationDelay: `${footDelay}ms` }">
          <p>Budaya kerja, informasi gaji, dan pengalaman interview.<br>Lebih banyak sudut pandang untuk langkah berikutnya.</p>
          <div class="hero-actions">
            <a class="button button-red" href="#cari">Cari perusahaan <ArrowUpRight :size="17" aria-hidden="true" /></a>
            <NuxtLink class="button button-outline" to="/panduan-review">Cara kerjanya</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section id="cerita" class="assembly-section section-pad" aria-labelledby="assembly-title">

      <div class="assembly-copy">
        <h2 id="assembly-title" class="assembly-headline">
          <span class="assembly-line"><span class="assembly-word">Jangan</span> <span class="assembly-word assembly-muted">cuma</span> <span class="assembly-word assembly-accent">lihat</span> <span class="assembly-word">lowongannya.</span></span>
          <span class="assembly-line assembly-line-offset"><span class="assembly-word assembly-muted">Lihat</span> <span class="assembly-word">juga</span> <span class="assembly-word assembly-accent">kenyataannya.</span></span>
        </h2>
        <TypewriterDesc class="assembly-description" text="Lowongan baru awal ceritanya. Pengalaman pekerja membantu kamu mengenal keseharian di baliknya." />
      </div>

    </section>

    <HomeVideo />

    <SearchCompany />

    <ScrollStory />

    <section class="product-section section-pad" aria-labelledby="product-title">
      <div class="product-heading reveal">
        <div><h2 id="product-title">Satu tempat.<br><span class="type-red">Lebih banyak sudut.</span></h2></div>
        <TypewriterDesc text="Bandingkan berdasarkan informasi yang tersedia. Kalau belum cukup data, kami akan bilang terus terang." />
      </div>
      <div class="product-list">
        <article class="product-row reveal"><h3>Pengalaman kerja</h3><p>Cerita tentang keseharian, keseimbangan hidup, manajemen, dan perkembangan karier.</p></article>
        <article class="product-row reveal"><h3>Gaji yang lebih terbuka</h3><p>Median gaji untuk kelompok dengan cukup pelapor unik, dipisah berdasarkan peran dan jenis penghasilan.</p></article>
        <article class="product-row reveal"><h3>Proses interview</h3><p>Kenali tahapan, durasi, dan pengalaman interview dari pelamar sebelumnya.</p></article>
        <article class="product-row reveal"><h3>Bandingkan pilihanmu</h3><p>Bandingkan hingga tiga perusahaan berdasarkan rating, jumlah cerita, dan data yang tersedia.</p></article>
      </div>
    </section>

    <HomeCompanies />

    <HomeAiPreview />

    <section class="transparency-section section-pad" aria-labelledby="transparency-title">

      <div class="transparency-body reveal">

        <h2 id="transparency-title">Setiap tempat kerja<br>punya <span class="type-red">ceritanya.</span></h2>
        <TypewriterDesc text="Satu pengalaman tidak mewakili semua orang. Baca beberapa sudut pandang, perhatikan konteksnya, dan pakai informasi yang ada untuk mengambil keputusanmu sendiri." />
        <NuxtLink class="text-link" to="/panduan-review">Baca panduan berbagi pengalaman <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
      </div>

    </section>

    <section class="final-cta section-pad" aria-labelledby="final-cta-title">

      <h2 id="final-cta-title" class="reveal">Ceritamu berarti<br>untuk <span>langkah orang lain.</span></h2>
      <div class="final-cta-bottom"><TypewriterDesc text="Bagikan pengalaman yang kamu alami sendiri.&#10;Emailmu tetap privat, setiap cerita dimoderasi." /><NuxtLink class="button button-white" to="/tulis-review">Tulis pengalamanmu <ArrowUpRight :size="17" aria-hidden="true" /></NuxtLink></div>

    </section>

    <section class="faq-section section-pad" aria-labelledby="faq-title">
      <div class="faq-heading reveal"><h2 id="faq-title">Pertanyaan<br>yang <span class="type-red">sering muncul.</span></h2></div>
      <div class="faq-list">
        <details v-for="item in questions" :key="item.question" class="faq-item reveal">
          <summary><span>{{ item.question }}</span><Plus class="faq-plus" :size="19" aria-hidden="true" /><Minus class="faq-minus" :size="19" aria-hidden="true" /></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
