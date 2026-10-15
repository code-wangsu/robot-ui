const ALLOWED_TAGS = new Set([
  'a',
  'b',
  'br',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'i',
  'img',
  'li',
  'ol',
  'p',
  'span',
  'strong',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr',
  'u',
  'ul',
])

const ALLOWED_ATTRS = new Set([
  'href',
  'src',
  'alt',
  'title',
  'class',
  'style',
  'width',
  'height',
  'target',
])

/**
 * 轻量 HTML 净化，供 rich-text 渲染（非完整 XSS 防护库，面向受控内容）。
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''

  let out = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|iframe|object|embed|link|meta)[\s\S]*?<\/\1>/gi, '')
    .replace(/<\/?(script|style|iframe|object|embed|link|meta)[^>]*>/gi, '')

  out = out.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (full, rawTag: string, rawAttrs: string) => {
    const isClose = full.startsWith('</')
    const tag = rawTag.toLowerCase()
    if (!ALLOWED_TAGS.has(tag)) return ''
    if (isClose) return `</${tag}>`

    const attrs = sanitizeAttrs(rawAttrs, tag)
    if (tag === 'br' || tag === 'img') {
      return `<${tag}${attrs} />`
    }
    return `<${tag}${attrs}>`
  })

  return out
}

function sanitizeAttrs(raw: string, tag: string): string {
  if (!raw) return ''
  const parts: string[] = []
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g
  let match: RegExpExecArray | null
  while ((match = re.exec(raw))) {
    const name = match[1]!.toLowerCase()
    const value = match[2] ?? match[3] ?? match[4] ?? ''
    if (name.startsWith('on')) continue
    if (!ALLOWED_ATTRS.has(name)) continue
    if ((name === 'href' || name === 'src') && /^\s*javascript:/i.test(value)) continue
    if (tag === 'a' && name === 'href') {
      parts.push(`href="${escapeAttr(value)}"`)
      continue
    }
    if (tag === 'img' && name === 'src') {
      parts.push(`src="${escapeAttr(value)}"`)
      continue
    }
    if (name === 'style') {
      parts.push(`style="${escapeAttr(sanitizeStyle(value))}"`)
      continue
    }
    parts.push(`${name}="${escapeAttr(value)}"`)
  }
  return parts.length ? ` ${parts.join(' ')}` : ''
}

function sanitizeStyle(style: string): string {
  return style
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((s) => !/expression|javascript|import/i.test(s))
    .join('; ')
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** 从 HTML 中提取图片地址，供预览 */
export function extractImageSrcs(html: string): string[] {
  const list: string[] = []
  const re = /<img[^>]+src=["']([^"']+)["']/gi
  let match: RegExpExecArray | null
  while ((match = re.exec(html))) {
    if (match[1]) list.push(match[1])
  }
  return list
}
