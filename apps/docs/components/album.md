<script setup lang="ts">
import BasicDemo from '../examples/album/basic.vue'

const basicSource = `<script setup lang="ts">
const urls = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/3.jpg',
]
<\/script>

<template>
<rb-album :urls="urls" />
<\/template>
`
</script>

# Album 相册

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const urls = [
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/1.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/2.jpg',
  'https://cdn.jsdelivr.net/gh/edison1105/cdn@main/imgs/3.jpg',
]
</script>

<template>
<rb-album :urls="urls" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| urls | urls | `string[]` | [] |
| singleSize | singleSize | `string | number` | 360 |
| multipleSize | multipleSize | `string | number` | 160 |
| space | space | `string | number` | 12 |
| rowCount | rowCount | `number` | 3 |
| showMore | showMore | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Album** 测试按钮即可验证。
