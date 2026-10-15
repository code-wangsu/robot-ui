<script setup lang="ts">
import BasicDemo from '../examples/steps/basic.vue'

const basicSource = `<template>
<rb-steps :current="1">
  <rb-steps-item title="步骤一" />
  <rb-steps-item title="步骤二" />
  <rb-steps-item title="步骤三" />
</rb-steps>
<\/template>
`
</script>

# Steps 步骤条

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-steps :current="1">
  <rb-steps-item title="步骤一" />
  <rb-steps-item title="步骤二" />
  <rb-steps-item title="步骤三" />
</rb-steps>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| current | current | `number` | 0 |
| direction | direction | `'row' | 'column'` | 'row' |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Steps** 测试按钮即可验证。
