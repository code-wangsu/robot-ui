<script setup lang="ts">
import BasicDemo from '../examples/code-input/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const code = ref('')
<\/script>

<template>
<rb-code-input v-model="code" :maxlength="6" />
<\/template>
`
</script>

# CodeInput 验证码输入

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const code = ref('')
</script>

<template>
<rb-code-input v-model="code" :maxlength="6" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| maxlength | maxlength | `number` | 6 |
| dot | dot | `boolean` | false |
| mode | mode | `'box' | 'line'` | 'box' |
| space | space | `string | number` | 16 |
| fontSize | fontSize | `string | number` | 36 |
| disabled | disabled | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| finish | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **CodeInput** 测试按钮即可验证。
