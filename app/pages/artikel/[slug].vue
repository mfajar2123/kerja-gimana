<script setup lang="ts">
import { ArrowLeft, ArrowUpRight } from '@lucide/vue'
import { articles, formatArticleDate } from '#shared/articles'
definePageMeta({ key: route => route.path })
const route = useRoute()
const config = useRuntimeConfig()
const article = computed(() => articles.find(item => item.slug === route.params.slug))
if (!article.value) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan.' })
const current = article.value
const origin = config.public.siteUrl.replace(/\/$/, '')
const url = `${origin}/artikel/${current.slug}`
const related = articles.filter(item => item.slug !== current.slug).slice(0, 3)
useSeoMeta({ title: `${current.title} — KerjaGimana`, description: current.description, ogTitle: current.title, ogDescription: current.description, ogType: 'article', ogUrl: url, ogImage: `${origin}${current.image}`, articlePublishedTime: `${current.date}T00:00:00+07:00`, twitterCard: 'summary_large_image' })
const jsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: current.title, description: current.description, image: `${origin}${current.image}`, datePublished: current.date, dateModified: current.date, author: { '@type': 'Organization', name: 'KerjaGimana' }, publisher: { '@type': 'Organization', name: 'KerjaGimana' }, mainEntityOfPage: url }
useHead({ link: [{ rel: 'canonical', href: url }], script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(jsonLd).replaceAll('<', '\\u003c') }] })
</script>

<template>
  <div class="article-detail">
    <header class="article-detail-header section-pad">
      <nav class="article-breadcrumb" aria-label="Breadcrumb"><NuxtLink to="/">Beranda</NuxtLink><span aria-hidden="true">/</span><NuxtLink to="/artikel">Artikel</NuxtLink><span aria-hidden="true">/</span><span aria-current="page">{{ current.title }}</span></nav>
      <div class="article-detail-intro"><p class="article-eyebrow">{{ current.category }}</p><h1>{{ current.title }}</h1><p class="article-lead">{{ current.description }}</p><div class="article-byline"><span>KerjaGimana</span><span aria-hidden="true">·</span><time :datetime="current.date">{{ formatArticleDate(current.date) }}</time></div></div>
      <figure class="article-cover"><img :src="current.image" :alt="current.imageAlt" width="1200" height="800" fetchpriority="high"><figcaption>Ilustrasi dibuat dengan AI untuk KerjaGimana.</figcaption></figure>
    </header>
    <div class="article-reading section-pad"><article class="article-body"><section v-for="section in current.sections" :key="section.heading"><h2>{{ section.heading }}</h2><p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p></section><aside class="article-source"><h2>Sumber</h2><p>Artikel ini merujuk pada publikasi {{ current.source.name }} ({{ current.source.date }}).</p><a :href="current.source.url" target="_blank" rel="noopener noreferrer">Baca sumber asli <ArrowUpRight :size="16" aria-hidden="true" /><span class="sr-only"> (terbuka di tab baru)</span></a><p v-if="current.slug === 'rata-rata-upah-buruh-indonesia-2026'"><a href="https://satudata.kemnaker.go.id/data/kumpulan-data/3005" target="_blank" rel="noopener noreferrer">Data UMP 2026 — Satu Data Kemnaker <ArrowUpRight :size="16" aria-hidden="true" /><span class="sr-only"> (terbuka di tab baru)</span></a></p></aside><NuxtLink class="article-back" to="/artikel"><ArrowLeft :size="17" aria-hidden="true" /> Semua artikel</NuxtLink></article></div>
    <section class="article-related section-pad" aria-labelledby="related-title"><div class="articles-list-heading"><h2 id="related-title">Baca juga</h2><NuxtLink class="text-link" to="/artikel">Semua artikel <ArrowUpRight :size="16" aria-hidden="true" /></NuxtLink></div><div class="articles-grid"><ArticleCard v-for="item in related" :key="item.slug" :article="item" /></div></section>
  </div>
</template>
