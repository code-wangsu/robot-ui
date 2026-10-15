import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import RbTable from '../src/table/rb-table.vue'
import type { RbTableColumn } from '../src/table/types'
import { useTableSort } from '../src/table/useTableSort'
import { useTableSelection } from '../src/table/useTableSelection'
import { buildFixedOffsets, formatCellValue, getRowIdentity } from '../src/table/utils'

const baseColumns: RbTableColumn[] = [
  { type: 'selection' },
  { type: 'index', label: '#', width: 80 },
  { prop: 'name', label: '姓名', width: 160, sortable: true, fixed: 'left' },
  { prop: 'age', label: '年龄', width: 120, sortable: true, align: 'center' },
  {
    prop: 'city',
    label: '城市',
    minWidth: 180,
    ellipsis: true,
    formatter: (_row, _column, value) => `城市·${value}`,
  },
]

const baseData = [
  { id: 1, name: '张三', age: 28, city: '上海' },
  { id: 2, name: '李四', age: 32, city: '北京' },
  { id: 3, name: '王五', age: 24, city: '杭州' },
]

describe('table utils', () => {
  it('getRowIdentity 支持字段与函数', () => {
    expect(getRowIdentity(baseData[0], 0, 'id')).toBe('1')
    expect(getRowIdentity(baseData[1], 1, (row) => `k-${row.id}`)).toBe('k-2')
    expect(getRowIdentity(baseData[2], 2)).toBe('2')
  })

  it('buildFixedOffsets 计算左右 sticky 偏移', () => {
    const { leftOffsets, rightOffsets } = buildFixedOffsets([
      { prop: 'a', width: 100, fixed: 'left' },
      { prop: 'b', width: 120 },
      { prop: 'c', width: 80, fixed: 'right' },
    ])
    expect(leftOffsets[0]).toBe(0)
    expect(rightOffsets[2]).toBe(0)
  })

  it('formatCellValue 走 formatter', () => {
    const text = formatCellValue(baseData[0], baseColumns[4], 0)
    expect(text).toBe('城市·上海')
  })
})

describe('useTableSort', () => {
  it('按列切换升序/降序/取消，并支持 defaultSort', () => {
    const data = ref<Record<string, unknown>[]>([
      { name: 'b', age: 2 },
      { name: 'a', age: 1 },
    ])
    const columns = ref<RbTableColumn[]>([
      { prop: 'name', label: '姓名', sortable: true },
      { prop: 'age', label: '年龄', sortable: true },
    ])
    const emit = vi.fn()
    const defaultSort = ref({ prop: 'age', order: 'asc' as const })

    const { sortedData, toggleSort, sortState, clearSort } = useTableSort(
      data,
      columns,
      emit,
      defaultSort,
    )

    expect(sortState.value).toEqual({ prop: 'age', order: 'asc' })
    expect(sortedData.value.map((i) => i.age)).toEqual([1, 2])

    const nameCol = columns.value[0]
    toggleSort(nameCol)
    expect(sortState.value).toEqual({ prop: 'name', order: 'asc' })
    expect(sortedData.value.map((i) => i.name)).toEqual(['a', 'b'])
    expect(emit).toHaveBeenCalledWith('sort-change', { prop: 'name', order: 'asc' })

    toggleSort(nameCol)
    expect(sortState.value).toEqual({ prop: 'name', order: 'desc' })

    toggleSort(nameCol)
    expect(sortState.value).toBeNull()

    clearSort()
    expect(sortState.value).toBeNull()
  })

  it('支持自定义 sortable 函数', () => {
    const data = ref<Record<string, unknown>[]>([
      { name: 'ab', len: 2 },
      { name: 'a', len: 1 },
      { name: 'abc', len: 3 },
    ])
    const columns = ref<RbTableColumn[]>([
      {
        prop: 'name',
        label: '姓名',
        sortable: (a, b) => String(a.name).length - String(b.name).length,
      },
    ])
    const { sortedData, toggleSort } = useTableSort(data, columns, () => undefined)

    toggleSort(columns.value[0])
    expect(sortedData.value.map((i) => i.name)).toEqual(['a', 'ab', 'abc'])
  })
})

