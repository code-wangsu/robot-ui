<script setup lang="ts">
import BasicDemo from '../examples/system-keyboard-input/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const value = ref('')
<\/script>

<template>
<rb-system-keyboard-input v-model="value" placeholder="系统键盘输入" />
<\/template>
`
</script>

# SystemKeyboardInput 系统键盘输入

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
<rb-system-keyboard-input v-model="value" placeholder="系统键盘输入" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| placeholder | placeholder | `string` | '' |
| placeholderClass | placeholderClass | `string` | '' |
| maxlength | maxlength | `number | string` | 200 |
| max | max | `number | string` | 200 |
| confirmType | confirmType | `string` | 'search' |
| inputClass | inputClass | `string` | '' |
| inputStyle | inputStyle | `string | Record&lt;string, string | number&gt;` | '' |
| multiline | multiline | `boolean` | false |
| blockLayout | blockLayout | `boolean` | false |
| focus | focus | `boolean` | false |
| focusOnly | focusOnly | `boolean` | false |
| mode | mode | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| focus | - |
| blur | - |
| confirm | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **SystemKeyboardInput** 测试按钮即可验证。
