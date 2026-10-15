<script setup lang="ts">
import BasicDemo from '../examples/keyboard/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const value = ref('')
<\/script>

<template>
<rb-button text="打开键盘" type="primary" @click="show = true" />
<view style="margin-top:12px">{{ value || '待输入' }}</view>
<rb-keyboard v-model:show="show" @change="(v) => (value = value + v)" />
<\/template>
`
</script>

# Keyboard 数字键盘

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const value = ref('')
</script>

<template>
<rb-button text="打开键盘" type="primary" @click="show = true" />
<view style="margin-top:12px">{{ value || '待输入' }}</view>
<rb-keyboard v-model:show="show" @change="(v) => (value = value + v)" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| mode | mode | `'number' | 'card'` | 'number' |
| dotDisabled | dotDisabled | `boolean` | false |
| random | random | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:show | - |
| change | - |
| backspace | - |
| confirm | - |
| cancel | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Keyboard** 测试按钮即可验证。
