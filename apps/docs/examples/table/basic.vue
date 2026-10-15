<script setup lang="ts">
import { ref } from 'vue'

const columns = [
  { type: 'selection', fixed: 'left' },
  { type: 'expand', fixed: 'left' },
  { prop: 'name', label: '姓名', width: 120, fixed: 'left' },
  { prop: 'post', label: '岗位', width: 140 },
  { prop: 'status', label: '状态', width: 100 },
]

const childColumns = [
  { prop: 'task', label: '子任务', width: 160 },
  { prop: 'progress', label: '进度', width: 100 },
]

const list = ref([
  {
    id: 1,
    name: '刘小北',
    post: '拣货',
    status: '在岗',
    children: [
      { task: 'A区拣货', progress: '80%' },
      { task: '复核打包', progress: '40%' },
    ],
  },
  {
    id: 2,
    name: '赵小南',
    post: '上料',
    status: '在岗',
    children: [{ task: '线边补料', progress: '100%' }],
  },
  {
    id: 3,
    name: '陈小东',
    post: '下料质检',
    status: '签退',
    children: [],
  },
])

const selectedText = ref('未勾选')

function onSelectionChange(selection: Record<string, unknown>[]) {
  selectedText.value = selection.length
    ? selection.map((row) => String(row.name)).join('、')
    : '未勾选'
}
</script>

<template>
  <view>
    <text style="display: block; margin-bottom: 8px; color: #909399; font-size: 13px">
      勾选：{{ selectedText }}
    </text>
    <rb-table
      :columns="columns"
      :data="list"
      row-key="id"
      border
      :height="420"
      @selection-change="onSelectionChange"
    >
      <template #expand="{ row }">
        <rb-table
          v-if="Array.isArray(row.children) && row.children.length"
          :columns="childColumns"
          :data="row.children"
          size="small"
        />
        <rb-empty v-else text="暂无子任务" compact />
      </template>
    </rb-table>
  </view>
</template>
