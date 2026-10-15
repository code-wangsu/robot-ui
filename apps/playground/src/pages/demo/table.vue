<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RbTableColumn, RbTableSortState } from '@robot-ui/components'

definePage({
  style: {
    navigationBarTitleText: '表格组件',
  },
})

/** 基础样式：对齐示意图（浅灰表头 + 仅横线） */
const basicColumns: RbTableColumn[] = [
  { prop: 'name', label: '姓名', width: 140, fixed: 'left' },
  { prop: 'cardNo', label: '卡号', width: 180 },
  { prop: 'post', label: '岗位', width: 160 },
  { prop: 'status', label: '状态', width: 120 },
  { prop: 'allowEarly', label: '是否允许提前到岗', width: 220, align: 'center' },
  { prop: 'checkIn', label: '签到时间', width: 140, align: 'center' },
  { prop: 'checkOut', label: '签退时间', width: 140, align: 'center' },
]

const basicList = ref([
  { id: 1, name: '刘小北', cardNo: 'CARD-1001', post: '拣货', status: '在岗', allowEarly: '是', checkIn: '15:32', checkOut: '—' },
  { id: 2, name: '赵小南', cardNo: 'CARD-1002', post: '上料', status: '在岗', allowEarly: '否', checkIn: '15:40', checkOut: '—' },
  { id: 3, name: '陈小东', cardNo: 'CARD-0888', post: '下料质检', status: '签退', allowEarly: '是', checkIn: '09:12', checkOut: '17:20' },
  { id: 4, name: '周小西', cardNo: 'CARD-1004', post: '多件分拣', status: '在岗', allowEarly: '是', checkIn: '14:58', checkOut: '—' },
  { id: 5, name: '吴小中', cardNo: 'CARD-0777', post: '拣货', status: '未签到', allowEarly: '否', checkIn: '—', checkOut: '—' },
  { id: 6, name: '郑小安', cardNo: 'CARD-1006', post: '上料复核', status: '在岗', allowEarly: '是', checkIn: '15:05', checkOut: '—' },
  { id: 7, name: '冯小平', cardNo: 'CARD-0666', post: '下料', status: '签退', allowEarly: '否', checkIn: '08:50', checkOut: '16:45' },
  { id: 8, name: '蒋小和', cardNo: 'CARD-1008', post: '拣货', status: '在岗', allowEarly: '是', checkIn: '15:18', checkOut: '—' },
  { id: 9, name: '沈小顺', cardNo: 'TMP-015', post: '临时代班', status: '未签到', allowEarly: '否', checkIn: '—', checkOut: '—' },
  { id: 10, name: '韩小成', cardNo: 'CARD-1010', post: '上料', status: '在岗', allowEarly: '是', checkIn: '15:26', checkOut: '—' },
])

const featureColumns: RbTableColumn[] = [
  { type: 'selection', fixed: 'left' },
  { type: 'expand', fixed: 'left' },
  { type: 'index', label: '#', width: 80, fixed: 'left' },
  { prop: 'name', label: '姓名', width: 140, sortable: true, fixed: 'left' },
  { prop: 'post', label: '岗位', width: 160, sortable: true },
  { prop: 'status', label: '状态', width: 140, align: 'center' },
  { prop: 'checkIn', label: '签到时间', width: 140, align: 'center' },
]

const childColumns: RbTableColumn[] = [
  { prop: 'task', label: '子任务', width: 200 },
  { prop: 'owner', label: '负责人', width: 120 },
  { prop: 'progress', label: '进度', width: 100, align: 'center' },
]

const featureList = ref(
  basicList.value.slice(0, 5).map((row) => ({
    ...row,
    children: [
      { task: `${row.post}-准备`, owner: row.name, progress: '60%' },
      { task: `${row.post}-执行`, owner: row.name, progress: '30%' },
    ],
  })),
)
const lastSort = ref('未排序')
const selectedText = ref('未勾选')
const tableRef = ref<{ clearSelection: () => void } | null>(null)

const currentPage = ref(1)
const pageSize = ref(5)
const pageTotal = 86

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return basicList.value.slice(0, pageSize.value).map((row, i) => ({
    ...row,
    id: start + i + 1,
    name: `${row.name}-${currentPage.value}`,
  }))
})

function onSort(state: RbTableSortState | null) {
  lastSort.value = state ? `${state.prop} · ${state.order}` : '未排序'
}

function onSelectionChange(selection: Record<string, unknown>[]) {
  selectedText.value = selection.length
    ? selection.map((row) => row.name).join('、')
    : '未勾选'
}

function statusType(status: unknown) {
  if (status === '在岗') return 'success'
  if (status === '签退') return 'warning'
  return 'info'
}

function clearSelected() {
  tableRef.value?.clearSelection()
}
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">基础样式</text>
      <text class="demo__meta">浅灰表头 · 仅横线分隔 · 无竖线（对齐示意图）</text>
      <rb-table
        :columns="basicColumns"
        :data="basicList"
        row-key="id"
        :height="720"
      />
    </view>

    <view class="demo__section">
      <text class="demo__label">能力扩展</text>
      <text class="demo__meta">排序：{{ lastSort }} · 勾选：{{ selectedText }} · 可展开嵌套子表</text>
      <view class="demo__actions">
        <rb-button size="small" text="清空勾选" @click="clearSelected" />
      </view>
      <rb-table
        ref="tableRef"
        :columns="featureColumns"
        :data="featureList"
        row-key="id"
        border
        stripe
        highlight-current-row
        :height="560"
        @sort-change="onSort"
        @selection-change="onSelectionChange"
      >
        <template #cell-status="{ row }">
          <rb-tag
            :text="String(row.status)"
            :type="statusType(row.status)"
            effect="light"
            size="small"
          />
        </template>
        <template #expand="{ row }">
          <rb-table
            v-if="Array.isArray(row.children) && row.children.length"
            :columns="childColumns"
            :data="row.children as Record<string, unknown>[]"
            size="small"
            border
          />
          <rb-empty v-else text="暂无子任务" compact />
        </template>
      </rb-table>
    </view>

    <view class="demo__section">
      <text class="demo__label">Pagination 分页器</text>
      <text class="demo__meta">对齐 Element Plus：total / sizes / prev / pager / next / jumper</text>
      <rb-table
        :columns="featureColumns.filter((c) => c.type !== 'selection')"
        :data="pagedList"
        row-key="id"
        :height="420"
      >
        <template #cell-status="{ row }">
          <rb-tag
            :text="String(row.status)"
            :type="statusType(row.status)"
            effect="light"
            size="small"
          />
        </template>
      </rb-table>
      <view class="demo__pager">
        <rb-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="pageTotal"
          :page-sizes="[5, 10, 20]"
          layout="total, sizes, prev, pager, next"
          background
        />
      </view>
      <view class="demo__pager">
        <rb-pagination
          :current-page="2"
          :total="40"
          :page-size="10"
          size="small"
          layout="prev, pager, next, jumper"
          :background="false"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.demo {
  padding: 24rpx;
  background: #f5f6f8;
  min-height: 100vh;
}

.demo__section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  background: #fff;
  overflow: hidden;
}

.demo__label {
  display: block;
  margin-bottom: 8rpx;
  font-size: 28rpx;
  font-weight: 600;
  color: #303133;
}

.demo__meta {
  display: block;
  margin-bottom: 16rpx;
  font-size: 22rpx;
  color: #909399;
}

.demo__actions {
  margin-bottom: 16rpx;
}

.demo__pager {
  margin-top: 24rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid #ebeef5;
}
</style>
