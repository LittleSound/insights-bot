import type { Message } from '@grammyjs/types'
import { containsCJKChar } from './utils'

/***
 * 将姓名和名字拼接成一个字符串
 */
export function formatFullNameFromFirstAndLastName(firstName?: string, lastName?: string): string {
  if (!lastName) return firstName ?? ''
  if (!firstName) return lastName ?? ''
  if (containsCJKChar(firstName) && !containsCJKChar(lastName)) return `${firstName} ${lastName}`
  if (!containsCJKChar(firstName) && containsCJKChar(lastName)) return `${lastName} ${firstName}`
  if (containsCJKChar(firstName) && containsCJKChar(lastName)) return `${lastName} ${firstName}`

  return `${lastName} ${firstName}`
}

export enum TelegramChatType {
  Private = 'private',
  Group = 'group',
  SuperGroup = 'supergroup',
  Channel = 'channel',
}

export function mapChatTypeToChineseText(chatType: TelegramChatType): string {
  switch (chatType) {
    case TelegramChatType.Private:
      return '私聊'
    case TelegramChatType.Group:
      return '群组'
    case TelegramChatType.SuperGroup:
      return '超级群组'
    case TelegramChatType.Channel:
      return '频道'
    default:
      return '未知'
  }
}

export function extractTextFromMessage(message: Message): string {
  if (message.text)
    return message.text
  if (message.caption)
    return message.caption

  return ''
}

export function formatFullNameAndUsername(fullName: string, username: string): string {
  if (!username)
    return fullName

  if (fullName.length >= 10)
    return `${username} (用户名：${username})`


  return `${fullName} (用户名：${username})`
}
