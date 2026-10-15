/**
 * 将组件 scss 中的语义色 Sass 变量替换为 CSS 变量，以支持运行时主题切换。
 * node packages/styles/scripts/migrate-css-vars.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const COMP_DIR = path.resolve(__dirname, '../components')

/** 长名优先 */
const REPLACEMENTS = [
  ['$rb-primary-disabled', 'var(--rb-color-primary-disabled)'],
  ['$rb-primary-light', 'var(--rb-color-primary-light)'],
  ['$rb-primary-dark', 'var(--rb-color-primary-dark)'],
  ['$rb-primary', 'var(--rb-color-primary)'],
  ['$rb-success-disabled', 'var(--rb-color-success-disabled)'],
  ['$rb-success-light', 'var(--rb-color-success-light)'],
  ['$rb-success-dark', 'var(--rb-color-success-dark)'],
  ['$rb-success', 'var(--rb-color-success)'],
  ['$rb-warning-disabled', 'var(--rb-color-warning-disabled)'],
  ['$rb-warning-light', 'var(--rb-color-warning-light)'],
  ['$rb-warning-dark', 'var(--rb-color-warning-dark)'],
  ['$rb-warning', 'var(--rb-color-warning)'],
  ['$rb-error-disabled', 'var(--rb-color-error-disabled)'],
  ['$rb-error-light', 'var(--rb-color-error-light)'],
  ['$rb-error-dark', 'var(--rb-color-error-dark)'],
  ['$rb-error', 'var(--rb-color-error)'],
  ['$rb-info-disabled', 'var(--rb-color-info-disabled)'],
  ['$rb-info-light', 'var(--rb-color-info-light)'],
  ['$rb-info-dark', 'var(--rb-color-info-dark)'],
  ['$rb-info', 'var(--rb-color-info)'],
  ['$rb-main-color', 'var(--rb-text-color-primary)'],
  ['$rb-content-color', 'var(--rb-text-color-regular)'],
  ['$rb-tips-color', 'var(--rb-text-color-secondary)'],
  ['$rb-light-color', 'var(--rb-text-color-placeholder)'],
  ['$rb-border-color', 'var(--rb-border-color)'],
  ['$rb-bg-color', 'var(--rb-bg-color)'],
  ['$rb-disabled-color', 'var(--rb-disabled-color)'],
  ['$rb-white', 'var(--rb-color-white)'],
]

let files = 0
let hits = 0

for (const name of fs.readdirSync(COMP_DIR)) {
  if (!name.endsWith('.scss')) continue
  const file = path.join(COMP_DIR, name)
  let src = fs.readFileSync(file, 'utf8')
  let changed = false
  for (const [from, to] of REPLACEMENTS) {
    if (!src.includes(from)) continue
    const next = src.split(from).join(to)
    if (next !== src) {
      hits += src.split(from).length - 1
      src = next
      changed = true
    }
  }
  if (changed) {
    fs.writeFileSync(file, src, 'utf8')
    files += 1
  }
}

console.log(`migrated ${files} files, ${hits} replacements`)
