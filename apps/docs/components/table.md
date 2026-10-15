<script setup lang="ts">
import BasicDemo from '../examples/table/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { type: 'selection', fixed: 'left' },
  { type: 'expand', fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'post', label: '岗位', width: 140 },
  { prop: 'status', label: '状态', width: 100 },
]
const childColumns = [
  { prop: 'task', label: '子任务', width: 160 },
  { prop: 'progress', label: '进度', width: 100 },
]
const list = ref([
  {
    id: 1,
    name: '刘小北',
    post: '拣货',
    status: '在岗',
    children: [
      { task: 'A区拣货', progress: '80%' },
      { task: '复核打包', progress: '40%' },
    ],
  },
])
<\/script>

<template>
  <rb-table
    :columns="columns"
    :data="list"
    row-key="id"
    border
    :height="420"
  >
    <template #expand="{ row }">
      <rb-table
        v-if="row.children?.length"
        :columns="childColumns"
        :data="row.children"
        size="small"
      />
      <rb-empty v-else text="暂无子任务" compact />
    </template>
  </rb-table>
<\/template>
`
</script>

# Table 表格

支持前置勾选、行展开嵌套（子表格或其它组件）。

## 勾选 + 展开嵌套

列配置 `type: 'selection'` 前置勾选；`type: 'expand'` + `#expand` 插槽可嵌套子表格或任意组件。

<DemoBlock title="勾选与嵌套" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { type: 'selection', fixed: 'left' },
  { type: 'expand', fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'post', label: '岗位', width: 140 },
  { prop: 'status', label: '状态', width: 100 },
]
const childColumns = [
  { prop: 'task', label: '子任务', width: 160 },
  { prop: 'progress', label: '进度', width: 100 },
]
const list = ref([
  {
    id: 1,
    name: '刘小北',
    post: '拣货',
    status: '在岗',
    children: [
      { task: 'A区拣货', progress: '80%' },
      { task: '复核打包', progress: '40%' },
    ],
  },
])
</script>

<template>
  <rb-table
    :columns="columns"
    :data="list"
    row-key="id"
    border
    :height="420"
  >
    <template #expand="{ row }">
      <rb-table
        v-if="row.children?.length"
        :columns="childColumns"
        :data="row.children"
        size="small"
      />
      <rb-empty v-else text="暂无子任务" compact />
    </template>
  </rb-table>
</template>
```

  </template>
</DemoBlock>

## Column

| 字段 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | `selection` / `expand` / `index` / 普通 | `RbTableColumnType` | — |
| prop | 字段名 | `string` | — |
| label | 表头文案 | `string` | — |
| width / minWidth | 列宽 | `string \| number` | — |
| fixed | 固定列 | `'left' \| 'right' \| boolean` | — |
| sortable | 排序 | `boolean \| Function` | — |
| selectable | selection 列是否可选 | `(row, index) => boolean` | — |
| formatter / ellipsis / align / index | 其它列能力 | — | — |

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| columns | 列配置 | `RbTableColumn[]` | — |
| data | 行数据 | `Record<string, unknown>[]` | — |
| rowKey | 行主键（勾选/展开建议必传） | `RbTableRowKey` | — |
| expandRowKeys | 受控展开行 keys | `Array<string \| number>` | — |
| defaultExpandAll | 默认展开全部 | `boolean` | `false` |
| stripe / border / height / maxHeight | 样式与高度 | — | — |
| highlightCurrentRow | 高亮当前行 | `boolean` | `false` |
| loading | 加载中 | `boolean` | `false` |
| size | `default` / `small` | `RbTableSize` | `'default'` |
| emptyText | 空文案 | `string` | `'暂无数据'` |

## Slots

| 插槽 | 说明 |
|------|------|
| `expand` | 展开行内容，参数 `{ row, index }`，可嵌套子表格或其它组件 |
| `cell-${prop}` | 自定义单元格 |
| `empty` | 空状态 |

## Events

| 事件 | 说明 |
|------|------|
| selection-change | 勾选变化 |
| select / select-all | 单行 / 全选 |
| expand-change | 展开变化 `{ row, expanded, expandedRows }` |
| sort-change / row-click / current-change | 其它 |

## Methods

| 方法 | 说明 |
|------|------|
| clearSelection / toggleRowSelection / toggleAllSelection / getSelectionRows | 勾选 |
| toggleRowExpansion | 展开/收起 |
| setCurrentRow / clearSort | 其它 |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Table** 测试按钮即可验证。
