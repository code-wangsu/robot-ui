<script setup lang="ts">
import BasicDemo from '../examples/parse/basic.vue'

const basicSource = `<script setup lang="ts">
const html = '<p>Hello <strong>robot-ui</strong></p>'
<\/script>

<template>
<rb-parse :content="html" />
<\/template>
`
</script>

# Parse 富文本

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const html = '<p>Hello <strong>robot-ui</strong></p>'
</script>

<template>
<rb-parse :content="html" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | content | `string` | '' |
| sanitize | 是否净化 HTML（默认开启） | `boolean` | true |
| selectable | selectable | `boolean` | false |
| previewImg | 点击图片时预览 | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| linkTap | - |
| imgTap | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Parse** 测试按钮即可验证。
