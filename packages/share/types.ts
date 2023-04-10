import type { Context, Telegraf } from 'telegraf'
import type { Update } from 'telegraf/typings/core/types/typegram'
import type { Readability } from '@mozilla/readability'

export type TgBot = Telegraf<Context<Update>>

export type WebArticle = NonNullable<ReturnType<Readability['parse']>>
