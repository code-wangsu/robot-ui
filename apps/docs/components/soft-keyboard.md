<script setup lang="ts">
import BasicDemo from '../examples/soft-keyboard/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="软键盘" type="primary" @click="show = true" />
<rb-soft-keyboard v-model:show="show" />
<\/template>
`
</script>

# SoftKeyboard 软键盘

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
</script>

<template>
<rb-button text="软键盘" type="primary" @click="show = true" />
<rb-soft-keyboard v-model:show="show" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| max | max | `number | string` | 200 |
| mode | mode | `'login' | 'ip' | string` | 'login' |
| enableSymbols | enableSymbols | `boolean` | true |
| enableNumberSymbols | enableNumberSymbols | `boolean` | false |
| enableSpace | enableSpace | `boolean` | true |
| largeCaseIcon | largeCaseIcon | `string` | '' |
| smallCaseIcon | smallCaseIcon | `string` | '' |
| labels | labels | `{` | () => … |
| space | space | `string` | — |
| clear | clear | `string` | — |
| confirm | confirm | `string` | — |
| back | back | `string` | — |
| symbol | symbol | `string` | — |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| getHeight | - |
| input | - |
| confirm | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **SoftKeyboard** 测试按钮即可验证。
