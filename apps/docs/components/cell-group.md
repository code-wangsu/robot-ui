<script setup lang="ts">
import BasicDemo from '../examples/cell-group/basic.vue'

const basicSource = `<template>
<rb-cell-group title="分组">
  <rb-cell title="单元格一" />
  <rb-cell title="单元格二" />
</rb-cell-group>
<\/template>
`
</script>

# CellGroup 单元格组

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-cell-group title="分组">
  <rb-cell title="单元格一" />
  <rb-cell title="单元格二" />
</rb-cell-group>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | title | `string` | '' |
| border | border | `boolean` | true |
| inset | inset | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **CellGroup** 测试按钮即可验证。
