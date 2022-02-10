import { Composer } from 'telegraf'

export const banChannelSender = Composer.optional(
  ({ chat, senderChat }) => senderChat?.type === 'channel' && ['group', 'supergroup'].includes(chat?.type ?? ''),
  async (context) => {
    await context.deleteMessage()
    await context.banChatSenderChat(context.senderChat?.id ?? Number.NaN)
  },
)
