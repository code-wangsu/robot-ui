<script setup lang="ts">
import BasicDemo from '../examples/steps-item/basic.vue'

const basicSource = `<template>
<rb-steps :current="0">
  <rb-steps-item title="完成" />
  <rb-steps-item title="进行中" />
</rb-steps>
<\/template>
`
</script>

# StepsItem 步骤项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-steps :current="0">
  <rb-steps-item title="完成" />
  <rb-steps-item title="进行中" />
</rb-steps>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| index | index | `number` | 0 |
| title | title | `string` | '' |
| desc | desc | `string` | '' |
| icon | icon | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **StepsItem** 测试按钮即可验证。
