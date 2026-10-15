<script setup lang="ts">
import BasicDemo from '../examples/button/basic.vue'

const basicSource = `<template>
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <rb-button type="primary" text="主要按钮" />
  <rb-button type="success" plain text="朴素按钮" />
  <rb-button size="small" text="小按钮" />
</div>
<\/template>
`
</script>

# Button 按钮

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
  <rb-button type="primary" text="主要按钮" />
  <rb-button type="success" plain text="朴素按钮" />
  <rb-button size="small" text="小按钮" />
</div>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| type | type | `RbType` | 'primary' |
| size | 尺寸：large / default / small / mini（medium 等同 default） | `RbButtonSize` | 'default' |
| plain | plain | `boolean` | false |
| round | round | `boolean` | false |
| block | block | `boolean` | false |
| disabled | disabled | `boolean` | false |
| loading | loading | `boolean` | false |
| text | text | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Button** 测试按钮即可验证。
