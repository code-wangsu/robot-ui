<script setup lang="ts">
import BasicDemo from '../examples/index-list/basic.vue'

const basicSource = `<script setup lang="ts">
const letters = ['A', 'B', 'C']
<\/script>

<template>
<view style="height:240px;overflow:auto;border:1px solid #eee">
  <rb-index-list :index-list="letters">
    <view v-for="letter in letters" :key="letter">
      <rb-index-anchor :index="letter" />
      <view style="padding:8px 12px">{{ letter }} 分组内容</view>
    </view>
  </rb-index-list>
</view>
<\/template>
`
</script>

# IndexList 索引列表

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
const letters = ['A', 'B', 'C']
</script>

<template>
<view style="height:240px;overflow:auto;border:1px solid #eee">
  <rb-index-list :index-list="letters">
    <view v-for="letter in letters" :key="letter">
      <rb-index-anchor :index="letter" />
      <view style="padding:8px 12px">{{ letter }} 分组内容</view>
    </view>
  </rb-index-list>
</view>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| indexList | indexList | `string[]` | [] |
| sticky | sticky | `boolean` | true |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## Events

| 事件名 | 说明 |
|--------|------|
| select | - |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **IndexList** 测试按钮即可验证。
