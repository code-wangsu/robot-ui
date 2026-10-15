<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { PickerColumn, RbDatePickerType, UploadFileItem } from '@robot-ui/components'

definePage({
  style: {
    navigationBarTitleText: '表单组件',
  },
})

const formRef = ref<{ validate: () => Promise<boolean>; resetValidation: () => void }>()
const model = reactive({
  name: '',
  dept: '',
  dateValue: '',
  dateTimeValue: '',
  agree: false,
})

/** 对齐 Element Plus：date / time / datetime */
const pickerType = ref<RbDatePickerType>('datetime')

const dateLabel = computed(() => {
  if (pickerType.value === 'time') return '时间'
  if (pickerType.value === 'datetime') return '日期时间'
  return '日期'
})

const rules = {
  name: [{ required: true, message: '请输入姓名' }],
  dept: [{ required: true, message: '请选择岗位' }],
  dateTimeValue: [{ required: true, message: '请选择日期和时间' }],
  agree: [{ validator: (v: unknown) => (v === true ? true : '请同意协议') }],
}

const showPicker = ref(false)
const showMulti = ref(false)
const multiValue = ref<Array<string | number>>(['电力中断', '现场操作异常', '其他异常'])

const deptColumns: PickerColumn[][] = [
  [
    { label: '拣货', value: '拣货' },
    { label: '上料', value: '上料' },
    { label: '下料质检', value: '下料质检' },
    { label: '多件分拣', value: '多件分拣' },
  ],
]

const multiOptions = [
  { label: '设备故障', value: '设备故障' },
  { label: '系统宕机', value: '系统宕机' },
  { label: '网络中断', value: '网络中断' },
  { label: '电力中断', value: '电力中断' },
  { label: '现场操作异常', value: '现场操作异常' },
  { label: '其他异常', value: '其他异常' },
]

const typeOptions: Array<{ label: string; value: RbDatePickerType }> = [
  { label: 'date', value: 'date' },
  { label: 'time', value: 'time' },
  { label: 'datetime', value: 'datetime' },
]

const attachmentList = ref<UploadFileItem[]>([])

async function onSubmit() {
  const ok = await formRef.value?.validate()
  uni.showToast({
    title: ok ? '校验通过' : '校验失败',
    icon: ok ? 'success' : 'none',
  })
}

function onReset() {
  model.name = ''
  model.dept = ''
  model.dateValue = ''
  model.dateTimeValue = ''
  model.agree = false
  multiValue.value = []
  attachmentList.value = []
  formRef.value?.resetValidation()
}

function onDeptConfirm(values: Array<string | number>) {
  model.dept = String(values[0] ?? '')
}

function setType(type: RbDatePickerType) {
  pickerType.value = type
  model.dateValue = ''
}
</script>

