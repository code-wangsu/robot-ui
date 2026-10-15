<script setup lang="ts">
import BasicDemo from '../examples/form/basic.vue'

const basicSource = `<script setup lang="ts">
import { ref } from 'vue'
const model = ref({ name: '' })
const rules = { name: [{ required: true, message: '请输入姓名' }] }
<\/script>

<template>
<rb-form :model="model" :rules="rules">
  <rb-form-item prop="name" label="姓名">
    <rb-input v-model="model.name" placeholder="请输入" />
  </rb-form-item>
</rb-form>
<\/template>
`
</script>

# Form 表单

## 基础用法

<DemoBlock title="基础用法" :raw-source="basicSource">
  <BasicDemo />
  <template #code>

```vue
<script setup lang="ts">
import { ref } from 'vue'
const model = ref({ name: '' })
const rules = { name: [{ required: true, message: '请输入姓名' }] }
</script>

<template>
<rb-form :model="model" :rules="rules">
  <rb-form-item prop="name" label="姓名">
    <rb-input v-model="model.name" placeholder="请输入" />
  </rb-form-item>
</rb-form>
</template>
```

  </template>
</DemoBlock>


## Attributes

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| model | model | `Record&lt;string, unknown&gt;` | — |
| rules | rules | `Record&lt;string, FormRule[]&gt;` | () => … |
| labelWidth | labelWidth | `string | number` | 160 |
| labelPosition | labelPosition | `'left' | 'top'` | 'left' |
| customStyle | 自定义样式 | `string / object` | — |
| customClass | 自定义类名 | `string` | — |

## 在 Playground 中试用

打开 `apps/playground`，在首页进入对应分类页，点击 **Form** 测试按钮即可验证。
