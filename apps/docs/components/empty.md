<script setup lang="ts">
import BasicDemo from '../examples/empty/basic.vue'
import ImageDemo from '../examples/empty/image.vue'

const basicSource = `<template>
  <rb-empty text="暂无数据" />
</template>
`

const imageSource = `<template>
  <rb-empty
    text="暂无内容"
    description="可以稍后再试，或换个筛选条件"
    compact
  />
</template>
`
</script>

# Empty 空状态

默认使用内置插画（`icon_nodata`）。传 `image=""` 可退回字符图标；也可用 `#icon` / `#extra` 插槽自定义。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
  <rb-empty text="暂无数据" />
</template>
```

  </template>
</DemoBlock>

## 紧凑 + 描述

<DemoBlock title="紧凑空态" :raw-source="imageSource">
  <ImageDemo />
  <template #code>

```vue
<template>
  <rb-empty
    text="暂无内容"
    description="可以稍后再试，或换个筛选条件"
    compact
  />
</template>
```

  </template>
</DemoBlock>

## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | 主文案 | `string` | `'暂无数据'` |
| description | 副文案 | `string` | `''` |
| image | 插画地址；默认内置图，传 `''` 用字符图标 | `string` | 内置 `icon_nodata` |
| icon | 字符图标（`image=""` 时） | `string` | `'∅'` |
| compact | 紧凑样式 | `boolean` | `false` |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Slots

| 插槽 | 说明 |
|------|------|
| default | 主文案 |
| icon | 自定义插画/图标 |
| extra | 底部额外操作区 |

## 迁移说明

| 旧组件 | 新写法 |
|--------|--------|
| `rb-empty-state` | `<rb-empty text="..." description="..." compact />` |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Empty** 测试按钮即可验证。
