<script setup lang="ts">
import BasicDemo from '../examples/datetime-panel/basic.vue'

const basicSource = `<script setup lang="ts">
function onConfirm() {}
<\/script>

<template>
<rb-datetime-panel show-time @confirm="onConfirm" />
<\/template>
`
</script>

# DatetimePanel 日期时间面板

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
function onConfirm() {}
</script>

<template>
<rb-datetime-panel show-time @confirm="onConfirm" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| title | title | `string` | '选择日期和时间' |
| showTime | 是否显示时间列；false 时仅日期 | `boolean` | true |
| cancelText | cancelText | `string` | '取消' |
| confirmText | confirmText | `string` | '确认选择' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| confirm | - |
| cancel | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **DatetimePanel** 测试按钮即可验证。
