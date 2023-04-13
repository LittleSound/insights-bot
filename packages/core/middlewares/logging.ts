import type { Context, NextFunction } from 'grammy'
import { yellow } from 'colors/safe'
import { formatFullNameFromFirstAndLastName, mapChatTypeToChineseText, newLoggerForModule } from '~/share'
import type { TelegramChatType } from '~/share'

const log = newLoggerForModule('middlewares/logging')

export function useLogMessage(): (ctx: Context, next: NextFunction) => void {
  return async function (ctx: Context, next: NextFunction) {
    if (!ctx.message) return

    const message = ctx.message

    const fromNames: Array<string> = []
    fromNames.push(formatFullNameFromFirstAndLastName(message.from.first_name, message.from.last_name))
    if (message.from.username !== '') fromNames.push(`@${message.from.username}`)

    const fromId = yellow(`${message.from.id}`)
    const chatType = mapChatTypeToChineseText(message.chat.type as TelegramChatType)
    const fromName = fromNames.join(' ')
    const text = message.text

    if (message.chat.type === 'private') {
      log.info(`[消息｜${chatType}] ${fromName} (${fromId}): ${text}`)
    }
    else {
      const chatId = yellow(`${message.chat.id}`)
      const chatTitle = message.chat.title
      log.info(`[消息｜${chatType}] [${chatTitle} (${chatId})] ${fromName} ${fromId}: ${text}`)
    }

    next()
  }
}
