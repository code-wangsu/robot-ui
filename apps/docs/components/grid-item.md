<script setup lang="ts">
import BasicDemo from '../examples/grid-item/basic.vue'

const basicSource = `<template>
<rb-grid :col="3">
  <rb-grid-item text="项 A" />
  <rb-grid-item text="项 B" />
  <rb-grid-item text="项 C" />
</rb-grid>
<\/template>
`
</script>

# GridItem 宫格项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-grid :col="3">
  <rb-grid-item text="项 A" />
  <rb-grid-item text="项 B" />
  <rb-grid-item text="项 C" />
</rb-grid>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | span | `number` | 1 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **GridItem** 测试按钮即可验证。
