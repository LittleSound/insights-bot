import type { Context, Telegraf } from 'telegraf'
import type { Update } from 'telegraf/typings/core/types/typegram'

export type TgBot = Telegraf<Context<Update>>
