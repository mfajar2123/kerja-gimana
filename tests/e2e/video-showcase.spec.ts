import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.setTimeout(60_000)

test.describe('Home Video Showcase & Hero Animations', () => {
  test('video section renders purely video without subtitle track, with autoplay and loop', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => {
      if (message.type() === 'error' && !message.text().includes('favicon')) {
        errors.push(message.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 1. Verify section is present
    const videoSection = page.locator('.video-section')
    await expect(videoSection).toBeVisible()
    await videoSection.scrollIntoViewIfNeeded()

    // 2. Section is purely video (no headings or text descriptions)
    await expect(videoSection.locator('h1, h2, h3, p')).toHaveCount(0)

    // 3. Video element attributes for plain autoplay & autoloop
    const video = videoSection.locator('video.video-element')
    await expect(video).toBeVisible()
    await expect(video).toHaveAttribute('autoplay', '')
    await expect(video).toHaveAttribute('loop', '')
    await expect(video).toHaveAttribute('muted', '')
    await expect(video).toHaveAttribute('playsinline', '')
    await expect(video).toHaveAttribute('poster', '/video/poster-20s.png')

    const source = video.locator('source')
    await expect(source).toHaveAttribute('src', '/video/kerjagimana-horizontal-20s-genz.mp4')
    await expect(source).toHaveAttribute('type', 'video/mp4')

    // Subtitle track removed as requested
    await expect(video.locator('track')).toHaveCount(0)

    // 4. Verify no runtime errors
    expect(errors).toEqual([])

    // 5. Accessibility audit on video section
    const audit = await new AxeBuilder({ page })
      .include('.video-section')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    expect(audit.violations.filter(v => v.impact === 'serious' || v.impact === 'critical')).toEqual([])
  })

  test('hero title animates character by character typewriter effect with cursor and centered layout', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 1. Verify centered layout
    const heroSection = page.locator('.hero-section')
    await expect(heroSection).toHaveCSS('text-align', 'center')
    const heroTitle = page.locator('.hero-title')
    await expect(heroTitle).toHaveCSS('text-align', 'center')

    // 2. Verify typewriter characters and blinking cursor
    const heroChars = page.locator('.hero-title .hero-char')
    await expect(heroChars).toHaveCount(32)

    const heroCursor = page.locator('.hero-title .hero-cursor')
    await expect(heroCursor).toBeVisible()

    // Characters reach opacity 1 after typewriter completes
    await expect(heroChars.last()).toHaveCSS('opacity', '1', { timeout: 10_000 })

    // 3. Hero foot should also be visible and centered
    const heroFoot = page.locator('.hero-foot')
    await expect(heroFoot).toBeVisible()
    await expect(heroFoot).toHaveCSS('opacity', '1', { timeout: 10_000 })
    await expect(heroFoot).toHaveCSS('text-align', 'center')
  })

  test('video section is responsive without horizontal overflow across breakpoints', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('domcontentloaded')

    const videoSection = page.locator('.video-section')
    await videoSection.scrollIntoViewIfNeeded()
    await expect(videoSection).toBeVisible()

    for (const width of [320, 375, 414, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 800 })
      await page.waitForTimeout(100)

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
      expect(scrollWidth, `Horizontal overflow detected at ${width}px`).toBeLessThanOrEqual(clientWidth)

      const videoBounds = await page.locator('.video-player-wrap').boundingBox()
      expect(videoBounds).not.toBeNull()
      expect(videoBounds!.x).toBeGreaterThanOrEqual(0)
      expect(videoBounds!.x + videoBounds!.width).toBeLessThanOrEqual(width)
    }
  })

  test('home sections are ordered logically with live companies before AI preview', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const sectionClasses = await page.evaluate(() => {
      const home = document.querySelector('.homepage')
      if (!home) return []
      return Array.from(home.children).map(el => {
        if (el.classList.contains('hero-section')) return 'hero'
        if (el.classList.contains('assembly-section')) return 'assembly'
        if (el.classList.contains('video-section')) return 'video'
        if (el.classList.contains('discovery-section')) return 'discovery'
        if (el.classList.contains('story-section')) return 'story'
        if (el.classList.contains('product-section')) return 'product'
        if (el.classList.contains('featured-section')) return 'featured-companies'
        if (el.classList.contains('ai-preview-section')) return 'ai-preview'
        if (el.classList.contains('transparency-section')) return 'transparency'
        if (el.classList.contains('final-cta')) return 'final-cta'
        if (el.classList.contains('faq-section')) return 'faq'
        return el.className
      })
    })

    expect(sectionClasses).toEqual([
      'hero',
      'assembly',
      'video',
      'discovery',
      'story',
      'product',
      'featured-companies',
      'ai-preview',
      'transparency',
      'final-cta',
      'faq',
    ])
  })

  test('section descriptions animate character by character using TypewriterDesc when scrolled into view', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // 1. Assembly section description
    const assemblyDesc = page.locator('.assembly-section .typewriter-desc')
    await assemblyDesc.scrollIntoViewIfNeeded()
    await expect(assemblyDesc).toBeVisible()
    await expect(assemblyDesc).toHaveClass(/is-active/)
    await expect(assemblyDesc.locator('.tw-char').first()).toBeVisible()
    await expect(assemblyDesc).toContainText('Lowongan baru awal ceritanya.')

    // 2. Discovery / Search section description
    const discoveryDesc = page.locator('.discovery-section .typewriter-desc')
    await discoveryDesc.scrollIntoViewIfNeeded()
    await expect(discoveryDesc).toBeVisible()
    await expect(discoveryDesc).toHaveClass(/is-active/)
    await expect(discoveryDesc.locator('.tw-char').first()).toBeVisible()
    await expect(discoveryDesc).toContainText('Ketik nama perusahaan')

    // 3. ScrollStory section description
    const storyDesc = page.locator('.story-section .typewriter-desc')
    await storyDesc.scrollIntoViewIfNeeded()
    await expect(storyDesc).toBeVisible()
    await expect(storyDesc).toHaveClass(/is-active/)
    await expect(storyDesc).toContainText('Informasi untuk bantu kamu menimbang')

    // 4. Product section description
    const productDesc = page.locator('.product-section .product-heading .typewriter-desc')
    await productDesc.scrollIntoViewIfNeeded()
    await expect(productDesc).toBeVisible()
    await expect(productDesc).toHaveClass(/is-active/)
    await expect(productDesc).toContainText('Bandingkan berdasarkan informasi')

    // 5. AI Preview section description
    const aiDesc = page.locator('.ai-preview-section .typewriter-desc')
    await aiDesc.scrollIntoViewIfNeeded()
    await expect(aiDesc).toBeVisible()
    await expect(aiDesc).toHaveClass(/is-active/)
    await expect(aiDesc).toContainText('Pahami cerita kerja')

    // 6. Transparency section description
    const transDesc = page.locator('.transparency-section .typewriter-desc')
    await transDesc.scrollIntoViewIfNeeded()
    await expect(transDesc).toBeVisible()
    await expect(transDesc).toHaveClass(/is-active/)
    await expect(transDesc).toContainText('Satu pengalaman tidak mewakili semua orang')
  })
})
