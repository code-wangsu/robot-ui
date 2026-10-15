import { colorToRgba, hexToRgb, rgbToHex } from './color'

export type RbThemeKey =
  | 'tech-blue'
  | 'guowang-green'
  | 'business-gray'
  | 'business-orange'
  | 'fresh-green'
  | 'cool-purple'
  | 'alert-red'
  | 'mourning-white'
  | 'leaf-cyan'
  | 'girl-pink'
  | 'sky-blue'

export interface RbThemePreset {
  key: RbThemeKey
  label: string
  primary: string
}

/** 内置主题（与 packages/styles/themes/palettes.scss 保持一致） */
export const RB_THEME_PRESETS: readonly RbThemePreset[] = [
  { key: 'tech-blue', label: '科技蓝', primary: '#3c9cff' },
  { key: 'guowang-green', label: '国网绿', primary: '#00a057' },
  { key: 'business-gray', label: '商务灰', primary: '#5b6b7c' },
  { key: 'business-orange', label: '商业橙', primary: '#ff6a00' },
  { key: 'fresh-green', label: '清新绿', primary: '#2ecc71' },
  { key: 'cool-purple', label: '炫酷紫', primary: '#7c4dff' },
  { key: 'alert-red', label: '醒目红', primary: '#e53935' },
  { key: 'mourning-white', label: '默哀白', primary: '#8c8c8c' },
  { key: 'leaf-cyan', label: '树叶青', primary: '#1abc9c' },
  { key: 'girl-pink', label: '少女粉', primary: '#ff6b9d' },
  { key: 'sky-blue', label: '蓝天浅蓝', primary: '#64b5f6' },
] as const

export const RB_DEFAULT_THEME: RbThemeKey = 'tech-blue'

const STORAGE_KEY = 'rb-theme'
const ATTR = 'data-rb-theme'

type CssVarTarget = HTMLElement | null | undefined

function mixChannel(from: number, to: number, weight: number) {
  return Math.round(from + (to - from) * weight)
}

/** weight: 0=base, 1=target */
export function mixHex(base: string, target: string, weight: number): string {
  const a = hexToRgb(base)
  const b = hexToRgb(target)
  return rgbToHex(
    mixChannel(a.r, b.r, weight),
    mixChannel(a.g, b.g, weight),
    mixChannel(a.b, b.b, weight),
  )
}

export function buildPrimaryCssVars(primary: string): Record<string, string> {
  return {
    '--rb-color-primary': primary,
    '--rb-color-primary-dark': mixHex(primary, '#000000', 0.2),
    '--rb-color-primary-light': mixHex(primary, '#ffffff', 0.9),
    '--rb-color-primary-disabled': mixHex(primary, '#ffffff', 0.5),
    '--rb-color-primary-light-3': mixHex(primary, '#ffffff', 0.3),
    '--rb-color-primary-light-5': mixHex(primary, '#ffffff', 0.5),
  }
}

function getRoots(): HTMLElement[] {
  if (typeof document === 'undefined') return []
  const list: HTMLElement[] = []
  if (document.documentElement) list.push(document.documentElement)
  if (document.body) list.push(document.body)
  return list
}

function applyAttr(theme: string) {
  for (const el of getRoots()) {
    el.setAttribute(ATTR, theme)
  }
}

function clearInlinePrimary(el: HTMLElement) {
  ;[
    '--rb-color-primary',
    '--rb-color-primary-dark',
    '--rb-color-primary-light',
    '--rb-color-primary-disabled',
    '--rb-color-primary-light-3',
    '--rb-color-primary-light-5',
  ].forEach((k) => el.style.removeProperty(k))
}

function persist(theme: string) {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, theme)
    }
  } catch {
    /* ignore */
  }
  try {
    const uni = (globalThis as { uni?: { setStorageSync?: (k: string, v: string) => void } }).uni
    uni?.setStorageSync?.(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

function readPersisted(): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v) return v
    }
  } catch {
    /* ignore */
  }
  try {
    const uni = (globalThis as { uni?: { getStorageSync?: (k: string) => string } }).uni
    const v = uni?.getStorageSync?.(STORAGE_KEY)
    if (v) return String(v)
  } catch {
    /* ignore */
  }
  return null
}

let currentTheme: RbThemeKey | string = RB_DEFAULT_THEME

/** 切换内置主题（写入 data-rb-theme，对齐 Element Plus CSS 变量方案） */
export function setTheme(theme: RbThemeKey | string, target?: CssVarTarget) {
  currentTheme = theme
  const roots = target ? [target] : getRoots()
  for (const el of roots) {
    el.setAttribute(ATTR, theme)
    clearInlinePrimary(el)
  }
  if (!target) applyAttr(theme)
  persist(String(theme))
}

/** 读取当前主题 key */
export function getTheme(): string {
  if (typeof document !== 'undefined') {
    const attr = document.documentElement.getAttribute(ATTR)
    if (attr) return attr
  }
  return currentTheme
}

/** 仅覆盖主色（自定义品牌色），会同步写入 light/dark/disabled */
export function setPrimaryColor(color: string, target?: CssVarTarget) {
  const vars = buildPrimaryCssVars(color)
  const roots = target ? [target] : getRoots()
  for (const el of roots) {
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v))
  }
}

/** 启动时恢复本地主题 */
export function initTheme(fallback: RbThemeKey | string = RB_DEFAULT_THEME) {
  const saved = readPersisted() || fallback
  setTheme(saved)
  return saved
}

export function getThemePresets(): readonly RbThemePreset[] {
  return RB_THEME_PRESETS
}

/** 工具：主色透明度 */
export function primaryAlpha(alpha: number, primary = RB_THEME_PRESETS[0].primary) {
  return colorToRgba(primary, alpha)
}
