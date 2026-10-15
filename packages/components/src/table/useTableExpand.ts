import { computed, ref, watch, type Ref } from 'vue'
import type { RbTableColumn, RbTableRowKey } from './types'
import { getRowIdentity } from './utils'

export function useTableExpand(
  data: Ref<Record<string, unknown>[]>,
  columns: Ref<RbTableColumn[]>,
  rowKey: Ref<RbTableRowKey | undefined>,
  expandRowKeys: Ref<Array<string | number> | undefined>,
  defaultExpandAll: Ref<boolean>,
  emit: {
    (
      event: 'expand-change',
      payload: {
        row: Record<string, unknown>
        expanded: boolean
        expandedRows: Record<string, unknown>[]
      },
    ): void
  },
) {
  const expandedKeys = ref<Set<string>>(new Set())

  const expandColumn = computed(
    () => columns.value.find((column) => column.type === 'expand') ?? null,
  )

  function keyOf(row: Record<string, unknown>, index: number) {
    return getRowIdentity(row, index, rowKey.value)
  }

  function syncFromKeys(keys?: Array<string | number>) {
    if (!keys) return
    expandedKeys.value = new Set(keys.map(String))
  }

  watch(
    expandRowKeys,
    (keys) => {
      if (keys) syncFromKeys(keys)
    },
    { immediate: true, deep: true },
  )

  watch(
    [data, defaultExpandAll],
    ([list, expandAll]) => {
      if (expandRowKeys.value) return
      if (!expandAll) return
      expandedKeys.value = new Set(list.map((row, index) => keyOf(row, index)))
    },
    { immediate: true, deep: true },
  )

  watch(
    data,
    (list) => {
      const valid = new Set(list.map((row, index) => keyOf(row, index)))
      const next = new Set<string>()
      expandedKeys.value.forEach((key) => {
        if (valid.has(key)) next.add(key)
      })
      if (next.size !== expandedKeys.value.size) {
        expandedKeys.value = next
      }
    },
    { deep: true },
  )

  const expandedRows = computed(() =>
    data.value.filter((row, index) => expandedKeys.value.has(keyOf(row, index))),
  )

  function isExpanded(row: Record<string, unknown>, index: number) {
    return expandedKeys.value.has(keyOf(row, index))
  }

  function toggleRowExpansion(row: Record<string, unknown>, expanded?: boolean) {
    if (!expandColumn.value) return
    const index = data.value.indexOf(row)
    if (index < 0) return

    const key = keyOf(row, index)
    const next = new Set(expandedKeys.value)
    const shouldExpand = expanded === undefined ? !next.has(key) : expanded

    if (shouldExpand) next.add(key)
    else next.delete(key)

    expandedKeys.value = next
    emit('expand-change', {
      row,
      expanded: shouldExpand,
      expandedRows: data.value.filter((item, itemIndex) =>
        next.has(keyOf(item, itemIndex)),
      ),
    })
  }

  return {
    expandColumn,
    expandedRows,
    isExpanded,
    toggleRowExpansion,
  }
}
