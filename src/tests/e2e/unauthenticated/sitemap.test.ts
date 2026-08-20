import { expect, test } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'

test.describe('sitemap page', () => {
  test('validates sitemap xml', async ({ page }) => {
    await page.goto('/sitemap.xml')

    const feed = await page.content()
    expect(() => {
      void new XMLParser().parse(feed)
    }).not.toThrow()
  })
})
