<script setup lang="ts">
import BasicDemo from '../examples/popup/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="打开弹层" type="primary" @click="show = true" />
<rb-popup v-model:show="show" mode="center" :round="16">
  <view style="padding:24px;min-width:200px;text-align:center">弹层内容</view>
</rb-popup>
<\/template>
`
</script>

# Popup 弹出层

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
<rb-button text="打开弹层" type="primary" @click="show = true" />
<rb-popup v-model:show="show" mode="center" :round="16">
  <view style="padding:24px;min-width:200px;text-align:center">弹层内容</view>
</rb-popup>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| mode | mode | `PopupMode` | 'bottom' |
| round | round | `string | number` | 0 |
| closeable | closeable | `boolean` | false |
| closeOnClickOverlay | closeOnClickOverlay | `boolean` | true |
| overlay | overlay | `boolean` | true |
| overlayOpacity | overlayOpacity | `number` | 0.5 |
| zIndex | zIndex | `number` | 10075 |
| duration | duration | `number` | 300 |
| safeAreaInsetBottom | safeAreaInsetBottom | `boolean` | true |
| bgColor | bgColor | `string` | '' |
| lockScroll | 锁定背景滚动：H5 写 body；App/微信由 page-meta 处理 | `boolean` | true |
| rootPortal | 挂到页面根，避免父级 transform / overflow / swiper 导致 fixed 失效。 H5=teleport，微信/支付宝=root-portal，App=renderjs 挪根。 App 若不想用 renderjs，可设 false 并把弹层放到页面根级。 | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| open | - |
| close | - |
| click | - |
| update:show | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Popup** 测试按钮即可验证。
