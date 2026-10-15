<script setup lang="ts">
import BasicDemo from '../examples/toast/basic.vue'

const basicSource = `<script setup lang="ts">
import { showToast } from '../../../../packages/components/src/toast/toast'

function open() {
  showToast({ title: '成功', message: '操作完成', type: 'success' })
}
<\/script>

<template>
<rb-button type="primary" text="打开 Toast" @click="open" />
<rb-toast />
<\/template>
`
</script>

# Toast 消息通知

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { showToast } from '../../../../packages/components/src/toast/toast'

function open() {
  showToast({ title: '成功', message: '操作完成', type: 'success' })
}
</script>

<template>
<rb-button type="primary" text="打开 Toast" @click="open" />
<rb-toast />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| show | 声明式显隐；未传时跟随命令式 useToastState | `boolean` | undefined |
| message | message | `string` | '' |
| title | title | `string` | '' |
| type | type | `ToastType` | 'info' |
| duration | duration | `number` | 3000 |
| position | position | `ToastPosition` | 'top-right' |
| showClose | showClose | `boolean` | true |
| global | true 时优先消费全局命令式状态 | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| close | - |
| update:show | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Toast** 测试按钮即可验证。
