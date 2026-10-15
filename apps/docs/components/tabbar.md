<script setup lang="ts">
import BasicDemo from '../examples/tabbar/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
<\/script>

<template>
<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
  <rb-tabbar-item text="我的" />
</rb-tabbar>
<\/template>
`
</script>

# Tabbar 底部导航

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const current = ref(0)
</script>

<template>
<rb-tabbar v-model="current" :fixed="false" :safe-area-inset-bottom="false">
  <rb-tabbar-item text="首页" />
  <rb-tabbar-item text="消息" />
  <rb-tabbar-item text="我的" />
</rb-tabbar>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `string | number` | 0 |
| fixed | fixed | `boolean` | true |
| safeAreaInsetBottom | safeAreaInsetBottom | `boolean` | true |
| border | border | `boolean` | true |
| height | height | `string | number` | 100 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| change | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Tabbar** 测试按钮即可验证。
