<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { addUnit } from '@robot-ui/utils'
import { bem, normalizeStyle } from '../composables/useBem'
import RbEmpty from '../empty/rb-empty.vue'
import RbLoading from '../loading/rb-loading.vue'
import RbTableHeader from './rb-table-header.vue'
import RbTableRow from './rb-table-row.vue'
import type {
  RbTableColumn,
  RbTableRowKey,
  RbTableSize,
  RbTableSortState,
} from './types'
import { useTableExpand } from './useTableExpand'
import { useTableSelection } from './useTableSelection'
import { useTableSort } from './useTableSort'
import { buildFixedOffsets, getRowIdentity, parseColumnWidth } from './utils'

defineOptions({ name: 'RbTable' })

const props = withDefaults(
  defineProps<{
    columns: RbTableColumn[]
    data: Record<string, unknown>[]
    /** 斑马纹，对齐 el-table stripe */
    stripe?: boolean
    /** 纵向边框，对齐 el-table border */
    border?: boolean
    /** 表格高度，数字默认单位 rpx */
    height?: string | number
    /** 最大高度，数字默认单位 rpx */
    maxHeight?: string | number
    /** 是否显示表头 */
    showHeader?: boolean
    /** 行数据主键，对齐 el-table row-key */
    rowKey?: RbTableRowKey
    /** 高亮当前行 */
    highlightCurrentRow?: boolean
    /** 默认排序 */
    defaultSort?: RbTableSortState | null
    /** 受控展开行 keys */
    expandRowKeys?: Array<string | number>
    /** 默认展开全部 */
    defaultExpandAll?: boolean
    /** 加载中 */
    loading?: boolean
    /** 尺寸：移动端默认偏触控 */
    size?: RbTableSize
    emptyText?: string
    customStyle?: string | Record<string, string | number>
    customClass?: string
  }>(),
  {
    stripe: false,
    border: false,
    height: '',
    maxHeight: '',
    showHeader: true,
    highlightCurrentRow: false,
    defaultSort: null,
    defaultExpandAll: false,
    loading: false,
    size: 'default',
    emptyText: '暂无数据',
    customStyle: '',
    customClass: '',
  },
)

const emit = defineEmits<{
  'sort-change': [state: RbTableSortState | null]
  'row-click': [payload: { row: Record<string, unknown>; index: number }]
  'selection-change': [selection: Record<string, unknown>[]]
  select: [payload: { selection: Record<string, unknown>[]; row: Record<string, unknown> }]
  'select-all': [selection: Record<string, unknown>[]]
  'expand-change': [
    payload: {
      row: Record<string, unknown>
      expanded: boolean
      expandedRows: Record<string, unknown>[]
    },
  ]
  'current-change': [
    payload: {
      currentRow: Record<string, unknown> | null
      oldCurrentRow: Record<string, unknown> | null
    },
  ]
}>()

const currentRow = ref<Record<string, unknown> | null>(null)
const currentKey = ref<string | null>(null)

const { sortState, sortedData, toggleSort, clearSort } = useTableSort(
  toRef(props, 'data'),
  toRef(props, 'columns'),
  emit,
  toRef(props, 'defaultSort'),
)

const {
  selectionColumn: _selectionColumn,
  isAllSelected,
  isIndeterminate,
  isSelected,
  isRowSelectable,
  toggleRowSelection,
  toggleAllSelection,
  clearSelection,
  getSelectionRows,
} = useTableSelection(
  sortedData,
  toRef(props, 'columns'),
  toRef(props, 'rowKey'),
  emit,
)

const { isExpanded, toggleRowExpansion } = useTableExpand(
  sortedData,
  toRef(props, 'columns'),
  toRef(props, 'rowKey'),
  toRef(props, 'expandRowKeys'),
  toRef(props, 'defaultExpandAll'),
  emit,
)

const fixedOffsets = computed(() => buildFixedOffsets(props.columns))

/** 表头约占高度（与 padding/字号大致对齐），用于从总高中扣除，保证表头不进纵向滚动区 */
const headerOccupy = computed(() => {
  if (!props.showHeader) return 0
  return props.size === 'small' ? 72 : 88
})

function parseSizeNumber(value: string | number): number | null {
  if (value === '' || value === undefined) return null
  if (typeof value === 'number') return value
  const matched = String(value).match(/^-?[\d.]+/)
  return matched ? Number(matched[0]) : null
}

const rootStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.height !== '' && props.height !== undefined) {
    style.height = addUnit(props.height)
  }
  if (props.maxHeight !== '' && props.maxHeight !== undefined) {
    style.maxHeight = addUnit(props.maxHeight)
  }
  const extra = normalizeStyle(props.customStyle)
  if (extra && typeof extra !== 'string') Object.assign(style, extra)
  return style
})

