<script setup lang="ts">
import BasicDemo from '../examples/index-anchor/basic.vue'

const basicSource = `<template>
<rb-index-anchor index="A" />
<\/template>
`
</script>

# IndexAnchor 索引锚点

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-index-anchor index="A" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| index | index | `string` | '' |
| text | text | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **IndexAnchor** 测试按钮即可验证。
