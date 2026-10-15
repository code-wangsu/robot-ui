<script setup lang="ts">
import BasicDemo from '../examples/count-down/basic.vue'

const basicSource = `<template>
<rb-count-down :time="3600000" />
<\/template>
`
</script>

# CountDown 倒计时

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-count-down :time="3600000" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| time | time | `number` | 0 |
| format | format | `string` | 'HH:mm:ss' |
| autoStart | autoStart | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| finish | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **CountDown** 测试按钮即可验证。
