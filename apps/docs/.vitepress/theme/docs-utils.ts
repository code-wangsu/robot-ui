/**
 * 文档站专用 utils：数字尺寸按 rpx→px（/2）输出，避免浏览器忽略 rpx 导致预览空白。
 */
import { isNumber } from 'lodash-es'
import * as RealUtils from '../../../../packages/utils/src/index'

export * from '../../../../packages/utils/src/index'

export function addUnit(value?: string | number, unit = 'rpx'): string {
  if (value === undefined || value === '') {
    return ''
  }

  if (typeof value === 'string' && /^-?[\d.]+rpx$/i.test(value.trim())) {
    return `${Number.parseFloat(value) / 2}px`
  }

  if (isNumber(value) || /^-?\d+(\.\d+)?$/.test(String(value))) {
    const num = Number(value)
    if (unit === 'rpx') return `${num / 2}px`
    return `${num}${unit}`
  }

  return String(value)
}

// 保留真实实现供对比（避免 tree-shake 告警）
void RealUtils
