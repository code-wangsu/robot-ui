<script setup lang="ts">
import BasicDemo from '../examples/line/basic.vue'

const basicSource = `<template>
  <div style="padding: 8px 0">
    <rb-line color="#dcdfe6" :length="'100%'" />
    <div style="height: 16px" />
    <rb-line color="#3c9cff" :hairline="true" />
  </div>
<\/template>
`
</script>

# Line 线条

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
  <div style="padding: 8px 0">
    <rb-line color="#dcdfe6" :length="'100%'" />
    <div style="height: 16px" />
    <rb-line color="#3c9cff" :hairline="true" />
  </div>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| length | length | `string | number` | '100%' |
| color | color | `string` | '' |
| direction | direction | `'row' | 'col'` | 'row' |
| hairline | hairline | `boolean` | false |
| margin | margin | `string | number` | 0 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Line** 测试按钮即可验证。
