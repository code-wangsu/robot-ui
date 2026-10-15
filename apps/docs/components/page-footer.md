<script setup lang="ts">
import BasicDemo from '../examples/page-footer/basic.vue'

const basicSource = `<template>
<rb-page-footer>
  <template #header><view style="padding:8px;background:#f5f7fa">顶栏</view><\/template>
  <view style="padding:16px">内容区</view>
  <template #footer><view style="padding:8px;background:#f5f7fa">底栏</view><\/template>
</rb-page-footer>
<\/template>
`
</script>

# PageFooter 页脚布局

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-page-footer>
  <template #header><view style="padding:8px;background:#f5f7fa">顶栏</view></template>
  <view style="padding:16px">内容区</view>
  <template #footer><view style="padding:8px;background:#f5f7fa">底栏</view></template>
</rb-page-footer>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| refresherEnabled | refresherEnabled | `boolean` | false |
| refresherTriggered | refresherTriggered | `boolean | string` | false |
| lowerThreshold | lowerThreshold | `number` | 50 |
| dismissKeyboardOnTap | 点击是否自动收起软键盘 | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| refresherrefresh | - |
| scroll | - |
| scrolltolower | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **PageFooter** 测试按钮即可验证。
