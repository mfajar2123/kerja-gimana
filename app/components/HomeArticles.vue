<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { articles } from '#shared/articles'
</script>

<template>
  <section class="home-articles section-pad" aria-labelledby="home-articles-title">
    <div class="article-section-heading reveal">
      <div><p class="article-eyebrow">Wawasan dunia kerja</p><h2 id="home-articles-title">Baca sebelum<br><span class="type-red">melangkah.</span></h2></div>
      <div><p>Informasi dan cerita untuk memahami dunia kerja dengan lebih jernih.</p><NuxtLink class="text-link" to="/artikel">Lihat semua artikel <ArrowUpRight :size="16" aria-hidden="true" /></NuxtLink></div>
    </div>
    <div class="articles-grid home-articles-grid reveal"><ArticleCard v-for="article in articles.slice(0, 3)" :key="article.slug" :article="article" /></div>
  </section>
</template>
