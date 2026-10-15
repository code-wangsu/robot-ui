<script setup lang="ts">
import BasicDemo from '../examples/back-top/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(120)
<\/script>

<template>
<view style="position:relative;height:120px">
  <rb-back-top :scroll-top="scrollTop" :top="40" />
  <view style="padding:12px;color:#909399">scrollTop &gt; top 时显示回到顶部</view>
</view>
<\/template>
`
</script>

# BackTop 回到顶部

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const scrollTop = ref(120)
</script>

<template>
<view style="position:relative;height:120px">
  <rb-back-top :scroll-top="scrollTop" :top="40" />
  <view style="padding:12px;color:#909399">scrollTop &gt; top 时显示回到顶部</view>
</view>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 受控显示；不传则根据 scrollTop / top 自动判断 | `boolean` | undefined |
| scrollTop | 页面滚动距离（px），通常来自 onPageScroll | `number` | 0 |
| top | 滚动超过该阈值后显示，数字默认 rpx | `string | number` | 400 |
| bottom | bottom | `string | number` | 120 |
| right | right | `string | number` | 40 |
| zIndex | zIndex | `number` | 999 |
| duration | duration | `number` | 300 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **BackTop** 测试按钮即可验证。
