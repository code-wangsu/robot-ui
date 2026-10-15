import { computed, ref, watch, type Ref } from 'vue'
import type { RbTableColumn, RbTableRowKey } from './types'
import { getRowIdentity } from './utils'

export function useTableSelection(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<RbTableColumn[]>,
  rowKey: Ref<RbTableRowKey | undefined>,
  emit: {
    (event: 'selection-change', selection: Record<string, unknown>[]): void
    (
      event: 'select',
      payload: { selection: Record<string, unknown>[]; row: Record<string, unknown> },
    ): void
    (event: 'select-all', selection: Record<string, unknown>[]): void
  },
) {
  const selectedKeys = ref<Set<string>>(new Set())

  const selectionColumn = computed(
    () => columns.value.find((column) => column.type === 'selection') ?? null,
  )

  function keyOf(row: Record<string, unknown>, index: number) {
    return getRowIdentity(row, index, rowKey.value)
  }

  function isRowSelectable(row: Record<string, unknown>, index: number) {
    const column = selectionColumn.value
    if (!column) return false
    return column.selectable ? column.selectable(row, index) : true
  }

  const selection = computed(() =>
    data.value.filter((row, index) => selectedKeys.value.has(keyOf(row, index))),
  )

  const selectableEntries = computed(() =>
    data.value
      .map((row, index) => ({ row, index, key: keyOf(row, index) }))
      .filter((item) => isRowSelectable(item.row, item.index)),
  )

  const isAllSelected = computed(() => {
    if (!selectableEntries.value.length) return false
    return selectableEntries.value.every((item) => selectedKeys.value.has(item.key))
  })

  const isIndeterminate = computed(() => {
    if (!selectableEntries.value.length) return false
    const count = selectableEntries.value.filter((item) =>
      selectedKeys.value.has(item.key),
    ).length
    return count > 0 && count < selectableEntries.value.length
  })

  watch(
    data,
    (list) => {
      const valid = new Set(list.map((row, index) => keyOf(row, index)))
      const next = new Set<string>()
      let changed = false
      selectedKeys.value.forEach((key) => {
        if (valid.has(key)) next.add(key)
        else changed = true
      })
      if (changed) {
        selectedKeys.value = next
        emit(
          'selection-change',
          list.filter((row, index) => next.has(keyOf(row, index))),
        )
      }
    },
    { deep: true },
  )

  function isSelected(row: Record<string, unknown>, index: number) {
    return selectedKeys.value.has(keyOf(row, index))
  }

  function toggleRowSelection(row: Record<string, unknown>, selected?: boolean) {
    const index = data.value.indexOf(row)
    if (index < 0 || !isRowSelectable(row, index)) return

    const key = keyOf(row, index)
    const next = new Set(selectedKeys.value)
    const shouldSelect = selected === undefined ? !next.has(key) : selected

    if (shouldSelect) next.add(key)
    else next.delete(key)

    selectedKeys.value = next
    const rows = data.value.filter((item, itemIndex) => next.has(keyOf(item, itemIndex)))
    emit('selection-change', rows)
    emit('select', { selection: rows, row })
  }

  function toggleAllSelection() {
    const next = new Set(selectedKeys.value)
    if (isAllSelected.value) {
      selectableEntries.value.forEach((item) => next.delete(item.key))
    } else {
      selectableEntries.value.forEach((item) => next.add(item.key))
    }
    selectedKeys.value = next
    const rows = data.value.filter((item, itemIndex) => next.has(keyOf(item, itemIndex)))
    emit('selection-change', rows)
    emit('select-all', rows)
  }

  function clearSelection() {
    if (!selectedKeys.value.size) return
    selectedKeys.value = new Set()
    emit('selection-change', [])
  }

  function getSelectionRows() {
    return selection.value.slice()
  }

  return {
    selectionColumn,
    selection,
    isAllSelected,
    isIndeterminate,
    isSelected,
    isRowSelectable,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    getSelectionRows,
  }
}
