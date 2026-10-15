<script setup lang="ts">
import BasicDemo from '../examples/sticky/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(0)
<\/script>

<template>
<view style="height:160px;overflow:auto" @scroll="(e) => (scrollTop = e.target.scrollTop)">
  <view style="height:40px" />
  <rb-sticky :scroll-top="scrollTop">
    <view style="padding:10px;background:#3c9cff;color:#fff">吸顶内容</view>
  </rb-sticky>
  <view style="height:240px;padding:12px">向下滚动查看吸顶</view>
</view>
<\/template>
`
</script>

# Sticky 吸顶

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(0)
</script>

<template>
<view style="height:160px;overflow:auto" @scroll="(e) => (scrollTop = e.target.scrollTop)">
  <view style="height:40px" />
  <rb-sticky :scroll-top="scrollTop">
    <view style="padding:10px;background:#3c9cff;color:#fff">吸顶内容</view>
  </rb-sticky>
  <view style="height:240px;padding:12px">向下滚动查看吸顶</view>
</view>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| offsetTop | 吸顶偏移，数字默认 rpx | `string | number` | 0 |
| zIndex | zIndex | `number` | 970 |
| enabled | 是否启用吸顶 | `boolean` | true |
| scrollTop | 页面 / scroll-view 的 scrollTop（px）。 在 onPageScroll 或 @scroll 中传入即可驱动吸顶判断。 | `number` | undefined |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| change | - |
| fixed | - |
| unfixed | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Sticky** 测试按钮即可验证。
