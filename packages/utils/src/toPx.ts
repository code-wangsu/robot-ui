import { toNumber } from './unit'

/**
 * 将尺寸值转为 px，供滚动/吸顶等与视口比较。
 * 纯数字按 rpx 处理；带 px 直接解析；带 rpx 走 upx2px。
 */
export function toPx(value: string | number | undefined, fallback = 0): number {
  if (value === undefined || value === '') return fallback
  if (typeof value === 'number') return rpxToViewportPx(value)

  const str = String(value).trim()
  if (/^-?\d+(\.\d+)?px$/i.test(str)) {
    return toNumber(str.replace(/px/i, ''), fallback)
  }
  if (/^-?\d+(\.\d+)?rpx$/i.test(str)) {
    return rpxToViewportPx(toNumber(str.replace(/rpx/i, ''), fallback))
  }
  if (/^-?\d+(\.\d+)?$/.test(str)) {
    return rpxToViewportPx(toNumber(str, fallback))
  }
  return fallback
}

function rpxToViewportPx(rpx: number): number {
  if (typeof uni !== 'undefined' && typeof uni.upx2px === 'function') {
    return uni.upx2px(rpx)
  }
  return (rpx / 750) * 375
}
