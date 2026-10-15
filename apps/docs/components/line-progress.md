<script setup lang="ts">
import BasicDemo from '../examples/line-progress/basic.vue'

const basicSource = `<template>
<rb-line-progress :percentage="60" />
<\/template>
`
</script>

# LineProgress 进度条

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-line-progress :percentage="60" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | percent | `number` | 0 |
| height | height | `string | number` | 12 |
| activeColor | activeColor | `string` | '' |
| inactiveColor | inactiveColor | `string` | '' |
| showText | showText | `boolean` | false |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **LineProgress** 测试按钮即可验证。
