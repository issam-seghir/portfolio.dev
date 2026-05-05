import { describe, expect, test } from 'vitest'

import { getRelatedProjects } from '../../../lib/content'

describe(getRelatedProjects, () => {
  test('does not include the current project and respects limit', () => {
    expect.assertions(2)

    const related = getRelatedProjects('en', 'ecomenia', 3)

    expect(related.length).toBeLessThanOrEqual(3)
    expect(related.some((p) => p.slug === 'ecomenia')).toBe(false)
  })
})

