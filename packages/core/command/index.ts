import * as smr from './smr'
import type { TgBot } from '~/share/types'

export function initCommand(bot: TgBot) {
  smr.initCommand(bot)
}
