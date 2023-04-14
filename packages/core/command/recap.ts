import type { Context } from 'grammy'
import { models } from '~/share'

export async function recapCommand(ctx: Context) {
  if (!ctx.hasCommand) return
  if (!ctx.message) return

  await models.chatHistory.findChatHistoriesByTimeBefore(ctx.message.chat.id, 1)
  // what next
}
