<script setup lang="ts">
import BasicDemo from '../examples/row/basic.vue'

const basicSource = `<template>
<rb-row :gutter="16">
  <rb-col :span="12"><view style="padding:12px;background:#ecf5ff;text-align:center">左</view></rb-col>
  <rb-col :span="12"><view style="padding:12px;background:#f0f9eb;text-align:center">右</view></rb-col>
</rb-row>
<\/template>
`
</script>

# Row 行布局

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-row :gutter="16">
  <rb-col :span="12"><view style="padding:12px;background:#ecf5ff;text-align:center">左</view></rb-col>
  <rb-col :span="12"><view style="padding:12px;background:#f0f9eb;text-align:center">右</view></rb-col>
</rb-row>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| gutter | gutter | `string | number` | 0 |
| justify | justify | `'start' | 'end' | 'center' | 'space-around' | 'space-between'` | 'start' |
| align | align | `'top' | 'center' | 'bottom'` | 'top' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Row** 测试按钮即可验证。
