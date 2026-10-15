<script setup lang="ts">
import BasicDemo from '../examples/transition/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
<\/script>

<template>
<rb-button :text="show ? '隐藏' : '显示'" @click="show = !show" />
<rb-transition :show="show" mode="fade">
  <view style="margin-top:12px;padding:16px;background:#ecf5ff;border-radius:8px">过渡内容</view>
</rb-transition>
<\/template>
`
</script>

# Transition 过渡动画

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
<rb-button :text="show ? '隐藏' : '显示'" @click="show = !show" />
<rb-transition :show="show" mode="fade">
  <view style="margin-top:12px;padding:16px;background:#ecf5ff;border-radius:8px">过渡内容</view>
</rb-transition>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| mode | mode | `TransitionMode` | 'fade' |
| duration | duration | `number` | 300 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| before-enter | - |
| enter | - |
| after-enter | - |
| before-leave | - |
| leave | - |
| after-leave | - |
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Transition** 测试按钮即可验证。
