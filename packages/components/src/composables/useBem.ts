import type { CSSProperties } from 'vue'
import { isString } from 'lodash-es'

export function normalizeStyle(
  style?: string | Record<string, string | number>,
): CSSProperties | string | undefined {
  if (!style) {
    return undefined
  }
  if (isString(style)) {
    return style
  }
  return style as CSSProperties
}

export function bem(block: string, ...mods: Array<string | false | undefined>): string {
  const classes = [block]
  mods.forEach((mod) => {
    if (mod) {
      classes.push(`${block}--${mod}`)
    }
  })
  return classes.join(' ')
}
