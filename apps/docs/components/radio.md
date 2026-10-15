<script setup lang="ts">
import BasicDemo from '../examples/radio/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('1')
<\/script>

<template>
<rb-radio v-model="value" name="1" label="选项一" />
<rb-radio v-model="value" name="2" label="选项二" />
<\/template>
`
</script>

# Radio 单选框

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
<rb-radio v-model="value" name="1" label="选项一" />
<rb-radio v-model="value" name="2" label="选项二" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string | number | boolean` | '' |
| name | name | `string | number | boolean` | '' |
| label | label | `string` | '' |
| disabled | disabled | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Radio** 测试按钮即可验证。
