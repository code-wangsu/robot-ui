<script setup lang="ts">
import BasicDemo from '../examples/image/basic.vue'

const basicSource = `<script setup lang="ts">
const list = [
  'https://picsum.photos/seed/robot-ui-1/320/240',
  'https://picsum.photos/seed/robot-ui-2/320/240',
]
<\/script>

<template>
  <rb-image
    :src="list[0]"
    :preview-src-list="list"
    fit="cover"
    width="200"
    height="140"
    radius="8"
  />
<\/template>
`
</script>

# Image 图片

::: tip
配置 `preview-src-list` 后点击预览，支持左右切换。
:::

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const list = [
  'https://picsum.photos/seed/robot-ui-1/320/240',
  'https://picsum.photos/seed/robot-ui-2/320/240',
]
</script>

<template>
  <rb-image
    :src="list[0]"
    :preview-src-list="list"
    fit="cover"
    width="200"
    height="140"
    radius="8"
  />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | src | `string` | '' |
| mode | uni-app 原生 mode，优先于 fit | `string` | '' |
| fit | 对齐 Element Plus object-fit | `RbImageFit` | 'cover' |
| width | width | `string | number` | '100%' |
| height | height | `string | number` | 'auto' |
| radius | radius | `string | number` | 0 |
| lazyLoad | lazyLoad | `boolean` | false |
| showLoading | showLoading | `boolean` | true |
| showError | showError | `boolean` | true |
| previewSrcList | 预览图列表，对齐 Element Plus preview-src-list 有值时点击可预览；为空则不预览 | `string[]` | [] |
| initialIndex | 预览初始索引，对齐 initial-index | `number` | 0 |
| preview | 是否允许预览（需配合 previewSrcList） | `boolean` | true |
| hideOnClickModal | 点击遮罩关闭预览，对齐 hide-on-click-modal | `boolean` | true |
| nativePreview | 使用系统 previewImage（无自定义左右按钮） 默认 false，使用组件内预览器（含左右切换） | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| load | - |
| error | - |
| show | - |
| close | - |
| switch | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Image** 测试按钮即可验证。
