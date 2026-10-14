<script setup lang="ts">
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, Minus } from '@lucide/vue'

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
</script>

<template>
  <div class="homepage">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-grain" aria-hidden="true" />
      <div class="hero-left-rail" aria-hidden="true"><span>INFO KERJA, TANPA TEBAK-TEBAKAN.</span></div>
      <div class="hero-content">
        <span class="eyebrow hero-eyebrow"><span class="eyebrow-mark" />SEBELUM KAMU KIRIM LAMARAN</span>
        <h1 id="hero-title" class="hero-title">
          <span class="hero-line hero-line-one">Kerja <span>di sana.</span></span>
          <span class="hero-line hero-line-two">Yakin udah</span>
          <span class="hero-line hero-line-three"><span class="type-red">tahu</span> dalemnya<span class="hero-period">?</span></span>
        </h1>
        <div class="hero-foot">
          <p>Kenali budaya kerja, kisaran gaji, dan proses interview.<br>Sebelum memutuskan, cari tahu dulu.</p>
          <div class="hero-actions">
            <a class="button button-red" href="#cari">Cari perusahaan <ArrowUpRight :size="17" aria-hidden="true" /></a>
            <NuxtLink class="button button-outline" to="/panduan-review">Cara kerjanya</NuxtLink>
          </div>
        </div>
      </div>
      <div class="hero-index" aria-hidden="true"><span>01</span><span class="hero-index-line" /><span>KG / 2026</span></div>
      <div class="hero-bottom">
        <a class="hero-discover" href="#cerita"><span>GULIR UNTUK KENAL LEBIH JAUH</span><ArrowDown :size="16" aria-hidden="true" /></a>
        <div class="hero-caption" aria-hidden="true">CARI TAHU DULU</div>
      </div>
    </section>

    <section id="cerita" class="assembly-section section-pad" aria-labelledby="assembly-title">
      <div class="assembly-top reveal"><span class="eyebrow"><span class="eyebrow-mark" />PERTIMBANGKAN LEBIH DARI SATU SISI</span><span class="section-index">CERITA / 01</span></div>
      <div class="assembly-copy">
        <h2 id="assembly-title" class="assembly-headline">
          <span class="assembly-line"><span class="assembly-word">Jangan</span> <span class="assembly-word assembly-muted">cuma</span> <span class="assembly-word assembly-accent">lihat</span> <span class="assembly-word">lowongannya.</span></span>
          <span class="assembly-line assembly-line-offset"><span class="assembly-word assembly-muted">Lihat</span> <span class="assembly-word">juga</span> <span class="assembly-word assembly-accent">kenyataannya.</span></span>
        </h2>
        <p class="assembly-description reveal">Deskripsi kerja cerita satu sisi. Pengalaman dari pekerja membantu kamu melihat gambaran yang lebih utuh.</p>
      </div>
      <div class="assembly-bottom"><span>INFORMASI YANG TERSEDIA, BUKAN JANJI</span><span>↓</span></div>
    </section>

    <SearchCompany />

    <ScrollStory />

    <section class="product-section section-pad" aria-labelledby="product-title">
      <div class="product-heading reveal">
        <div><span class="eyebrow"><span class="eyebrow-mark" />SEMUA INFORMASI DALAM SATU TEMPAT</span><h2 id="product-title">Satu tempat.<br><span class="type-red">Lebih banyak sudut.</span></h2></div>
        <p>Bandingkan berdasarkan informasi yang tersedia. Kalau belum cukup data, kami akan bilang terus terang.</p>
      </div>
      <div class="product-list">
        <article class="product-row reveal"><span class="product-number">01</span><h3>Pengalaman kerja</h3><p>Cerita tentang keseharian, keseimbangan hidup, manajemen, dan perkembangan karier.</p><span class="product-side-note">CERITA KARYAWAN</span></article>
        <article class="product-row reveal"><span class="product-number">02</span><h3>Gaji yang lebih terbuka</h3><p>Median gaji untuk kelompok dengan cukup pelapor unik, dipisah berdasarkan peran dan jenis penghasilan.</p><span class="product-side-note">RINGKASAN GAJI</span></article>
        <article class="product-row reveal"><span class="product-number">03</span><h3>Proses interview</h3><p>Kenali tahapan, durasi, dan pengalaman interview dari pelamar sebelumnya.</p><span class="product-side-note">CERITA INTERVIEW</span></article>
        <article class="product-row reveal"><span class="product-number">04</span><h3>Bandingkan pilihanmu</h3><p>Bandingkan hingga tiga perusahaan berdasarkan rating, jumlah cerita, dan data yang tersedia.</p><span class="product-side-note">PERBANDINGAN</span></article>
      </div>
    </section>

    <HomeAiPreview />

    <HomeCompanies />

    <section class="transparency-section section-pad" aria-labelledby="transparency-title">
      <div class="transparency-number reveal" aria-hidden="true">[ KG / 06 ]</div>
      <div class="transparency-body reveal">
        <span class="eyebrow"><span class="eyebrow-mark" />SEBUAH PENGINGAT</span>
        <h2 id="transparency-title">Setiap tempat kerja<br>punya <span class="type-red">ceritanya.</span></h2>
        <p>Satu pengalaman tidak mewakili semua orang. Baca beberapa sudut pandang, perhatikan konteksnya, dan pakai informasi yang ada untuk mengambil keputusanmu sendiri.</p>
        <NuxtLink class="text-link" to="/panduan-review">Baca panduan berbagi pengalaman <ArrowRight :size="16" aria-hidden="true" /></NuxtLink>
      </div>
      <div class="transparency-art" aria-hidden="true"><div class="editorial-rule"/><span>FAKTA<br>+<br>PENGALAMAN</span><div class="editorial-rule"/></div>
    </section>

    <section class="final-cta section-pad" aria-labelledby="final-cta-title">
      <span class="eyebrow"><span class="eyebrow-mark" />PENGALAMANMU BERARTI</span>
      <h2 id="final-cta-title">Pengalamanmu<br>bisa bantu <span>orang lain memilih.</span></h2>
      <div class="final-cta-bottom"><p>Bagikan pengalaman yang kamu alami sendiri.<br>Emailmu tetap privat, setiap cerita dimoderasi.</p><NuxtLink class="button button-white" to="/tulis-review">Tulis pengalamanmu <ArrowUpRight :size="17" aria-hidden="true" /></NuxtLink></div>
      <div class="final-cta-index" aria-hidden="true">KG / 09 — TERIMA KASIH SUDAH MEMBACA.</div>
    </section>

    <section class="faq-section section-pad" aria-labelledby="faq-title">
      <div class="faq-heading reveal"><span class="eyebrow"><span class="eyebrow-mark" />SEBELUM MULAI</span><h2 id="faq-title">Pertanyaan<br>yang <span class="type-red">sering muncul.</span></h2></div>
      <div class="faq-list">
        <details v-for="(item, index) in questions" :key="item.question" class="faq-item reveal">
          <summary><span class="faq-number">0{{ index + 1 }}</span><span>{{ item.question }}</span><Plus class="faq-plus" :size="19" aria-hidden="true" /><Minus class="faq-minus" :size="19" aria-hidden="true" /></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
