import { Telegraf } from 'telegraf'

export const bot = new Telegraf(process.env.BOT_TOKEN ?? '')

const CHAT_ID_LIST = [
  -1001486639997, // MtF.wiki Official
]

bot.use(
  (context, next) => {
    const chatId = context.message?.chat.id ?? Number.NaN
    if (CHAT_ID_LIST.includes(chatId)) return next()
    return context.leaveChat()
  },
  (context) => {
    const { message } = context
    const chatType = message?.chat.type ?? ''
    if (!['group', 'supergroup'].includes(chatType)) return
    if (message?.sender_chat?.type !== 'channel') return
    return context.banChatSenderChat(message.sender_chat.id)
  },
)