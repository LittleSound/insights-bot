import type { Message } from '@grammyjs/types'
import type { ChatHistory, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { db, extractTextFromMessage, formatFullNameAndUsername, formatFullNameFromFirstAndLastName, newLoggerForModule } from '~/share'

const log = newLoggerForModule('share/models/chatHistory')

export const chatHistory = {
  async saveOneTelegramTextMessage(message: Message) {
    if (!message.text) return
    if (!message.from) return

    const chatHistory: Prisma.ChatHistoryCreateInput = {
      chatId: message.chat.id,
      messageId: message.message_id,
      userId: message.from.id,
      username: message.from.username,
      displayName: formatFullNameFromFirstAndLastName(message.from.first_name, message.from.last_name),
      text: message.text,
      sentAt: message.date * 1000,
    }

    // TODO: 如果文本量大于等于 200 个字符，得先用 GPT 总结一下
    const text = extractTextFromMessage(message)
    if (!text) return

    if (message.forward_from) {
      chatHistory.text = `转发了来自 ${formatFullNameFromFirstAndLastName(message.forward_from.first_name, message.forward_from.last_name)} 的消息：${text}`
    }
    else if (message.forward_from_chat) {
      if ('title' in message.forward_from_chat) chatHistory.text = `转发了来自 ${message.forward_from_chat.title} 的消息：${text}`
      else if (message.forward_from_chat.type === 'private') chatHistory.text = `转发了来自 ${formatFullNameFromFirstAndLastName(message.forward_from_chat.first_name, message.forward_from_chat.last_name)} 的消息：${text}`
    }
    else {
      chatHistory.text = message.text
    }

    if (message.reply_to_message) {
      const repliedText = extractTextFromMessage(message.reply_to_message)
      if (repliedText) {
        chatHistory.repliedMessageId = message.reply_to_message.message_id
        chatHistory.repliedUserId = message.reply_to_message.from?.id
        chatHistory.repliedUsername = message.reply_to_message.from?.username
        chatHistory.repliedDisplayName = formatFullNameFromFirstAndLastName(message.reply_to_message.from?.first_name, message.reply_to_message.from?.last_name)
        chatHistory.repliedText = repliedText
      }
    }

    const res = await db.chatHistory.create({
      data: chatHistory,
    })

    log.child({
      fields: {
        id: res.id,
        chat_id: message.chat.id,
        message_id: message.message_id,
      },
    }).info('saved one telegram message')
  },

  async findChatHistoriesByTimeBefore(chatId: number, hoursBefore: number) {
    const now = new Date()
    now.setHours(now.getHours() - hoursBefore)

    const histories = await db.chatHistory.findMany({
      where: {
        chatId,
        sentAt: {
          gte: now.getTime(),
        },
      },
    })
    if (!histories) return []
    return histories
  },

  async summarizeChatHistories(histories: Array<ChatHistory>) {
    const historiesLLMFriendly: Array<string> = []
    for (const history of histories) {
      const sentAt = dayjs(parseInt(history.sentAt.toString())).format('HH:mm:ss')
      const partialContextMessage = `${formatFullNameAndUsername(history.displayName, history.username)} 于 ${sentAt}`
      if (history.repliedMessageId === BigInt(0))
        historiesLLMFriendly.push(`${partialContextMessage} 发送：${history.text}`)
      else
        historiesLLMFriendly.push(`${partialContextMessage} 回复 ${formatFullNameAndUsername(history.repliedDisplayName, history.repliedUsername)} ：${history.text}`)
    }

    const chatHistoriesLLMFriendly = historiesLLMFriendly.join('\n')
    // TODO: 文本切片和分段总结
  },
}
