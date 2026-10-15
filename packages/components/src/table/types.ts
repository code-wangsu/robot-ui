export type SortOrder = 'asc' | 'desc' | null

/** 对齐 Element Plus：列类型 */
export type RbTableColumnType = 'default' | 'selection' | 'index' | 'expand'

export interface RbTableColumn {
  /** 列唯一键，对应 data 字段；selection / index 列可省略 */
  prop?: string
  /** 表头文案 */
  label?: string
  /** 列类型：勾选 / 序号 / 普通 */
  type?: RbTableColumnType
  /** 列宽，数字默认 rpx */
  width?: string | number
  /** 最小列宽，数字默认 rpx */
  minWidth?: string | number
  /** 对齐 */
  align?: 'left' | 'center' | 'right'
  /** 是否可排序；传函数则为自定义排序 */
  sortable?: boolean | ((a: Record<string, unknown>, b: Record<string, unknown>) => number)
  /** 固定列（移动端用 sticky 实现） */
  fixed?: 'left' | 'right' | boolean
  /** 格式化单元格，对齐 el-table-column formatter */
  formatter?: (
    row: Record<string, unknown>,
    column: RbTableColumn,
    cellValue: unknown,
    index: number,
  ) => string
  /** 超出省略（移动端替代 show-overflow-tooltip） */
  ellipsis?: boolean
  /** selection 列：是否可选中该行 */
  selectable?: (row: Record<string, unknown>, index: number) => boolean
  /** index 列起始值，默认 1 */
  index?: number | ((index: number) => number)
}

export interface RbTableSortState {
  prop: string
  order: Exclude<SortOrder, null>
}

export type RbTableRowKey =
  | string
  | ((row: Record<string, unknown>, index: number) => string | number)

export type RbTableSize = 'default' | 'small'
