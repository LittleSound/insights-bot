import { extractContentFromURL } from '~/share'
import type { TgBot } from '~/share/types'

export function initCommand(bot: TgBot) {
  bot.command('smr', async (ctx) => {
    const url = ctx.message.text.replace('/smr ', '').trim()
    const loadingMessage = await ctx.reply('请稍等，量子速读中...')
    try {
      const summarization = await summarizeInputURL(url)
      await ctx.reply(summarization, { parse_mode: 'HTML' })
    }
    catch (err) {
      ctx.editMessageText('暂时不支持量子速读这样的内容呢，可以换个别的链接试试。')
    }
  })

  bot.hears(/$(\/smr)|(\/smr ([^"]+))/g, async (ctx) => {
    const url = ctx.message.text.replace('/smr ', '').trim()
    const summarization = await summarizeInputURL(url)
    await ctx.editMessageText(summarization, { parse_mode: 'HTML' })
  })
}

async function summarizeInputURL(url: string) {
  const article = await extractContentFromURL(url)
  const content = '' // TODO: Code for summarization
  return `<b><a href="${url}">${article.title}</a></b>\n${content}\n\n<em>🤖️ Generated by chatGPT</em>`
}
