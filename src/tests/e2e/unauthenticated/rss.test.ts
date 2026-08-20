import { expect, test } from '@playwright/test'
import { XMLParser } from 'fast-xml-parser'

test.describe('rss page', () => {
  test('validates rss xml', async ({ page }) => {
    await page.goto('/rss.xml')

    const feed = await page.content()
    expect(() => {
      void new XMLParser().parse(feed)
    }).not.toThrow()
  })
})
