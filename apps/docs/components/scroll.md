<script setup lang="ts">
import BasicDemo from '../examples/scroll/basic.vue'

const basicSource = `<script setup lang="ts">
const items = Array.from({ length: 8 }, (_, i) => '滚动项 ' + (i + 1))
<\/script>

<template>
<rb-scroll height="180" scroll-y>
  <view v-for="item in items" :key="item" style="padding:10px 0;border-bottom:1px solid #f0f0f0">{{ item }}</view>
</rb-scroll>
<\/template>
`
</script>

# Scroll 滚动容器

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const items = Array.from({ length: 8 }, (_, i) => '滚动项 ' + (i + 1))
</script>

<template>
<rb-scroll height="180" scroll-y>
  <view v-for="item in items" :key="item" style="padding:10px 0;border-bottom:1px solid #f0f0f0">{{ item }}</view>
</rb-scroll>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| scrollY | 纵向滚动 | `boolean` | true |
| scrollX | 横向滚动 | `boolean` | false |
| height | 容器高度，数字默认 rpx；横向滚动时常配合固定高度 | `string | number` | '' |
| lowerThreshold | 距底部/右边多远触发 scrolltolower | `number` | 50 |
| upperThreshold | upperThreshold | `number` | 50 |
| refresherEnabled | 下拉刷新（App / 微信等） | `boolean` | false |
| refresherTriggered | refresherTriggered | `boolean` | false |
| showScrollbar | 是否显示滚动条 | `boolean` | false |
| bounces | 是否启用弹性滚动（iOS） | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| scroll | - |
| scrolltolower | - |
| scrolltoupper | - |
| refresherrefresh | - |
| update:refresherTriggered | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Scroll** 测试按钮即可验证。
