<script setup lang="ts">
import type { RbTableColumn, RbTableSortState } from './types'
import { sortIcon } from './useTableSort'
import {
  cellBaseStyle,
  getColumnProp,
  resolveFixedSide,
} from './utils'

defineOptions({ name: 'RbTableHeader' })

const props = defineProps<{
  columns: RbTableColumn[]
  sortState: RbTableSortState | null
  leftOffsets: number[]
  rightOffsets: number[]
  isAllSelected?: boolean
  isIndeterminate?: boolean
}>()

const emit = defineEmits<{
  sort: [column: RbTableColumn]
  'select-all': []
}>()

function thClass(column: RbTableColumn, index: number) {
  const side = resolveFixedSide(column.fixed)
  return {
    'rb-table__th--sortable': Boolean(column.sortable && column.prop),
    'rb-table__th--fixed-left': side === 'left',
    'rb-table__th--fixed-right': side === 'right',
    'rb-table__th--selection': column.type === 'selection',
  }
}

function thStyle(column: RbTableColumn, index: number) {
  return cellBaseStyle(column, {
    left: props.leftOffsets[index],
    right: props.rightOffsets[index],
  })
}

function onThClick(column: RbTableColumn) {
  if (column.type === 'selection') {
    emit('select-all')
    return
  }
  emit('sort', column)
}
</script>

<template>
  <view class="rb-table__header">
    <view
      v-for="(column, index) in columns"
      :key="getColumnProp(column, index)"
      class="rb-table__th"
      :class="thClass(column, index)"
      :style="thStyle(column, index)"
      @click="onThClick(column)"
    >
      <view
        v-if="column.type === 'selection'"
        class="rb-table__check"
        :class="{
          'rb-table__check--checked': isAllSelected,
          'rb-table__check--indeterminate': isIndeterminate && !isAllSelected,
        }"
      />
      <template v-else>
        <text class="rb-table__th-text">{{ column.label }}</text>
        <text v-if="column.sortable && column.prop" class="rb-table__sort">
          {{
            sortIcon(
              sortState && sortState.prop === column.prop ? sortState.order : null,
            )
          }}
        </text>
      </template>
    </view>
  </view>
</template>
