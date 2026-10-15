<script setup lang="ts">
import BasicDemo from '../examples/pull-refresh/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function onRefresh() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 800)
}
<\/script>

<template>
<rb-pull-refresh :refreshing="loading" @refresh="onRefresh">
  <view style="padding:16px">下拉刷新演示</view>
</rb-pull-refresh>
<\/template>
`
</script>

# PullRefresh 下拉刷新

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(false)
function onRefresh() {
  loading.value = true
  setTimeout(() => { loading.value = false }, 800)
}
</script>

<template>
<rb-pull-refresh :refreshing="loading" @refresh="onRefresh">
  <view style="padding:16px">下拉刷新演示</view>
</rb-pull-refresh>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| refreshing | refreshing | `boolean` | false |
| loadStatus | loadStatus | `LoadmoreStatus` | 'loadmore' |
| height | 容器高度，数字默认 rpx | `string | number` | '100%' |
| lowerThreshold | lowerThreshold | `number` | 80 |
| refresherEnabled | refresherEnabled | `boolean` | true |
| refresherThreshold | refresherThreshold | `number` | 80 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| refresh | - |
| loadmore | - |
| scroll | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **PullRefresh** 测试按钮即可验证。
