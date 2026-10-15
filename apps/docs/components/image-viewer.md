<script setup lang="ts">
import BasicDemo from '../examples/image-viewer/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const list = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
<\/script>

<template>
<rb-button text="预览图片" type="primary" @click="show = true" />
<rb-image-viewer v-model:show="show" :url-list="list" />
<\/template>
`
</script>

# ImageViewer 图片预览

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const list = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
</script>

<template>
<rb-button text="预览图片" type="primary" @click="show = true" />
<rb-image-viewer v-model:show="show" :url-list="list" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| urlList | urlList | `string[]` | [] |
| initialIndex | 初始索引，对齐 Element Plus initial-index | `number` | 0 |
| hideOnClickModal | 点击遮罩是否关闭 | `boolean` | true |
| zIndex | zIndex | `number` | 20000 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:show | - |
| close | - |
| switch | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **ImageViewer** 测试按钮即可验证。
