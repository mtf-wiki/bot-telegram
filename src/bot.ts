import { Telegraf } from 'telegraf'
import { onlyChatIDs } from './rules/only-chat-ids'
import { banChannelSender } from './rules/ban-channel-sender'
import { banInvisibleName } from './rules/ban-invisible-name'

export const bot = new Telegraf(process.env.BOT_TOKEN ?? '')

bot.use(
  onlyChatIDs(-1001486639997), // limit only official
  banChannelSender,
  banInvisibleName,
)
