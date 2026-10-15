<script setup lang="ts">
import BasicDemo from '../examples/textarea/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>

<template>
<rb-textarea v-model="value" placeholder="请输入" />
<\/template>
`
</script>

# Textarea 文本域

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
<rb-textarea v-model="value" placeholder="请输入" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| placeholder | placeholder | `string` | '请输入' |
| disabled | disabled | `boolean` | false |
| maxlength | maxlength | `number` | -1 |
| height | height | `string | number` | 160 |
| autoHeight | autoHeight | `boolean` | false |
| count | count | `boolean` | false |
| border | border | `'surround' | 'bottom' | 'none'` | 'surround' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| input | - |
| focus | - |
| blur | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Textarea** 测试按钮即可验证。