describe('useTableSelection', () => {
  it('单选 / 全选 / 清空', () => {
    const data = ref(baseData.slice())
    const columns = ref(baseColumns)
    const rowKey = ref<string | undefined>('id')
    const emit = vi.fn()

    const api = useTableSelection(data, columns, rowKey, emit)

    api.toggleRowSelection(baseData[0])
    expect(api.getSelectionRows()).toHaveLength(1)
    expect(emit).toHaveBeenCalledWith('selection-change', [baseData[0]])

    api.toggleAllSelection()
    expect(api.isAllSelected.value).toBe(true)
    expect(api.getSelectionRows()).toHaveLength(3)

    api.clearSelection()
    expect(api.getSelectionRows()).toHaveLength(0)
  })

  it('selectable 回调可禁用行', () => {
    const data = ref(baseData.slice())
    const columns = ref<RbTableColumn[]>([
      {
        type: 'selection',
        selectable: (row) => row.id !== 2,
      },
    ])
    const rowKey = ref<string | undefined>('id')
    const api = useTableSelection(data, columns, rowKey, () => undefined)

    api.toggleAllSelection()
    expect(api.getSelectionRows().map((row) => row.id)).toEqual([1, 3])
  })
})

describe('rb-table', () => {
  const stubs = {
    RbEmpty: true,
    RbLoading: true,
    'scroll-view': {
      template: '<div class="scroll-view-stub"><slot /></div>',
    },
  }

  it('渲染表头、序号，并触发 row-click / sort-change', async () => {
    const wrapper = mount(RbTable, {
      props: {
        columns: [
          { type: 'index', label: '#' },
          { prop: 'name', label: '姓名', sortable: true },
          { prop: 'age', label: '年龄' },
        ],
        data: baseData,
        rowKey: 'id',
        border: true,
        stripe: true,
      },
      global: { stubs },
    })

    expect(wrapper.find('.rb-table__header').exists()).toBe(true)
    expect(wrapper.findAll('.rb-table__row')).toHaveLength(3)
    expect(wrapper.text()).toContain('张三')

    await wrapper.findAll('.rb-table__th')[1].trigger('click')
    expect(wrapper.emitted('sort-change')?.[0]).toEqual([{ prop: 'name', order: 'asc' }])

    await wrapper.findAll('.rb-table__td')[1].trigger('click')
    expect(wrapper.emitted('row-click')?.[0]?.[0]).toMatchObject({
      index: 0,
      row: expect.objectContaining({ name: '张三' }),
    })
  })

  it('支持勾选与 expose 方法', async () => {
    const wrapper = mount(RbTable, {
      props: {
        columns: baseColumns,
        data: baseData,
        rowKey: 'id',
        highlightCurrentRow: true,
      },
      global: { stubs },
    })

    const thCheck = wrapper.find('.rb-table__th .rb-table__check')
    await thCheck.trigger('click')
    expect(wrapper.emitted('select-all')?.[0]?.[0]).toHaveLength(3)
    expect(wrapper.emitted('selection-change')?.[0]?.[0]).toHaveLength(3)

    const vm = wrapper.vm as unknown as {
      clearSelection: () => void
      getSelectionRows: () => Record<string, unknown>[]
      setCurrentRow: (row: Record<string, unknown> | null) => void
    }

    expect(vm.getSelectionRows()).toHaveLength(3)
    vm.clearSelection()
    await nextTick()
    expect(vm.getSelectionRows()).toHaveLength(0)

    vm.setCurrentRow(baseData[1])
    await nextTick()
    expect(wrapper.emitted('current-change')?.[0]?.[0]).toMatchObject({
      currentRow: baseData[1],
    })
  })

  it('空数据与 loading', async () => {
    const wrapper = mount(RbTable, {
      props: {
        columns: baseColumns,
        data: [],
        loading: true,
        emptyText: '没有记录',
      },
      global: { stubs },
    })

    expect(wrapper.find('.rb-table__empty').exists()).toBe(true)
    expect(wrapper.find('.rb-table__loading').exists()).toBe(true)
  })
})
