<script setup lang="ts">
import BasicDemo from '../examples/date-picker/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>

<template>
<rb-date-picker v-model="value" type="datetime" placeholder="请选择日期时间" />
<\/template>
`
</script>

# DatePicker 日期时间

::: tip
`type` 支持 `date` / `time` / `datetime`，对齐 Element Plus。
:::

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
</script>

<template>
<rb-date-picker v-model="value" type="datetime" placeholder="请选择日期时间" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| type | type | `RbDatePickerType` | 'date' |
| placeholder | placeholder | `string` | '' |
| title | title | `string` | '' |
| disabled | disabled | `boolean` | false |
| clearable | clearable | `boolean` | false |
| format | format | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |
| confirm | - |
| clear | - |
| visible-change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **DatePicker** 测试按钮即可验证。
