<script setup lang="ts">
import BasicDemo from '../examples/virtual-list/basic.vue'

const basicSource = `<script setup lang="ts">
const list = Array.from({ length: 50 }, (_, i) => ({ id: i, text: '行 ' + (i + 1) }))
<\/script>

<template>
<rb-virtual-list :list="list" :item-height="44" height="200">
  <template #default="{ item }">
    <view style="padding:10px 12px;border-bottom:1px solid #f0f0f0">{{ item.text }}</view>
  <\/template>
</rb-virtual-list>
<\/template>
`
</script>

# VirtualList 虚拟列表

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const list = Array.from({ length: 50 }, (_, i) => ({ id: i, text: '行 ' + (i + 1) }))
</script>

<template>
<rb-virtual-list :list="list" :item-height="44" height="200">
  <template #default="{ item }">
    <view style="padding:10px 12px;border-bottom:1px solid #f0f0f0">{{ item.text }}</view>
  </template>
</rb-virtual-list>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | list | `unknown[]` | — |
| itemHeight | 行高，单位 rpx | `number` | — |
| height | 容器高度，数字默认 rpx | `string | number` | '100%' |
| buffer | buffer | `number` | 5 |
| keyField | keyField | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| scroll | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **VirtualList** 测试按钮即可验证。
