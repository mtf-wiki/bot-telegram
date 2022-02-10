import makeHandler from 'lambda-request-handler'
import { bot } from './bot'

export const handler = makeHandler(bot.webhookCallback(process.env.BOT_HOOK_PATH ?? ''))
