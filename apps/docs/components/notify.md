<script setup lang="ts">
import BasicDemo from '../examples/notify/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
<\/script>

<template>
<rb-button text="打开通知" type="primary" @click="show = true" />
<rb-notify v-model:show="show" type="primary" message="这是一条通知" />
<\/template>
`
</script>

# Notify 消息提示

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
<rb-button text="打开通知" type="primary" @click="show = true" />
<rb-notify v-model:show="show" type="primary" message="这是一条通知" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | show | `boolean` | false |
| message | message | `string` | '' |
| type | type | `RbType` | 'primary' |
| duration | duration | `number` | 3000 |
| top | top | `string | number` | 0 |
| safeAreaInsetTop | safeAreaInsetTop | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| close | - |
| update:show | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Notify** 测试按钮即可验证。