/** 横向滚动容器：吃满表格高度 */
const xScrollStyle = computed(() => {
  if (props.height !== '' && props.height !== undefined) {
    return { height: '100%' }
  }
  if (props.maxHeight !== '' && props.maxHeight !== undefined) {
    return { maxHeight: addUnit(props.maxHeight) }
  }
  return undefined
})

/**
 * 纵向仅滚动表体：表头放在 scroll-y 外，避免 App 端 scroll-view 内 sticky 失效。
 * 横向由外层 scroll-x 统一带动表头+表体。
 */
const yScrollStyle = computed(() => {
  const style: Record<string, string> = {}
  const h = parseSizeNumber(props.height)
  const mh = parseSizeNumber(props.maxHeight)
  if (h != null) {
    style.height = addUnit(Math.max(80, h - headerOccupy.value))
  } else if (mh != null) {
    style.maxHeight = addUnit(Math.max(80, mh - headerOccupy.value))
  }
  return Object.keys(style).length ? style : undefined
})

const tableMinWidth = computed(() => {
  const total = props.columns.reduce((sum, col) => sum + parseColumnWidth(col), 0)
  return addUnit(total)
})

const rootClass = computed(() =>
  bem(
    'rb-table',
    props.border && 'border',
    props.size === 'small' && 'small',
    props.loading && 'loading',
  ),
)

function rowKeyOf(row: Record<string, unknown>, index: number) {
  return getRowIdentity(row, index, props.rowKey)
}

function isCurrent(row: Record<string, unknown>, index: number) {
  if (!props.highlightCurrentRow || currentKey.value == null) return false
  return currentKey.value === rowKeyOf(row, index)
}

function setCurrentRow(row: Record<string, unknown> | null) {
  const oldCurrentRow = currentRow.value
  currentRow.value = row
  if (row) {
    const index = Math.max(0, sortedData.value.indexOf(row))
    currentKey.value = rowKeyOf(row, index)
  } else {
    currentKey.value = null
  }
  emit('current-change', { currentRow: row, oldCurrentRow })
}

function onRowClick(payload: { row: Record<string, unknown>; index: number }) {
  if (props.highlightCurrentRow) {
    setCurrentRow(payload.row)
  }
  emit('row-click', payload)
}

defineExpose({
  clearSelection,
  toggleRowSelection,
  toggleAllSelection,
  getSelectionRows,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
})
</script>

<template>
  <view
    class="rb-table"
    :class="[rootClass, customClass]"
    :style="rootStyle"
  >
    <!-- 外层横向滚动：表头与表体同步左右滑动 -->
    <scroll-view
      class="rb-table__scroll-x"
      scroll-x
      :show-scrollbar="true"
      :style="xScrollStyle"
    >
      <view class="rb-table__main" :style="{ minWidth: tableMinWidth }">
        <!-- 表头固定在纵向滚动外 -->
        <rb-table-header
          v-if="showHeader"
          :columns="columns"
          :sort-state="sortState"
          :left-offsets="fixedOffsets.leftOffsets"
          :right-offsets="fixedOffsets.rightOffsets"
          :is-all-selected="isAllSelected"
          :is-indeterminate="isIndeterminate"
          @sort="toggleSort"
          @select-all="toggleAllSelection"
        />

        <!-- 仅表体纵向滚动 -->
        <scroll-view
          class="rb-table__scroll-y"
          scroll-y
          :style="yScrollStyle"
        >
          <template v-if="sortedData.length">
            <template v-for="(row, index) in sortedData" :key="rowKeyOf(row, index)">
              <rb-table-row
                :columns="columns"
                :row="row"
                :index="index"
                :stripe="stripe"
                :current="isCurrent(row, index)"
                :selected="isSelected(row, index)"
                :selectable="isRowSelectable(row, index)"
                :expanded="isExpanded(row, index)"
                :left-offsets="fixedOffsets.leftOffsets"
                :right-offsets="fixedOffsets.rightOffsets"
                @click="onRowClick"
                @select="toggleRowSelection(row)"
                @expand="toggleRowExpansion(row)"
              >
                <template
                  v-for="column in columns"
                  :key="column.prop"
                  #[`cell-${column.prop}`]="slotProps"
                >
                  <slot
                    v-if="column.prop"
                    :name="`cell-${column.prop}`"
                    v-bind="slotProps"
                  />
                </template>
              </rb-table-row>

              <view
                v-if="isExpanded(row, index)"
                class="rb-table__expand-row"
              >
                <view class="rb-table__expand-inner">
                  <slot name="expand" :row="row" :index="index" />
                </view>
              </view>
            </template>
          </template>

          <view v-else class="rb-table__empty">
            <slot name="empty">
              <rb-empty :text="emptyText" />
            </slot>
          </view>
        </scroll-view>
      </view>
    </scroll-view>

    <view v-if="loading" class="rb-table__loading">
      <rb-loading text="加载中" />
    </view>
  </view>
</template>
