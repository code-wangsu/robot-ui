<script setup lang="ts">
import BasicDemo from '../examples/form-item/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
<\/script>

<template>
<rb-form-item prop="name" label="姓名">
  <rb-input v-model="name" placeholder="请输入" />
</rb-form-item>
<\/template>
`
</script>

# FormItem 表单项

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>

<template>
<rb-form-item prop="name" label="姓名">
  <rb-input v-model="name" placeholder="请输入" />
</rb-form-item>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prop | prop | `string` | '' |
| label | label | `string` | '' |
| required | required | `boolean` | false |
| rules | rules | `FormRule[]` | [] |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **FormItem** 测试按钮即可验证。
