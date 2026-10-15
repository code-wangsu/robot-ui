<script setup lang="ts">
import BasicDemo from '../examples/overlay/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="显示遮罩" type="primary" @click="show = true" />
<rb-overlay :show="show" @click="show = false" />
<\/template>
`
</script>

# Overlay 遮罩层

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
<rb-button text="显示遮罩" type="primary" @click="show = true" />
<rb-overlay :show="show" @click="show = false" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| zIndex | zIndex | `number` | 10070 |
| duration | duration | `number` | 300 |
| opacity | opacity | `number` | 0.5 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Overlay** 测试按钮即可验证。
