<script setup lang="ts">
import BasicDemo from '../examples/safe-bottom/basic.vue'

const basicSource = `<template>
<rb-safe-bottom />
<\/template>
`
</script>

# SafeBottom 底部安全区

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-safe-bottom />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | height | `string | number` | 0 |
| bgColor | bgColor | `string` | 'transparent' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **SafeBottom** 测试按钮即可验证。
