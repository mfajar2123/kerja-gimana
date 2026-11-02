import { getQuery } from 'h3'
import { articleDirectorySchema } from '#shared/schemas'
import { articles, type ArticleDirectoryResult } from '#shared/articles'

const pageSize = 9

export default defineEventHandler((event): ArticleDirectoryResult => {
  const parsed = articleDirectorySchema.safeParse(getQuery(event))
  if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Filter artikel tidak valid.' })

  const { q, category, page } = parsed.data
  const normalizedQuery = q.toLocaleLowerCase('id-ID')
  const sortedArticles = [...articles].sort((a, b) => b.date.localeCompare(a.date))
  const categories = [...new Set(sortedArticles.map(article => article.category))].sort((a, b) => a.localeCompare(b, 'id-ID'))
  const filtered = sortedArticles.filter((article) => {
    const matchesCategory = !category || article.category === category
    const searchableText = `${article.title} ${article.description} ${article.category}`.toLocaleLowerCase('id-ID')
    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })
  const start = (page - 1) * pageSize

  return {
    articles: filtered.slice(start, start + pageSize).map(({ sections: _sections, source: _source, ...summary }) => summary),
    categories,
    total: filtered.length,
    page,
    pageSize,
  }
})
