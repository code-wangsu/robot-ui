<script setup lang="ts">
import BasicDemo from '../examples/number-box/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
<\/script>

<template>
<rb-number-box v-model="count" :min="1" :max="99" />
<\/template>
`
</script>

# NumberBox 步进器

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const count = ref(1)
</script>

<template>
<rb-number-box v-model="count" :min="1" :max="99" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `number` | 1 |
| min | min | `number` | 1 |
| max | max | `number` | 999 |
| step | step | `number` | 1 |
| disabled | disabled | `boolean` | false |
| disabledInput | disabledInput | `boolean` | false |
| buttonSize | buttonSize | `string | number` | 56 |
| inputWidth | inputWidth | `string | number` | 80 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |
| overlimit | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **NumberBox** 测试按钮即可验证。
