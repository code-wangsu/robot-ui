<script setup lang="ts">
import BasicDemo from '../examples/count-to/basic.vue'

const basicSource = `<template>
<rb-count-to :end-val="1000" />
<\/template>
`
</script>

# CountTo 数字滚动

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-count-to :end-val="1000" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| startVal | startVal | `number` | 0 |
| endVal | endVal | `number` | 0 |
| duration | duration | `number` | 2000 |
| decimals | decimals | `number` | 0 |
| separator | separator | `string` | '' |
| autoplay | autoplay | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| finish | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **CountTo** 测试按钮即可验证。
