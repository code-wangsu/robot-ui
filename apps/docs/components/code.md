<script setup lang="ts">
import BasicDemo from '../examples/code/basic.vue'

const basicSource = `<script setup lang="ts">
function onChange() {}
<\/script>

<template>
<rb-code :seconds="60" @change="onChange" />
<\/template>
`
</script>

# Code 验证码按钮

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
function onChange() {}
</script>

<template>
<rb-code :seconds="60" @change="onChange" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| seconds | seconds | `number` | 60 |
| startText | startText | `string` | '获取验证码' |
| changeText | changeText | `string` | 'X秒重新获取' |
| endText | endText | `string` | '重新获取' |
| disabled | disabled | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| start | - |
| end | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Code** 测试按钮即可验证。
