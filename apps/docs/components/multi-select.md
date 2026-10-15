<script setup lang="ts">
import BasicDemo from '../examples/multi-select/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['电力中断', '现场操作异常', '其他异常'])
const options = [
  '设备故障',
  '系统宕机',
  '网络中断',
  '电力中断',
  '现场操作异常',
  '其他异常',
]
<\/script>

<template>
<rb-multi-select
  v-model="value"
  title="选择异常类型"
  placeholder="请选择异常类型"
  :options="options"
  :max-collapse-count="2"
/>
<\/template>
`
</script>

# MultiSelect 多选

只读输入框 + 居中多选弹窗。选择后回填；超出折叠为 `+N`；悬停 / 长按显示全部 tooltip。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['电力中断', '现场操作异常', '其他异常'])
const options = [
  '设备故障',
  '系统宕机',
  '网络中断',
  '电力中断',
  '现场操作异常',
  '其他异常',
]
</script>

<template>
<rb-multi-select
  v-model="value"
  title="选择异常类型"
  placeholder="请选择异常类型"
  :options="options"
  :max-collapse-count="2"
/>
</template>
```

  </template>
</DemoBlock>


## 回填与折叠

- 输入框不可编辑，点击打开弹窗
- `max-collapse-count` 控制最多展示几个文案，超出显示 `+N`
- 鼠标悬停（H5）或长按（App）展示全部已选项 tooltip
- 支持一键清空（`clearable`），清空按钮外圈圆形，点击不触发弹窗

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 选中值 | `Array` | `[]` |
| show / v-model:show | 弹层显隐（可选） | `boolean` | — |
| title | 弹窗标题 | `string` | `请选择` |
| placeholder | 输入框占位 | `string` | `请选择` |
| options | 选项 | `Array` | `[]` |
| maxCollapseCount | 最多展示项数，超出 +N | `number` | `2` |
| filterable | 是否搜索 | `boolean` | `true` |
| columns | 弹窗列数 | `number` | `2` |
| clearable | 是否可清空 | `boolean` | `true` |
| disabled | 禁用 | `boolean` | `false` |
| required | 确认时至少选一项 | `boolean` | `false` |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | 确认后回填 |
| confirm / cancel / clear | 确认、取消、清空 |
| visible-change | 弹层显隐变化 |

## 在 Playground 中试用

打开 `apps/playground` → **表单组件** → **异常类型（多选）**。
