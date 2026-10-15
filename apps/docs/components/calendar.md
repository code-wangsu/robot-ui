<script setup lang="ts">
import BasicDemo from '../examples/calendar/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const date = ref('')
<\/script>

<template>
<rb-button text="打开日历" type="primary" @click="show = true" />
<view style="margin-top:8px">{{ date || '未选择' }}</view>
<rb-calendar v-model:show="show" @confirm="(v) => { date = String(v); show = false }" />
<\/template>
`
</script>

# Calendar 日历

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const date = ref('')
</script>

<template>
<rb-button text="打开日历" type="primary" @click="show = true" />
<view style="margin-top:8px">{{ date || '未选择' }}</view>
<rb-calendar v-model:show="show" @confirm="(v) => { date = String(v); show = false }" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| minDate | minDate | `string` | '' |
| maxDate | maxDate | `string` | '' |
| showConfirm | showConfirm | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |
| confirm | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Calendar** 测试按钮即可验证。
