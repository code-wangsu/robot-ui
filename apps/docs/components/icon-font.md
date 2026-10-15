<script setup lang="ts">
import BasicDemo from '../examples/icon-font/basic.vue'

const basicSource = `<template>
<rb-icon-font name="fanhuishouye" :size="28" />
<\/template>
`
</script>

# IconFont 字体图标

> 推荐直接使用 [Icon 图标](/components/icon)。`rb-icon-font` 已作为兼容层，内部转发到 `rb-icon`。

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-icon-font name="fanhuishouye" :size="28" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | iconfont font_class | `string` | — |
| size | 尺寸 | `string \| number` | `32` |
| color | 颜色 | `string` | `''` |
