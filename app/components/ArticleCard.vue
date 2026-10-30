<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { formatArticleDate, type Article } from '#shared/articles'
defineProps<{ article: Article }>()
</script>

<template>
  <article class="article-card">
    <NuxtLink :to="`/artikel/${article.slug}`" class="article-card-link">
      <div class="article-card-image"><img :src="article.image" :alt="article.imageAlt" width="1200" height="800" loading="lazy" decoding="async"></div>
      <div class="article-card-meta"><span>{{ article.category }}</span><time :datetime="article.date">{{ formatArticleDate(article.date) }}</time></div>
      <h3>{{ article.title }} <ArrowUpRight :size="20" aria-hidden="true" /></h3>
      <p>{{ article.description }}</p>
    </NuxtLink>
  </article>
</template>
