<script setup lang="ts">
import BasicDemo from '../examples/col/basic.vue'

const basicSource = `<template>
<rb-row :gutter="12">
  <rb-col :span="8"><view style="padding:12px;background:#ecf5ff;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fdf6ec;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fef0f0;text-align:center">列</view></rb-col>
</rb-row>
<\/template>
`
</script>

# Col 列布局

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-row :gutter="12">
  <rb-col :span="8"><view style="padding:12px;background:#ecf5ff;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fdf6ec;text-align:center">列</view></rb-col>
  <rb-col :span="8"><view style="padding:12px;background:#fef0f0;text-align:center">列</view></rb-col>
</rb-row>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| span | span | `number` | 12 |
| offset | offset | `number` | 0 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Col** 测试按钮即可验证。
