<script setup lang="ts">
import BasicDemo from '../examples/avatar/basic.vue'

const basicSource = `<template>
<rb-avatar text="R" size="large" />
<\/template>
`
</script>

# Avatar 头像

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-avatar text="R" size="large" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| src | src | `string` | '' |
| text | text | `string` | '' |
| size | size | `string | number` | 80 |
| shape | shape | `'circle' | 'square'` | 'circle' |
| bgColor | bgColor | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Avatar** 测试按钮即可验证。
