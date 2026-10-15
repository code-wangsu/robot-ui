<script setup lang="ts">
import BasicDemo from '../examples/footer-back/basic.vue'

const basicSource = `<script setup lang="ts">
function goBack() {}
<\/script>

<template>
<rb-footer-back text="返回" @click="goBack" />
<\/template>
`
</script>

# FooterBack 底部返回

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
function goBack() {}
</script>

<template>
<rb-footer-back text="返回" @click="goBack" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| text | text | `string` | — |
| icon | icon | `string` | 'fanhuishouye' |
| iconSize | iconSize | `string | number` | '12rpx' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| click | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **FooterBack** 测试按钮即可验证。
