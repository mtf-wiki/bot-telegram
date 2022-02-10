import { Composer } from 'telegraf'

export const onlyChatIDs = (...chatIDs: number[]) => {
  const ids = new Set(chatIDs)
  return Composer.filter(({ chat }) => ids.has(chat?.id ?? Number.NaN))
}
