import { describe, expect, it } from 'vitest'
import {
  addUnit,
  clamp,
  calcVirtualRange,
  extractImageSrcs,
  hexToRgb,
  rgbToHex,
  rpxToPx,
  sanitizeHtml,
  toPx,
} from '../src'

describe('addUnit', () => {
  it('为数字追加默认 rpx', () => {
    expect(addUnit(12)).toBe('12rpx')
  })

  it('保留已有单位', () => {
    expect(addUnit('10px')).toBe('10px')
  })
})

describe('clamp', () => {
  it('限制数值范围', () => {
    expect(clamp(5, 0, 10)).toBe(5)
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(20, 0, 10)).toBe(10)
  })
})

describe('color', () => {
  it('hex 与 rgb 互转', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
  })
})

describe('rpxToPx / toPx', () => {
  it('无 uni 环境时按 750 设计稿换算', () => {
    expect(rpxToPx(750)).toBe(375)
    expect(rpxToPx(100)).toBe(50)
    expect(toPx(100)).toBe(50)
    expect(toPx('20px')).toBe(20)
  })
})

describe('sanitizeHtml', () => {
  it('剥离脚本与事件属性', () => {
    const html = sanitizeHtml(
      `<p onclick="alert(1)">hi</p><script>alert(1)</script><a href="javascript:alert(1)">x</a><a href="https://a.com">ok</a>`,
    )
    expect(html).not.toContain('script')
    expect(html).not.toContain('onclick')
    expect(html).not.toContain('javascript:')
    expect(html).toContain('https://a.com')
    expect(html).toContain('<p>')
  })

  it('提取图片地址', () => {
    expect(extractImageSrcs('<img src="a.png" /><img src=\'b.jpg\'>')).toEqual(['a.png', 'b.jpg'])
  })
})

describe('calcVirtualRange', () => {
  it('计算可视区间', () => {
    const range = calcVirtualRange(200, 100, 40, 400, 2)
    expect(range.start).toBe(3)
    expect(range.end).toBe(17)
    expect(range.offset).toBe(120)
  })

  it('空数据返回零区间', () => {
    expect(calcVirtualRange(0, 0, 40, 400)).toEqual({
      start: 0,
      end: 0,
      offset: 0,
      visibleCount: 0,
    })
  })
})
