<script setup lang="ts">
import BasicDemo from '../examples/layout/basic.vue'

const basicSource = `<template>
<rb-layout direction="vertical" height="200">
  <template #header><view style="padding:8px;background:#ecf5ff">Header</view><\/template>
  <view style="padding:16px">Main</view>
  <template #footer><view style="padding:8px;background:#f0f9eb">Footer</view><\/template>
</rb-layout>
<\/template>
`
</script>

# Layout 布局容器

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-layout direction="vertical" height="200">
  <template #header><view style="padding:8px;background:#ecf5ff">Header</view></template>
  <view style="padding:16px">Main</view>
  <template #footer><view style="padding:8px;background:#f0f9eb">Footer</view></template>
</rb-layout>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | direction | `'vertical' | 'horizontal'` | 'vertical' |
| height | 整页高度，默认 100vh；传数字按 rpx | `string | number` | '100%' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Layout** 测试按钮即可验证。
