<script setup lang="ts">
import BasicDemo from '../examples/color/basic.vue'

const basicSource = `<template>
<div style="display:flex;gap:12px;flex-wrap:wrap">
  <rb-color color="#3c9cff" label="Primary" />
  <rb-color color="#5ac725" label="Success" />
  <rb-color color="#f9ae3d" label="Warning" />
</div>
<\/template>
`
</script>

# Color 色块

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<div style="display:flex;gap:12px;flex-wrap:wrap">
  <rb-color color="#3c9cff" label="Primary" />
  <rb-color color="#5ac725" label="Success" />
  <rb-color color="#f9ae3d" label="Warning" />
</div>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| color | 色值，如 #3c9cff | `string` | '#3c9cff' |
| label | 展示名称 | `string` | '' |
| showValue | 是否显示色值文字 | `boolean` | true |
| copyable | 点击复制色值 | `boolean` | true |
| size | 色块尺寸 | `'small' | 'default' | 'large'` | 'default' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| copy | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Color** 测试按钮即可验证。
