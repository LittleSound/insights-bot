import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'
import type { WebArticle } from './types'

export async function extractContentFromURL(urlString: string): Promise<WebArticle> {
  // 检查 url 是否有效
  if (!urlString.trim())
    throw new Error('Invalid URL')
  const url = new URL(urlString)
  if (!url.protocol.startsWith('http'))
    throw new Error(`Invalid protocol ${url.protocol}`)

  const resp = await fetch(urlString, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
    },
  })
  if (!resp.ok)
    throw new Error(`Failed to fetch ${urlString}`)
  if (!resp.headers.get('content-type')?.startsWith('text/html'))
    throw new Error(`url fetched, but content-type not supported yet, content-type: ${resp.headers.get('content-type')}`)

  const html = await resp.text()
  const dom = new JSDOM(html)
  const reader = new Readability(dom.window.document)

  const article = reader.parse()
  if (!article)
    throw new Error(`Failed to parse ${urlString}`)
  return article
}
