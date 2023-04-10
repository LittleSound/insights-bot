import { Telegraf } from 'telegraf'
import { message } from 'telegraf/filters'
import { initCommand } from './command'
function main() {
  const bot = new Telegraf(process.env.BOT_TOKEN!)
  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))

  bot.start(ctx => ctx.reply('Welcome'))
  bot.help(ctx => ctx.reply('Send me a sticker'))
  bot.on(message('sticker'), ctx => ctx.reply('👍'))

  bot.hears('hi', ctx => ctx.reply('Hey there 🐶'))
  bot.command('oldschool', ctx => ctx.reply('Hello'))
  bot.command('hipster', Telegraf.reply('λ'))

  initCommand(bot)

  bot.launch()
  // eslint-disable-next-line no-console
  console.log('Bot started')
}

main()
