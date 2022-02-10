import { Composer } from 'telegraf'
import { User } from 'telegraf/typings/core/types/typegram'

// mention `@admin`
export const onCallAdmin = Composer.mention('admin', async (context) => {
  const members = await context.getChatAdministrators()
  const mentions = members
    .filter(({ user }) => {
      // ignore General Bot
      if (user.is_bot) return false
      // ignore `Deleted Account`
      if (user.first_name === '') return false
      // ignore SCP-079 series bot
      if (user.username?.startsWith('SCP_079')) return false
      return true
    })
    .map(({ user }) => `<a href="tg://user?id=${user.id}">${getDisplayName(user)}</a>`)
    .join('\n')
  await context.reply(mentions, { parse_mode: 'HTML' })
})

function getDisplayName(user: User) {
  if (user.username) return '@' + user.username
  return (user.first_name + ' ' + (user.last_name ?? '')).trim()
}
