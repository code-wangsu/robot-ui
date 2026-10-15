<script setup lang="ts">
import RbIcon from '../icon/rb-icon.vue'
import type { RbTableColumn } from './types'
import {
  cellBaseStyle,
  formatCellValue,
  getColumnProp,
  resolveFixedSide,
  resolveIndexText,
} from './utils'

defineOptions({ name: 'RbTableRow' })

const props = defineProps<{
  columns: RbTableColumn[]
  row: Record<string, unknown>
  index: number
  stripe?: boolean
  current?: boolean
  selected?: boolean
  selectable?: boolean
  expanded?: boolean
  leftOffsets: number[]
  rightOffsets: number[]
}>()

const emit = defineEmits<{
  click: [payload: { row: Record<string, unknown>; index: number }]
  select: []
  expand: []
}>()

function tdClass(column: RbTableColumn) {
  const side = resolveFixedSide(column.fixed)
  return {
    'rb-table__td--stripe': props.stripe && props.index % 2 === 1,
    'rb-table__td--current': props.current,
    'rb-table__td--selected': props.selected,
    'rb-table__td--fixed-left': side === 'left',
    'rb-table__td--fixed-right': side === 'right',
    'rb-table__td--ellipsis': Boolean(column.ellipsis),
    'rb-table__td--selection': column.type === 'selection',
    'rb-table__td--expand': column.type === 'expand',
  }
}

function tdStyle(column: RbTableColumn, colIndex: number) {
  return cellBaseStyle(column, {
    left: props.leftOffsets[colIndex],
    right: props.rightOffsets[colIndex],
  })
}

function onCellClick(column: RbTableColumn, event: Event) {
  if (column.type === 'selection') {
    event.stopPropagation?.()
    if (props.selectable) emit('select')
    return
  }
  if (column.type === 'expand') {
    event.stopPropagation?.()
    emit('expand')
    return
  }
  emit('click', { row: props.row, index: props.index })
}
</script>

<template>
  <view
    class="rb-table__row"
    :class="{
      'rb-table__row--current': current,
      'rb-table__row--selected': selected,
      'rb-table__row--expanded': expanded,
    }"
  >
    <view
      v-for="(column, colIndex) in columns"
      :key="getColumnProp(column, colIndex)"
      class="rb-table__td"
      :class="tdClass(column)"
      :style="tdStyle(column, colIndex)"
      @click.stop="onCellClick(column, $event)"
    >
      <view
        v-if="column.type === 'selection'"
        class="rb-table__check"
        :class="{
          'rb-table__check--checked': selected,
          'rb-table__check--disabled': !selectable,
        }"
      />

      <view
        v-else-if="column.type === 'expand'"
        class="rb-table__expand-icon"
        :class="{ 'rb-table__expand-icon--expanded': expanded }"
      >
        <rb-icon name="jiantou_you" :size="28" />
      </view>

      <text v-else-if="column.type === 'index'" class="rb-table__cell-text">
        {{ resolveIndexText(column, index) }}
      </text>

      <slot
        v-else
        :name="`cell-${column.prop}`"
        :row="row"
        :column="column"
        :index="index"
      >
        <text
          class="rb-table__cell-text"
          :class="{ 'rb-table__cell-text--ellipsis': column.ellipsis }"
        >
          {{ formatCellValue(row, column, index) }}
        </text>
      </slot>
    </view>
  </view>
</template>
