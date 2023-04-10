// @vitest-c
import { describe, expect, it } from 'vitest'
import { extractContentFromURL } from './readability'

describe('extractContentFromURL', () => {
  it('NoHost', async () => {
    const task = extractContentFromURL('https://a.b.c')
    await expect(task).rejects.toThrow('Failed to fetch https://a.b.c')
  })

  // 测试读取 https://www.google.com/
  it('Google', async () => {
    const article = await extractContentFromURL('https://www.google.com/')
    expect(article.title).toBe('Google')
    expect(article.content).not.toBe('')
  })
})
