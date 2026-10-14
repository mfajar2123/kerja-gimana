import { mkdir, writeFile } from 'node:fs/promises'
import { chromium } from '@playwright/test'
import lighthouse from 'lighthouse'
const url = process.env.QA_URL || 'http://localhost:3000'
if (!['localhost','127.0.0.1'].includes(new URL(url).hostname)) throw new Error('Use the local production preview for this audit.')
await mkdir('artifacts/lighthouse', { recursive: true })
const browser = await chromium.launch({ args: ['--remote-debugging-port=9223'] })
try {
  const result = await lighthouse(url, { port: 9223, output: ['html','json'], logLevel: 'error', onlyCategories: ['performance','accessibility','best-practices','seo'] })
  await writeFile('artifacts/lighthouse/report.html', result.report[0])
  await writeFile('artifacts/lighthouse/report.json', result.report[1])
  console.log(JSON.stringify(Object.fromEntries(Object.entries(result.lhr.categories).map(([key,value]) => [key, Math.round(value.score*100)]))))
} finally { await browser.close() }
