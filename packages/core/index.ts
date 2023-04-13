import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { green, yellow } from 'colors/safe'
import { initCommand } from './command'
import { formatFullNameFromFirstAndLastName, log, mapChatTypeToChineseText } from '~/share'
import type { TelegramChatType } from '~/share'


async function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN!)

  const logSelf = log.child({ module: 'main' })

  // Enable graceful stop
  process.once('SIGINT', () => {
    logSelf.info(yellow('Stop due to SIGINT'))
    bot.stop('SIGINT')
  })
  process.once('SIGTERM', () => {
    logSelf.info(yellow('Stop due to SIGTERM'))
    bot.stop('SIGTERM')
  })

  bot.start(ctx => ctx.reply('Welcome'))
  bot.help(ctx => ctx.reply('Send me a sticker'))
  bot.on(message('text'), (ctx) => {
    const fromNames: Array<string> = []
    fromNames.push(formatFullNameFromFirstAndLastName(ctx.message.from.first_name, ctx.message.from.last_name))
    if (ctx.message.from.username !== '') fromNames.push(`@${ctx.message.from.username}`)

    const fromId = yellow(`${ctx.message.from.id}`)
    const chatType = mapChatTypeToChineseText(ctx.message.chat.type as TelegramChatType)
    const fromName = fromNames.join(' ')
    const text = ctx.message.text
    if (ctx.message.chat.type === 'private') {
      log.info(`[消息｜${chatType}] ${fromName} (${fromId}): ${text}`)
    }
    else {
      const chatId = yellow(`${ctx.message.chat.id}`)
      const chatTitle = ctx.message.chat.title
      log.info(`[消息｜${chatType}] [${chatTitle} (${chatId})] ${fromName} ${fromId}: ${text}`)
    }
  })

  bot.hears('hi', ctx => ctx.reply('Hey there 🐶'))
  bot.command('oldschool', ctx => ctx.reply('Hello'))
  bot.command('hipster', Telegraf.reply('λ'))

  initCommand(bot)

  bot.launch()
  logSelf.info(green('Bot Launched'))
  bot.botInfo = await bot.telegram.getMe()
  logSelf.info(`Authorized as bot ${yellow(`@${bot.botInfo.username || 'Unknown Bot Username'}`)}`)
}

main()
