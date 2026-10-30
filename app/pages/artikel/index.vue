<script setup lang="ts">
import { articles } from '#shared/articles'
const config = useRuntimeConfig()
const canonical = computed(() => `${config.public.siteUrl.replace(/\/$/, '')}/artikel`)
useSeoMeta({ title: 'Artikel dunia kerja dan karier — KerjaGimana', description: 'Artikel tentang dunia kerja Indonesia, gaji, lowongan, dan perkembangan karier dengan sumber yang jelas.', ogTitle: 'Artikel dunia kerja dan karier — KerjaGimana', ogDescription: 'Informasi dan cerita untuk memahami dunia kerja dengan lebih jernih.', ogType: 'website', ogUrl: canonical, ogImage: () => `${config.public.siteUrl.replace(/\/$/, '')}${articles[0]!.image}`, twitterCard: 'summary_large_image' })
useHead({ link: [{ rel: 'canonical', href: canonical }] })
</script>

<template>
  <div class="articles-page">
    <header class="articles-hero section-pad">
      <nav class="article-breadcrumb" aria-label="Breadcrumb"><NuxtLink to="/">Beranda</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">Artikel</span></nav>
      <p class="article-eyebrow">Jurnal KerjaGimana</p>
      <h1>Lebih tahu.<br><span class="type-red">Lebih siap.</span></h1>
      <p class="articles-hero-description">Kabar, data, dan sudut pandang untuk menemani perjalanan kariermu.</p>
    </header>
    <section class="articles-list section-pad" aria-labelledby="latest-articles">
      <div class="articles-list-heading"><h2 id="latest-articles">Artikel terbaru</h2><p>Wawasan yang bisa kamu bawa ke langkah berikutnya.</p></div>
      <div class="articles-grid"><ArticleCard v-for="article in articles" :key="article.slug" :article="article" /></div>
    </section>
  </div>
</template>
