import type { Bot, Context } from 'grammy'
import { helpCommand } from './help'
import * as smr from './smr'
import { recapCommand } from './recap'

export function initCommand(bot: Bot) {
  const commands: Record<string, (ctx: Context) => void> = {
    start: helpCommand,
    help: helpCommand,
    recap: recapCommand,
  }

  for (const key in commands)
    bot.command(key, commands[key])

  smr.initCommand(bot)
}
