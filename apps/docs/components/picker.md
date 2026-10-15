<script setup lang="ts">
import BasicDemo from '../examples/picker/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const columns = [
  [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ],
]
<\/script>

<template>
  <rb-button text="打开选择器" type="primary" @click="show = true" />
  <rb-picker v-model:show="show" :columns="columns" />
<\/template>
`
</script>

# Picker 选择器

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const columns = [
  [
    { label: '选项一', value: '1' },
    { label: '选项二', value: '2' },
    { label: '选项三', value: '3' },
  ],
]
</script>

<template>
  <rb-button text="打开选择器" type="primary" @click="show = true" />
  <rb-picker v-model:show="show" :columns="columns" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| columns | columns | `PickerColumn[][]` | [] |
| title | title | `string` | '请选择' |
| round | round | `string | number` | 16 |
| duration | duration | `number` | 300 |
| closeOnClickOverlay | closeOnClickOverlay | `boolean` | true |
| safeAreaInsetBottom | safeAreaInsetBottom | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件 | 说明 | 回调参数 |
|------|------|----------|
| confirm | confirm | — |
| cancel | cancel | — |
| change | change | — |
| close | close | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Picker** 测试按钮即可验证。
