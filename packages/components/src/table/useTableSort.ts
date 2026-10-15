import { computed, ref, watch, type Ref } from 'vue'
import { orderBy } from 'lodash-es'
import type { RbTableColumn, RbTableSortState, SortOrder } from './types'

export function useTableSort(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<RbTableColumn[]>,
  emit: (event: 'sort-change', state: RbTableSortState | null) => void,
  defaultSort?: Ref<RbTableSortState | null | undefined>,
) {
  const sortState = ref<RbTableSortState | null>(normalizeDefaultSort(defaultSort?.value))

  watch(
    () => defaultSort?.value,
    (val) => {
      if (val) sortState.value = { prop: val.prop, order: val.order }
    },
  )

  const sortedData = computed(() => {
    if (!sortState.value) return data.value

    const column = columns.value.find(
      (item) => item.prop === sortState.value!.prop && item.sortable,
    )
    if (!column) return data.value

    if (typeof column.sortable === 'function') {
      const sorter = column.sortable
      const order = sortState.value.order
      return [...data.value].sort((a, b) => {
        const result = sorter(a, b)
        return order === 'asc' ? result : -result
      })
    }

    return orderBy(data.value, [sortState.value.prop], [sortState.value.order])
  })

  function toggleSort(column: RbTableColumn) {
    if (!column.sortable || !column.prop) return

    const next = nextOrder(sortState.value, column.prop)
    sortState.value = next
    emit('sort-change', next)
  }

  function clearSort() {
    if (!sortState.value) return
    sortState.value = null
    emit('sort-change', null)
  }

  return {
    sortState,
    sortedData,
    toggleSort,
    clearSort,
  }
}

function normalizeDefaultSort(
  value: RbTableSortState | null | undefined,
): RbTableSortState | null {
  if (!value?.prop || !value.order) return null
  return { prop: value.prop, order: value.order }
}

function nextOrder(
  current: RbTableSortState | null,
  prop: string,
): RbTableSortState | null {
  if (!current || current.prop !== prop) {
    return { prop, order: 'asc' }
  }
  if (current.order === 'asc') {
    return { prop, order: 'desc' }
  }
  return null
}

export function sortIcon(order: SortOrder): string {
  if (order === 'asc') return '↑'
  if (order === 'desc') return '↓'
  return '↕'
}
