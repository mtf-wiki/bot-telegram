import { Composer } from 'telegraf'
import { User } from 'telegraf/typings/core/types/typegram'

// mention `@admin`
export const onCallAdmin = Composer.mention('admin', async (context) => {
  const members = await context.getChatAdministrators()
  const mentions = members
    .filter(({ user }) => !(user.is_bot || user.username?.startsWith('SCP_079')))
    .map(({ user }) => `<a href="tg://user?id=${user.id}">${getDisplayName(user)}</a>`)
    .join('\n')
  await context.reply(mentions, { parse_mode: 'HTML' })
})

function getDisplayName(user: User) {
  if (user.username) return '@' + user.username
  return (user.first_name + ' ' + (user.last_name ?? '')).trim()
}
