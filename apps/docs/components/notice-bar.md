<script setup lang="ts">
import BasicDemo from '../examples/notice-bar/basic.vue'

const basicSource = `<template>
<rb-notice-bar text="这是一条通知" />
<\/template>
`
</script>

# NoticeBar 通知栏

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-notice-bar text="这是一条通知" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '' |
| color | color | `string` | '' |
| background | background | `string` | '' |
| speed | speed | `number` | 60 |
| scrollable | scrollable | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **NoticeBar** 测试按钮即可验证。
