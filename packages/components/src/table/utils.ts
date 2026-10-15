import { addUnit } from '@robot-ui/utils'
import type { RbTableColumn, RbTableRowKey } from './types'

export function getColumnProp(column: RbTableColumn, index: number): string {
  if (column.type === 'selection') return `__selection_${index}`
  if (column.type === 'index') return `__index_${index}`
  if (column.type === 'expand') return `__expand_${index}`
  return column.prop || `__col_${index}`
}

export function getRowIdentity(
  row: Record<string, unknown>,
  index: number,
  rowKey?: RbTableRowKey,
): string {
  if (typeof rowKey === 'function') {
    return String(rowKey(row, index))
  }
  if (typeof rowKey === 'string' && row[rowKey] != null) {
    return String(row[rowKey])
  }
  return String(index)
}

export function resolveFixedSide(fixed?: RbTableColumn['fixed']): 'left' | 'right' | undefined {
  if (fixed === true || fixed === 'left') return 'left'
  if (fixed === 'right') return 'right'
  return undefined
}

/** 计算 sticky 左右偏移，供多固定列叠放 */
export function buildFixedOffsets(columns: RbTableColumn[]) {
  const leftOffsets: number[] = []
  const rightOffsets: number[] = []
  let left = 0
  let right = 0

  columns.forEach((column) => {
    const side = resolveFixedSide(column.fixed)
    const width = parseColumnWidth(column)
    if (side === 'left') {
      leftOffsets.push(left)
      left += width
    } else {
      leftOffsets.push(0)
    }
  })

  for (let i = columns.length - 1; i >= 0; i -= 1) {
    const column = columns[i]
    const side = resolveFixedSide(column.fixed)
    const width = parseColumnWidth(column)
    if (side === 'right') {
      rightOffsets[i] = right
      right += width
    } else {
      rightOffsets[i] = 0
    }
  }

  return { leftOffsets, rightOffsets }
}

export function parseColumnWidth(column: RbTableColumn): number {
  if (column.type === 'selection') {
    return toNumber(column.width, 88)
  }
  if (column.type === 'index') {
    return toNumber(column.width, 96)
  }
  if (column.type === 'expand') {
    return toNumber(column.width, 72)
  }
  return toNumber(column.width ?? column.minWidth, 160)
}

function toNumber(value: string | number | undefined, fallback: number): number {
  if (value === undefined || value === '') return fallback
  if (typeof value === 'number') return value
  const matched = String(value).match(/[\d.]+/)
  return matched ? Number(matched[0]) : fallback
}

export function cellBaseStyle(
  column: RbTableColumn,
  offsets?: { left?: number; right?: number },
) {
  const style: Record<string, string> = {
    textAlign: column.align || (column.type === 'selection' || column.type === 'index' || column.type === 'expand' ? 'center' : 'left'),
  }

  if (column.width !== undefined) {
    style.width = addUnit(column.width)
    style.flex = '0 0 auto'
  } else if (column.minWidth !== undefined) {
    style.minWidth = addUnit(column.minWidth)
    style.flex = '1'
  } else if (column.type === 'selection') {
    style.width = addUnit(88)
    style.flex = '0 0 auto'
  } else if (column.type === 'index') {
    style.width = addUnit(96)
    style.flex = '0 0 auto'
  } else if (column.type === 'expand') {
    style.width = addUnit(72)
    style.flex = '0 0 auto'
  } else {
    style.flex = '1'
    style.minWidth = addUnit(160)
  }

  const side = resolveFixedSide(column.fixed)
  if (side === 'left' && offsets?.left !== undefined) {
    style.left = addUnit(offsets.left)
  }
  if (side === 'right' && offsets?.right !== undefined) {
    style.right = addUnit(offsets.right)
  }

  return style
}

export function formatCellValue(
  row: Record<string, unknown>,
  column: RbTableColumn,
  index: number,
): string {
  const prop = column.prop
  const value = prop ? row[prop] : undefined
  if (column.formatter) {
    return column.formatter(row, column, value, index)
  }
  if (value === null || value === undefined) return ''
  return String(value)
}

export function resolveIndexText(column: RbTableColumn, index: number): string {
  if (typeof column.index === 'function') {
    return String(column.index(index))
  }
  const start = typeof column.index === 'number' ? column.index : 1
  return String(start + index)
}
