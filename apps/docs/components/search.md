<script setup lang="ts">
import BasicDemo from '../examples/search/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
<\/script>

<template>
<rb-search v-model="keyword" placeholder="搜索" />
<\/template>
`
</script>

# Search 搜索

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const keyword = ref('')
</script>

<template>
<rb-search v-model="keyword" placeholder="搜索" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string` | '' |
| placeholder | placeholder | `string` | '请输入搜索关键词' |
| disabled | disabled | `boolean` | false |
| showAction | showAction | `boolean` | false |
| actionText | actionText | `string` | '搜索' |
| shape | shape | `'square' | 'round'` | 'round' |
| bgColor | bgColor | `string` | '' |
| height | height | `string | number` | 64 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| search | - |
| clear | - |
| custom | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Search** 测试按钮即可验证。
