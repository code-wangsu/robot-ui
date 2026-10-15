<script setup lang="ts">
import BasicDemo from '../examples/swipe-action-item/basic.vue'

const basicSource = `<script setup lang="ts">
const options = [{ text: '删除', style: { background: '#f56c6c', color: '#fff' } }]
<\/script>

<template>
<rb-swipe-action>
  <rb-swipe-action-item :options="options">
    <view style="padding:16px;background:#fff;border:1px solid #eee">滑动项</view>
  </rb-swipe-action-item>
</rb-swipe-action>
<\/template>
`
</script>

# SwipeActionItem 滑动项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const options = [{ text: '删除', style: { background: '#f56c6c', color: '#fff' } }]
</script>

<template>
<rb-swipe-action>
  <rb-swipe-action-item :options="options">
    <view style="padding:16px;background:#fff;border:1px solid #eee">滑动项</view>
  </rb-swipe-action-item>
</rb-swipe-action>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| name | name | `string | number` | '' |
| buttons | buttons | `SwipeActionButton[]` | [] |
| disabled | disabled | `boolean` | false |
| threshold | threshold | `number` | 30 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |
| open | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **SwipeActionItem** 测试按钮即可验证。
