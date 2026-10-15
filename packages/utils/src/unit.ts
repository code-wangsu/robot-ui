import { isNumber, isNaN as lodashIsNaN } from 'lodash-es'

/**
 * 将数值转为带单位的 CSS 尺寸字符串。
 * 纯数字默认追加 rpx，已有单位则原样返回。
 */
export function addUnit(value?: string | number, unit = 'rpx'): string {
  if (value === undefined || value === '') {
    return ''
  }

  if (isNumber(value) || /^-?\d+(\.\d+)?$/.test(String(value))) {
    return `${value}${unit}`
  }

  return String(value)
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function toNumber(value: unknown, fallback = 0): number {
  const num = Number(value)
  return lodashIsNaN(num) ? fallback : num
}

/**
 * rpx 转 px。uni-app App 端滚动事件返回 px，虚拟列表计算需统一单位。
 */
export function rpxToPx(rpx: number): number {
  const uniApi = (globalThis as { uni?: { upx2px?: (n: number) => number } }).uni
  if (typeof uniApi?.upx2px === 'function') {
    return uniApi.upx2px(rpx)
  }
  // H5 / 单测兜底：按 750 设计稿、375 屏宽换算
  return (rpx / 750) * 375
}
