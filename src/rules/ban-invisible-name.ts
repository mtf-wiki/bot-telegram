import { Composer } from 'telegraf'

const INVISIBLE_PATTERN = combinePattern(
  /\s/,
  /\u00AD\u034F\u061C\u115F\u1160\u17B4\u17B5/,
  /\u202F\u2800\u3000\u3164\uFEFF\uFFA0\uFFFC/,
  /\u180B-\u180E/,
  /\u2000-\u200F/,
  /\u202A-\u202E/,
  /\u205F-\u206F/,
  /\uFE00-\uFE0F/,
  /\uFFF0-\uFFF8/,
  /\u{1D159}/u,
  /\u{1D173}-\u{1D17A}/u,
  /\u{E0000}-\u{E007F}/u,
  /\u{E0100}-\u{E01EF}/u,
)

export const banInvisibleName = Composer.optional(
  ({ from }) => {
    if (!from) return false
    return INVISIBLE_PATTERN.test(from.first_name + (from.last_name ?? ''))
  },
  async (context) => {
    await context.deleteMessage()
    await context.banChatMember(context.from?.id ?? Number.NaN)
  },
)

function combinePattern(...patterns: RegExp[]) {
  const source = patterns.map((re) => re.source).join('')
  return new RegExp(`^[${source}]+$`, 'u')
}
