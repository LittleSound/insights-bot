import type { Context } from 'grammy'

const help = `你好，欢迎使用 Insights Bot！

量子速读 用法：/smr <链接>
聊天回顾 用法：/recap
开启聊天记录回顾（群组） 用法：/enable_recap
关闭聊天记录回顾（群组） 用法：/disable_recap`

export async function helpCommand(ctx: Context) {
  await ctx.reply(help)
}