<template>
  <view class="demo">
    <view class="demo__section">
      <text class="demo__label">表单 / 下拉 / 选择时间</text>

      <rb-form ref="formRef" :model="model" :rules="rules" label-width="180">
        <rb-form-item prop="name" label="姓名">
          <rb-input v-model="model.name" clearable placeholder="请输入姓名" />
        </rb-form-item>

        <rb-form-item prop="dept" label="岗位">
          <view class="field" @click="showPicker = true">
            <text :class="model.dept ? 'field__value' : 'field__placeholder'">
              {{ model.dept || '请选择岗位' }}
            </text>
            <text class="field__arrow">›</text>
          </view>
        </rb-form-item>

        <rb-form-item prop="dateTimeValue" label="日期时间">
          <rb-date-picker
            v-model="model.dateTimeValue"
            type="datetime"
            title="选择日期和时间"
            clearable
            placeholder="请选择日期和时间"
          />
        </rb-form-item>

        <rb-form-item prop="agree" label="协议">
          <rb-switch v-model="model.agree" />
        </rb-form-item>

        <rb-form-item label="附件">
          <rb-upload
            v-model:file-list="attachmentList"
            :auto-upload="false"
            :limit="3"
            tip="上传图片"
          />
        </rb-form-item>
      </rb-form>

      <view class="type-row">
        <text class="type-row__label">type 切换</text>
        <view class="type-row__tabs">
          <view
            v-for="item in typeOptions"
            :key="item.value"
            class="type-tab"
            :class="{ 'type-tab--active': pickerType === item.value }"
            @click="setType(item.value)"
          >
            <text>{{ item.label }}</text>
          </view>
        </view>
      </view>

      <view class="field-block">
        <text class="field-block__label">{{ dateLabel }}（type={{ pickerType }}）</text>
        <rb-date-picker
          v-model="model.dateValue"
          :type="pickerType"
          clearable
        />
      </view>

      <view class="field-block">
        <text class="field-block__label">异常类型（多选）</text>
        <rb-multi-select
          v-model="multiValue"
          v-model:show="showMulti"
          title="选择异常类型"
          placeholder="请选择异常类型"
          :options="multiOptions"
          :max-collapse-count="2"
        />
      </view>

      <view class="demo__row">
        <rb-button type="primary" text="提交校验" @click="onSubmit" />
        <rb-button text="重置" @click="onReset" />
      </view>
      <text class="demo__meta">日期时间：{{ model.dateTimeValue || '未选择' }}</text>
      <text class="demo__meta">type 演示值：{{ model.dateValue || '未选择' }}</text>
    </view>

    <view class="demo__section">
      <text class="demo__label">| 审核/修改/复核记录</text>
      <rb-card title="直接审核记录" extra="2026-05-18 09:20:00" type="success">
        <view class="record">审核人: 厂长</view>
        <view class="record">审核结果: 审核通过</view>
        <view class="record">审核意见: 异常属实，审核通过。</view>
      </rb-card>

      <rb-card class="demo__card" title="修改记录" extra="2026-05-18 10:05:12" type="warning">
        <view class="record">修改人: 班长</view>
        <view class="record">修改项: 签到时间</view>
        <view class="record">备注: 补录迟到说明。</view>
      </rb-card>
    </view>

    <rb-picker
      v-model:show="showPicker"
      title="选择岗位"
      :columns="deptColumns"
      @confirm="onDeptConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.demo {
  padding: 24rpx;
  background: #f4f5f7;
  min-height: 100vh;
  box-sizing: border-box;
}

.demo__section {
  margin-bottom: 32rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  background: #fff;
}

.demo__label {
  display: block;
  margin-bottom: 20rpx;
  font-size: 26rpx;
  font-weight: 600;
  color: #606266;
}

.demo__meta {
  display: block;
  margin-top: 16rpx;
  font-size: 22rpx;
  color: #909193;
}

.demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 24rpx;
}

.demo__card {
  margin-top: 20rpx;
}

.type-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin: 24rpx 0 16rpx;
}

.field-block {
  margin-bottom: 8rpx;
}

.field-block__label {
  display: block;
  margin-bottom: 12rpx;
  color: #909193;
  font-size: 24rpx;
}

.type-row__label {
  color: #909193;
  font-size: 24rpx;
}

.type-row__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
}

.type-tab {
  padding: 8rpx 20rpx;
  border-radius: 8rpx;
  background: #f2f3f5;
  color: #606266;
  font-size: 24rpx;
}

.type-tab--active {
  background: #ecf5ff;
  color: #3c9cff;
  font-weight: 600;
}

.field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 64rpx;
  padding: 0 20rpx;
  border: 1rpx solid #dcdfe6;
  border-radius: 8rpx;
  box-sizing: border-box;
}

.field__value {
  color: #303133;
  font-size: 28rpx;
}

.field__placeholder {
  color: #c0c4cc;
  font-size: 28rpx;
}

.field__arrow {
  color: #c0c4cc;
  font-size: 32rpx;
}

.record {
  color: #303133;
  font-size: 26rpx;
  line-height: 1.8;
}
</style>
