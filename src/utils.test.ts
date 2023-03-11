import { describe, expect, it } from 'vitest'
import { getLanguages, gitIgnoreExists } from './utils'

describe('get language list', async () => {
  const languages = await getLanguages()
  it('should return a list of languages', async () => {
    expect(languages).toBeTypeOf('object')
    expect(languages[0]).toHaveProperty('name')
  })
  it('should not have .gitignore folder', () => {
    const found = languages.find((l) => l.name === '.gitignore')
    expect(found).toBeUndefined()
  })
  it('should not have Global folder', () => {
    const found = languages.find((l) => l.name === 'Global')
    expect(found).toBeUndefined()
  })
  it('should not have community folder', () => {
    const found = languages.find((l) => l.name === 'community')
    expect(found).toBeUndefined()
  })
  it('should return .gitignore exists', async () => {
    const exists = await gitIgnoreExists()
    expect(exists).toBeTypeOf('boolean')
    expect(exists).toBe(true)
  })
})
