<script setup lang="ts">
import BasicDemo from '../examples/tabs/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const tabs = [{ name: '标签一' }, { name: '标签二' }, { name: '标签三' }]
<\/script>

<template>
<rb-tabs v-model="current" :list="tabs" />
<\/template>
`
</script>

# Tabs 标签页

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const tabs = [{ name: '标签一' }, { name: '标签二' }, { name: '标签三' }]
</script>

<template>
<rb-tabs v-model="current" :list="tabs" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string | number` | 0 |
| list | list | `TabItem[]` | [] |
| scrollable | scrollable | `boolean` | false |
| lineWidth | lineWidth | `string | number` | 40 |
| lineHeight | lineHeight | `string | number` | 6 |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Tabs** 测试按钮即可验证。
