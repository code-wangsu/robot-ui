<script setup lang="ts">
import BasicDemo from '../examples/loadmore/basic.vue'

const basicSource = `<script setup lang="ts">
function onLoad() {}
<\/script>

<template>
<rb-loadmore status="loadmore" @loadmore="onLoad" />
<\/template>
`
</script>

# Loadmore 加载更多

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
function onLoad() {}
</script>

<template>
<rb-loadmore status="loadmore" @loadmore="onLoad" />
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| status | status | `LoadmoreStatus` | 'loadmore' |
| loadmoreText | loadmoreText | `string` | '上拉加载更多' |
| loadingText | loadingText | `string` | '正在加载...' |
| nomoreText | nomoreText | `string` | '没有更多了' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| loadmore | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Loadmore** 测试按钮即可验证。
