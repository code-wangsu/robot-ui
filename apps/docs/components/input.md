<script setup lang="ts">
import BasicDemo from '../examples/input/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>

<template>
<rb-input v-model="value" placeholder="请输入" clearable />
<\/template>
`
</script>

# Input 输入框

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
<rb-input v-model="value" placeholder="请输入" clearable />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string | number` | '' |
| type | type | `string` | 'text' |
| placeholder | placeholder | `string` | '请输入' |
| disabled | disabled | `boolean` | false |
| readonly | readonly | `boolean` | false |
| clearable | clearable | `boolean` | false |
| maxlength | maxlength | `number` | -1 |
| border | border | `'surround' | 'bottom' | 'none'` | 'surround' |
| height | height | `string | number` | 80 |
| fontSize | fontSize | `string | number` | 28 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| input | - |
| focus | - |
| blur | - |
| clear | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Input** 测试按钮即可验证。
