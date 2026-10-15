<script setup lang="ts">
import BasicDemo from '../examples/pagination/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
<\/script>

<template>
<rb-pagination v-model:current-page="page" :total="100" background />
<\/template>
`
</script>

# Pagination 分页

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const page = ref(1)
</script>

<template>
<rb-pagination v-model:current-page="page" :total="100" background />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| total | 总条目数 | `number` | 0 |
| pageCount | 总页数（若传则优先于 total/pageSize 计算） | `number` | 0 |
| currentPage | 当前页，可用 v-model:current-page | `number` | 1 |
| pageSize | 每页条数，可用 v-model:page-size | `number` | 10 |
| pageSizes | 每页条数选项 | `number[]` | [10, 20, 50, 100] |
| pagerCount | 页码按钮数量，奇数，默认 5（移动端） | `number` | 5 |
| layout | 布局，对齐 Element Plus 默认：prev, pager, next | `string` | 'total, prev, pager, next' |
| background | 是否带背景色页码（EP background） | `boolean` | true |
| size | 尺寸 | `RbPaginationSize` | 'default' |
| disabled | disabled | `boolean` | false |
| hideOnSinglePage | 只有一页时隐藏 | `boolean` | false |
| prevText | prevText | `string` | '上一页' |
| nextText | nextText | `string` | '下一页' |
| totalText | 总数文案，可用 {total} 占位 | `string` | '共 {total} 条' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:currentPage | - |
| update:pageSize | - |
| current-change | - |
| size-change | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Pagination** 测试按钮即可验证。
