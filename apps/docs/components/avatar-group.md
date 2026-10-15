<script setup lang="ts">
import BasicDemo from '../examples/avatar-group/basic.vue'

const basicSource = `<script setup lang="ts">
const urls = ['', '', '']
<\/script>

<template>
<rb-avatar-group>
  <rb-avatar text="A" />
  <rb-avatar text="B" />
  <rb-avatar text="C" />
</rb-avatar-group>
<\/template>
`
</script>

# AvatarGroup 头像组

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const urls = ['', '', '']
</script>

<template>
<rb-avatar-group>
  <rb-avatar text="A" />
  <rb-avatar text="B" />
  <rb-avatar text="C" />
</rb-avatar-group>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| urls | urls | `string[]` | [] |
| size | size | `string | number` | 64 |
| max | max | `number` | 5 |
| gap | gap | `string | number` | -16 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| excessClick | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **AvatarGroup** 测试按钮即可验证。
