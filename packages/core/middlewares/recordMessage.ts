import type { Context, NextFunction } from 'grammy'
import { models } from '~/share'

export function useRecordMessage(): (ctx: Context, next: NextFunction) => void {
  return async function (ctx: Context, next: NextFunction) {
    if (ctx.message && ctx.message.text)
      models.chatHistory.saveOneTelegramTextMessage(ctx.message)

    next()
  }
}
