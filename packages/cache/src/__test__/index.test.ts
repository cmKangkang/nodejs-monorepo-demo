import { describe, it, expect } from '@jest/globals'
import cache from '..'

describe('cache', () => {
  it('should cache data', () => {
    cache.set('a', 'a', 1000)
    expect(cache.get('a')).toBe('a')
  })
})
