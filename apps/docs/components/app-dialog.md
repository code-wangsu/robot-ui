<script setup lang="ts">
import BasicDemo from '../examples/app-dialog/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="打开业务弹窗" type="primary" @click="show = true" />
<rb-app-dialog v-model="show" title="业务弹窗">
  <view style="padding:12px 0">弹窗内容</view>
  <template #footer>
    <rb-button size="small" text="取消" @click="show = false" />
    <rb-button size="small" type="primary" text="确定" @click="show = false" />
  <\/template>
</rb-app-dialog>
<\/template>
`
</script>

# AppDialog 业务弹窗

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
<rb-button text="打开业务弹窗" type="primary" @click="show = true" />
<rb-app-dialog v-model="show" title="业务弹窗">
  <view style="padding:12px 0">弹窗内容</view>
  <template #footer>
    <rb-button size="small" text="取消" @click="show = false" />
    <rb-button size="small" type="primary" text="确定" @click="show = false" />
  </template>
</rb-app-dialog>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| modelValue | modelValue | `boolean` | false |
| title | title | `string` | '' |
| width | width | `number` | 620 |
| large | large | `boolean` | false |
| maxHeight | maxHeight | `number` | 0 |
| maskClosable | maskClosable | `boolean` | false |
| showClose | showClose | `boolean` | true |
| interceptClose | interceptClose | `boolean` | false |
| closeText | closeText | `string` | '关闭' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:modelValue | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **AppDialog** 测试按钮即可验证。
