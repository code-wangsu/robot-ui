<script setup lang="ts">
import BasicDemo from '../examples/status-bar/basic.vue'

const basicSource = `<template>
<rb-status-bar />
<\/template>
`
</script>

# StatusBar 状态栏占位

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-status-bar />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| bgColor | bgColor | `string` | 'transparent' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **StatusBar** 测试按钮即可验证。
