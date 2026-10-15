<script setup lang="ts">
import BasicDemo from '../examples/modal/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="打开模态框" type="primary" @click="show = true" />
<rb-modal v-model:show="show" title="提示" content="确认执行该操作？" />
<\/template>
`
</script>

# Modal 模态框

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
<rb-button text="打开模态框" type="primary" @click="show = true" />
<rb-modal v-model:show="show" title="提示" content="确认执行该操作？" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| title | title | `string` | '提示' |
| content | content | `string` | '' |
| showCancelButton | showCancelButton | `boolean` | true |
| cancelText | cancelText | `string` | '取消' |
| confirmText | confirmText | `string` | '确定' |
| closeOnClickOverlay | closeOnClickOverlay | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| confirm | - |
| cancel | - |
| update:show | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Modal** 测试按钮即可验证。
