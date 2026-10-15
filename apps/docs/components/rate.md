<script setup lang="ts">
import BasicDemo from '../examples/rate/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
<\/script>

<template>
<rb-rate v-model="value" />
<\/template>
`
</script>

# Rate 评分

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(3)
</script>

<template>
<rb-rate v-model="value" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `number` | 0 |
| count | count | `number` | 5 |
| disabled | disabled | `boolean` | false |
| readonly | readonly | `boolean` | false |
| size | size | `string | number` | 36 |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| allowHalf | allowHalf | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Rate** 测试按钮即可验证。
