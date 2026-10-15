<script setup lang="ts">
import BasicDemo from '../examples/cell/basic.vue'

const basicSource = `<template>
<rb-cell-group>
  <rb-cell title="标题" value="内容" is-link />
  <rb-cell title="说明" label="副标题" />
</rb-cell-group>
<\/template>
`
</script>

# Cell 单元格

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-cell-group>
  <rb-cell title="标题" value="内容" is-link />
  <rb-cell title="说明" label="副标题" />
</rb-cell-group>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | title | `string` | '' |
| label | label | `string` | '' |
| value | value | `string` | '' |
| isLink | isLink | `boolean` | false |
| clickable | clickable | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Cell** 测试按钮即可验证。
