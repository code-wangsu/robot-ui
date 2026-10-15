/**
 * 根据 packages/assets/iconfont.json 生成图标元数据与 @robot-ui/icons 组件，
 * 并同步字体文件到 components / styles。
 *
 * 用法：pnpm icons:gen
 *
 * 注意：不会覆盖 packages/icons/src/createIcon.ts（手写工厂）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ASSETS = path.resolve(__dirname, '..')
const ROOT = path.resolve(ASSETS, '../..')
const ICONS_PKG = path.resolve(ROOT, 'packages/icons')
const COMPONENTS_FONTS = path.resolve(ROOT, 'packages/components/src/assets/fonts')
const STYLES_FONTS = path.resolve(ROOT, 'packages/styles/fonts')

const json = JSON.parse(fs.readFileSync(path.join(ASSETS, 'iconfont.json'), 'utf8'))
const glyphs = json.glyphs || []
const prefix = json.css_prefix_text || 'icon-'
const fontFamily = json.font_family || 'iconfont'

/** @param {string} fontClass */
function toComponentName(fontClass) {
  const parts = fontClass.split(/[^a-zA-Z0-9]+/).filter(Boolean)
  let name = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  if (!name) name = 'Icon'
  if (/^[0-9]/.test(name)) name = `Icon${name}`
  return name
}

/** 处理重名（含 Windows 大小写不敏感，如 ip / IP） */
const usedNames = new Map()
function uniqueComponentName(fontClass) {
  const base = toComponentName(fontClass)
  const key = base.toLowerCase()
  const count = usedNames.get(key) || 0
  usedNames.set(key, count + 1)
  if (count === 0) return base
  return `${base}${count + 1}`
}

const icons = glyphs.map((g) => {
  const fontClass = g.font_class
  return {
    name: fontClass,
    componentName: uniqueComponentName(fontClass),
    title: g.name || fontClass,
    unicode: g.unicode,
    unicodeDecimal: g.unicode_decimal,
    className: `${prefix}${fontClass}`,
  }
})

// --- assets ---
const dataFile = `/* eslint-disable */
/** 由 scripts/generate-icons.mjs 自动生成，请勿手改 */
export interface RbIconMeta {
  /** iconfont font_class，用于 <rb-icon name="xxx" /> */
  name: string
  /** Element Plus 风格组件名 */
  componentName: string
  /** 中文标题 */
  title: string
  unicode: string
  unicodeDecimal: number
  className: string
}

export const ICON_PREFIX = ${JSON.stringify(prefix)} as const
export const ICON_FONT_FAMILY = ${JSON.stringify(fontFamily)} as const

export const iconList: RbIconMeta[] = ${JSON.stringify(icons, null, 2)}

export type RbIconName = ${icons.map((i) => JSON.stringify(i.name)).join(' | ') || 'string'}

export const iconNames = iconList.map((i) => i.name) as RbIconName[]

export const iconNameSet = new Set<string>(iconNames)
`

fs.mkdirSync(path.join(ASSETS, 'src'), { recursive: true })
fs.writeFileSync(path.join(ASSETS, 'src', 'icons-data.ts'), dataFile, 'utf8')
fs.writeFileSync(
  path.join(ASSETS, 'src', 'index.ts'),
  `export {
  ICON_FONT_FAMILY,
  ICON_PREFIX,
  iconList,
  iconNameSet,
  iconNames,
  type RbIconMeta,
  type RbIconName,
} from './icons-data'
`,
  'utf8',
)

// --- icons package（仅生成 icons.ts / index.ts，保留 createIcon.ts） ---
fs.mkdirSync(path.join(ICONS_PKG, 'src'), { recursive: true })

const iconsGenerated = `/* eslint-disable */
/** 由 packages/assets/scripts/generate-icons.mjs 自动生成，请勿手改 */
import { createRobotIcon } from './createIcon'

${icons
  .map(
    (i) =>
      `/** ${i.title} */\nexport const ${i.componentName} = createRobotIcon(${JSON.stringify(i.componentName)}, ${JSON.stringify(i.name)}, ${JSON.stringify(i.title)})`,
  )
  .join('\n\n')}

export const iconComponents = {
${icons.map((i) => `  ${i.componentName},`).join('\n')}
} as const
`

fs.writeFileSync(path.join(ICONS_PKG, 'src', 'icons.ts'), iconsGenerated, 'utf8')
fs.writeFileSync(
  path.join(ICONS_PKG, 'src', 'index.ts'),
  `import '@robot-ui/assets/iconfont.css'

export {
  ICON_FONT_FAMILY,
  ICON_PREFIX,
  iconList,
  iconNameSet,
  iconNames,
  type RbIconMeta,
  type RbIconName,
} from '@robot-ui/assets'

export { createRobotIcon } from './createIcon'
export * from './icons'
export { iconComponents } from './icons'
`,
  'utf8',
)

if (!fs.existsSync(path.join(ICONS_PKG, 'package.json'))) {
  fs.writeFileSync(
    path.join(ICONS_PKG, 'package.json'),
    `${JSON.stringify(
      {
        name: '@robot-ui/icons',
        version: '1.0.0',
        description: 'robot-ui 图标库（Element Plus 风格具名导出 + iconfont）',
        type: 'module',
        main: './src/index.ts',
        module: './src/index.ts',
        types: './src/index.ts',
        exports: { '.': './src/index.ts', './package.json': './package.json' },
        sideEffects: ['**/*.css'],
        files: ['src'],
        scripts: { build: 'node -e "console.log(\'@robot-ui/icons: source package\')"' },
        dependencies: { '@robot-ui/assets': 'workspace:*' },
        peerDependencies: { vue: '^3.4.0' },
        publishConfig: { access: 'public' },
      },
      null,
      2,
    )}\n`,
    'utf8',
  )
}

// --- sync fonts ---
const fontFiles = [
  'iconfont.css',
  'iconfont.js',
  'iconfont.json',
  'iconfont.ttf',
  'iconfont.woff',
  'iconfont.woff2',
]

function syncFonts(targetDir, cssUrlStyle = 'relative') {
  fs.mkdirSync(targetDir, { recursive: true })
  for (const file of fontFiles) {
    const from = path.join(ASSETS, file)
    if (!fs.existsSync(from)) continue
    let content = fs.readFileSync(from)
    if (file === 'iconfont.css' && cssUrlStyle === 'static') {
      let text = content.toString('utf8')
      text = text
        .replace(/url\('iconfont\./g, "url('/static/fonts/iconfont.")
        .replace(/url\("iconfont\./g, 'url("/static/fonts/iconfont.')
      content = Buffer.from(text, 'utf8')
    }
    fs.writeFileSync(path.join(targetDir, file), content)
  }
}

syncFonts(COMPONENTS_FONTS, 'relative')
syncFonts(STYLES_FONTS, 'static')

console.log(`[icons:gen] ${icons.length} icons generated`)
console.log(`[icons:gen] assets -> ${path.join(ASSETS, 'src/icons-data.ts')}`)
console.log(`[icons:gen] icons  -> ${path.join(ICONS_PKG, 'src/icons.ts')}`)
console.log(`[icons:gen] synced fonts -> components & styles`)
