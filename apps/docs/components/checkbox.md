<script setup lang="ts">
import BasicDemo from '../examples/checkbox/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
<\/script>

<template>
<rb-checkbox v-model="checked" label="同意协议" />
<\/template>
`
</script>

# Checkbox 复选框

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
<rb-checkbox v-model="checked" label="同意协议" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `boolean` | false |
| name | name | `string | number` | '' |
| label | label | `string` | '' |
| disabled | disabled | `boolean` | false |
| shape | shape | `'square' | 'circle'` | 'square' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Checkbox** 测试按钮即可验证。
