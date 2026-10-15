<script setup lang="ts">
import BasicDemo from '../examples/radio-group/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
<\/script>

<template>
<rb-radio-group v-model="value">
  <rb-radio name="1" label="A" />
  <rb-radio name="2" label="B" />
</rb-radio-group>
<\/template>
`
</script>

# RadioGroup 单选组

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
</script>

<template>
<rb-radio-group v-model="value">
  <rb-radio name="1" label="A" />
  <rb-radio name="2" label="B" />
</rb-radio-group>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string | number | boolean` | '' |
| disabled | disabled | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **RadioGroup** 测试按钮即可验证。
