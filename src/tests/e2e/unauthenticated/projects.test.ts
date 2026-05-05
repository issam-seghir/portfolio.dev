import { expect,test } from '@playwright/test'

test.describe('projects', () => {
  test('supports tag and query filters', async ({ page }) => {
    await page.goto('/en/projects')
    await expect(page.getByRole('heading', { name: /projects/i })).toBeVisible()

    // Logical filters via query string
    await page.goto('/en/projects?featured=1&openSource=1')
    await expect(page).toHaveURL(/featured=1/)
    await expect(page).toHaveURL(/openSource=1/)

    // Search query via input (URL updated)
    const input = page.getByPlaceholder('Search projects...')
    await input.fill('ecomenia')
    await expect(page).toHaveURL(/q=ecomenia/)
  })
})

