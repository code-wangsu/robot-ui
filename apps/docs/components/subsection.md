<script setup lang="ts">
import BasicDemo from '../examples/subsection/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const list = ['待处理', '进行中', '已完成']
<\/script>

<template>
<rb-subsection v-model="current" :list="list" />
<\/template>
`
</script>

# Subsection 分段器

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
const list = ['待处理', '进行中', '已完成']
</script>

<template>
<rb-subsection v-model="current" :list="list" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `number` | 0 |
| list | list | `SubsectionItem[] | string[]` | [] |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| bgColor | bgColor | `string` | '' |
| height | height | `string | number` | 64 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Subsection** 测试按钮即可验证。
