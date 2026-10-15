<script setup lang="ts">
import BasicDemo from '../examples/read-more/basic.vue'

const basicSource = `<template>
<rb-read-more :show-height="80">
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
</rb-read-more>
<\/template>
`
</script>

# ReadMore 展开阅读

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-read-more :show-height="80">
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
  这是一段很长的演示文案。这是一段很长的演示文案。这是一段很长的演示文案。
</rb-read-more>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| showHeight | showHeight | `string | number` | 200 |
| closeText | closeText | `string` | '展开阅读全文' |
| openText | openText | `string` | '收起' |
| toggle | toggle | `boolean` | true |
| color | color | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| open | - |
| close | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **ReadMore** 测试按钮即可验证。
