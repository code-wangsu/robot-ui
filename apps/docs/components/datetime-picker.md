<script setup lang="ts">
import BasicDemo from '../examples/datetime-picker/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="选择时间" type="primary" @click="show = true" />
<rb-datetime-picker v-model:show="show" mode="datetime" />
<\/template>
`
</script>

# DatetimePicker 时间滚轮

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="选择时间" type="primary" @click="show = true" />
<rb-datetime-picker v-model:show="show" mode="datetime" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| modelValue | modelValue | `string` | '' |
| mode | mode | `'date' | 'time' | 'datetime'` | 'datetime' |
| title | title | `string` | '选择时间' |
| minDate | minDate | `string` | '1970-01-01' |
| maxDate | maxDate | `string` | '2099-12-31' |
| cancelText | cancelText | `string` | '取消' |
| confirmText | confirmText | `string` | '确认选择' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:show | - |
| update:modelValue | - |
| confirm | - |
| cancel | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **DatetimePicker** 测试按钮即可验证。
