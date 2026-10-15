<script setup lang="ts">
import BasicDemo from '../examples/collapse/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
<\/script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>
  <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>
</rb-collapse>
<\/template>
`
</script>

# Collapse 折叠面板

可折叠的内容区域，支持同时展开多项或手风琴模式。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(['1'])
</script>

<template>
<rb-collapse v-model="active">
  <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>
  <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>
</rb-collapse>
</template>
```

  </template>
</DemoBlock>


## 手风琴

同时只能展开一个面板，`v-model` 为单个 `name`：

```vue
<script setup>
import { ref } from 'vue'
const active = ref('1')
</script>

<template>
  <rb-collapse v-model="active" accordion>
    <rb-collapse-item name="1" title="面板一">内容 A</rb-collapse-item>
    <rb-collapse-item name="2" title="面板二">内容 B</rb-collapse-item>
  </rb-collapse>
</template>
```

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue / v-model | 当前展开项；手风琴为单个 name，否则为 name 数组 | `string \| number \| Array` | `[]` |
| accordion | 是否手风琴模式 | `boolean` | `false` |
| border | 是否显示外边框 | `boolean` | `true` |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 | 回调参数 |
|--------|------|----------|
| update:modelValue | 展开项变化时触发 | `(value)` |
| change | 展开项变化时触发 | `(value)` |

## Slots

| 插槽名 | 说明 |
|--------|------|
| default | 折叠项 `rb-collapse-item` |

## 在 Playground 中试用

打开 `apps/playground`，进入 **数据展示** 页，点击 **Collapse 折叠面板** 区域即可验证。
