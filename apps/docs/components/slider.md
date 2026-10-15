<script setup lang="ts">
import BasicDemo from '../examples/slider/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
<\/script>

<template>
  <div style="padding: 8px 4px">
    <rb-slider v-model="value" :min="0" :max="100" active-color="#3c9cff" />
    <div style="margin-top: 8px; color: #909399; font-size: 13px">当前值：{{ value }}</div>
  </div>
<\/template>
`
</script>

# Slider 滑块

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref(40)
</script>

<template>
  <div style="padding: 8px 4px">
    <rb-slider v-model="value" :min="0" :max="100" active-color="#3c9cff" />
    <div style="margin-top: 8px; color: #909399; font-size: 13px">当前值：{{ value }}</div>
  </div>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `number` | 0 |
| min | min | `number` | 0 |
| max | max | `number` | 100 |
| step | step | `number` | 1 |
| disabled | disabled | `boolean` | false |
| blockSize | blockSize | `string | number` | 28 |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |
| changing | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Slider** 测试按钮即可验证。
