/**
 * 虚拟列表可视窗口计算。
 * 基于固定行高，返回需要渲染的起止索引与偏移。
 */
export interface VirtualRange {
  start: number
  end: number
  offset: number
  visibleCount: number
}

export function calcVirtualRange(
  scrollTop: number,
  total: number,
  itemHeight: number,
  viewportHeight: number,
  buffer = 5,
): VirtualRange {
  if (total <= 0 || itemHeight <= 0 || viewportHeight <= 0) {
    return { start: 0, end: 0, offset: 0, visibleCount: 0 }
  }

  const visibleCount = Math.ceil(viewportHeight / itemHeight)
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer)
  const end = Math.min(total, start + visibleCount + buffer * 2)
  const offset = start * itemHeight

  return { start, end, offset, visibleCount }
}
