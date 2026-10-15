<script setup lang="ts">
import BasicDemo from '../examples/list/basic.vue'

const basicSource = `<template>
<rb-list>
  <rb-list-item title="标题一" note="说明" />
  <rb-list-item title="标题二" note="说明" />
</rb-list>
<\/template>
`
</script>

# List 列表

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<template>
<rb-list>
  <rb-list-item title="标题一" note="说明" />
  <rb-list-item title="标题二" note="说明" />
</rb-list>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| height | height | `string | number` | '100%' |
| scrollY | scrollY | `boolean` | true |
| refresherEnabled | refresherEnabled | `boolean` | false |
| lowerThreshold | lowerThreshold | `number` | 50 |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| scroll | - |
| scrolltolower | - |
| refresherrefresh | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **List** 测试按钮即可验证。
