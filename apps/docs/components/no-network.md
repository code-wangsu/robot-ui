<script setup lang="ts">
import BasicDemo from '../examples/no-network/basic.vue'

const basicSource = `<template>
<rb-no-network />
<\/template>
`
</script>

# NoNetwork 无网络

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-no-network />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '网络连接失败' |
| buttonText | buttonText | `string` | '重试' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| retry | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **NoNetwork** 测试按钮即可验证。
