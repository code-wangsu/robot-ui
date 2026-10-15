<script setup lang="ts">
import BasicDemo from '../examples/tooltip/basic.vue'

const basicSource = `<template>
<rb-tooltip text="提示文案">
  <rb-button text="悬停查看" />
</rb-tooltip>
<\/template>
`
</script>

# Tooltip 文字提示

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-tooltip text="提示文案">
  <rb-button text="悬停查看" />
</rb-tooltip>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | '' |
| placement | placement | `Placement` | 'top' |
| show | 受控显隐；不传则组件内部维护 | `boolean` | undefined |
| trigger | trigger | `Trigger` | 'click' |
| disabled | disabled | `boolean` | false |
| showDelay | showDelay | `number` | 0 |
| hideDelay | hideDelay | `number` | 150 |
| arrow | arrow | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| update:show | - |
| open | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Tooltip** 测试按钮即可验证。
