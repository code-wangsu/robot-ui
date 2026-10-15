<script setup lang="ts">
import BasicDemo from '../examples/grid/basic.vue'

const basicSource = `<template>
  <rb-grid :col="4" :border="true">
    <rb-grid-item text="宫格1" />
    <rb-grid-item text="宫格2" />
    <rb-grid-item text="宫格3" />
    <rb-grid-item text="宫格4" />
  </rb-grid>
<\/template>
`
</script>

# Grid 宫格

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
  <rb-grid :col="4" :border="true">
    <rb-grid-item text="宫格1" />
    <rb-grid-item text="宫格2" />
    <rb-grid-item text="宫格3" />
    <rb-grid-item text="宫格4" />
  </rb-grid>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| col | col | `number` | 3 |
| border | border | `boolean` | false |
| gap | gap | `string | number` | 0 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Grid** 测试按钮即可验证。
