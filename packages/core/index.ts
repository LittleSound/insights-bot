import { Bot } from 'grammy'
import { green, yellow } from 'colors/safe'
import { initCommand } from './command'
import { useLogMessage, useRecordMessage } from './middlewares'
import { newLoggerForModule } from '~/share'

const log = newLoggerForModule('main')

async function main() {
  const bot = new Bot(process.env.BOT_TOKEN!)

  // Enable graceful stop
  process.once('SIGINT', () => {
    log.info(yellow('Stop due to SIGINT'))
    bot.stop()
  })
  process.once('SIGTERM', () => {
    log.info(yellow('Stop due to SIGTERM'))
    bot.stop()
  })

  bot.use(useLogMessage())
  bot.use(useRecordMessage())

  initCommand(bot)

  bot.start()
  log.info(green('Bot started'))
  bot.botInfo = await bot.api.getMe()
  log.info(`Authorized as bot ${yellow(`@${bot.botInfo.username || 'Unknown Bot Username'}`)}`)
}

main()
