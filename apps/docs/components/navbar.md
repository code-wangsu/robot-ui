<script setup lang="ts">
import BasicDemo from '../examples/navbar/basic.vue'

const basicSource = `<template>
<rb-navbar title="标题" left-text="返回" :fixed="false" :safe-area-inset-top="false" />
<\/template>
`
</script>

# Navbar 导航栏

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-navbar title="标题" left-text="返回" :fixed="false" :safe-area-inset-top="false" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | title | `string` | '' |
| leftText | leftText | `string` | '' |
| rightText | rightText | `string` | '' |
| fixed | fixed | `boolean` | false |
| placeholder | placeholder | `boolean` | false |
| safeAreaInsetTop | safeAreaInsetTop | `boolean` | true |
| height | height | `string | number` | 88 |
| bgColor | bgColor | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click-left | - |
| click-right | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Navbar** 测试按钮即可验证。
