<script setup lang="ts">
import BasicDemo from '../examples/swiper/basic.vue'

const basicSource = `<script setup lang="ts">
const images = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
<\/script>

<template>
<rb-swiper :list="images" height="180" />
<\/template>
`
</script>

# Swiper 轮播

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const images = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
]
</script>

<template>
<rb-swiper :list="images" height="180" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| list | list | `string[]` | [] |
| height | height | `string | number` | 300 |
| autoplay | autoplay | `boolean` | true |
| interval | interval | `number` | 3000 |
| circular | circular | `boolean` | true |
| indicatorDots | indicatorDots | `boolean` | true |
| current | current | `number` | 0 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| change | - |
| update:current | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Swiper** 测试按钮即可验证。
