<script setup lang="ts">
import largeCaseIconDefault from '../assets/common/large.png'
import smallCaseIconDefault from '../assets/common/small.png'
import { useSoftKeyboard } from '../composables/useSoftKeyboard'
import { useKeyboardHeight } from '../composables/useKeyboardHeight'
import NumberRow from './number-row.vue'
import LetterRow from './letter-row.vue'
import BottomRow from './bottom-row.vue'

defineOptions({ name: 'RbSoftKeyboard' })

const props = withDefaults(
  defineProps<{
    modelValue?: string
    max?: number | string
    mode?: 'login' | 'ip' | string
    enableSymbols?: boolean
    enableNumberSymbols?: boolean
    enableSpace?: boolean
    largeCaseIcon?: string
    smallCaseIcon?: string
    labels?: {
      space?: string
      clear?: string
      confirm?: string
      back?: string
      symbol?: string
    }
  }>(),
  {
    modelValue: '',
    max: 200,
    mode: 'login',
    enableSymbols: true,
    enableNumberSymbols: false,
    enableSpace: true,
    largeCaseIcon: '',
    smallCaseIcon: '',
    labels: () => ({}),
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  getHeight: [height: number]
  input: [value: string]
  confirm: []
}>()

const keyboardProps = new Proxy(props, {
  get(target, prop, receiver) {
    if (prop === 'largeCaseIcon') {
      return target.largeCaseIcon || largeCaseIconDefault
    }
    if (prop === 'smallCaseIcon') {
      return target.smallCaseIcon || smallCaseIconDefault
    }
    return Reflect.get(target, prop, receiver)
  },
})

const {
  numberList,
  numberSymbolList,
  symbolRows,
  symbolToggleKey,
  numberToggleKey,
  showExtraSymbols,
  showNumberOnly,
  showNumberRow,
  letterList,
  enableSymbols,
  enableNumberSymbols,
  enableSpace,
  caseToggleIcon,
  toggleCase,
  btnClick,
  longpress,
  confirm,
} = useSoftKeyboard(keyboardProps, emit)

useKeyboardHeight(emit)
</script>

<template>
  <view class="keyboard keyboardContextBox" @click="btnClick">
    <NumberRow v-if="showNumberRow" :chars="numberList" @key-click="btnClick" />
    <template v-if="showNumberOnly">
      <NumberRow v-if="enableNumberSymbols" :chars="numberSymbolList" @key-click="btnClick" />
    </template>
    <template v-else-if="showExtraSymbols">
      <NumberRow :chars="symbolRows[0]!" @key-click="btnClick" />
      <NumberRow :chars="symbolRows[1]!" @key-click="btnClick" />
    </template>
    <template v-else>
      <LetterRow :chars="letterList[0]!" @key-click="btnClick" />
      <LetterRow :chars="letterList[1]!" @key-click="btnClick" />
      <LetterRow :chars="letterList[2]!" @key-click="btnClick" />
    </template>
    <BottomRow
      :enable-symbols="enableSymbols"
      :enable-space="enableSpace"
      :case-toggle-icon="caseToggleIcon"
      :symbol-toggle-key="symbolToggleKey"
      :number-toggle-key="numberToggleKey"
      :labels="labels"
      @key-click="btnClick"
      @toggle-case="toggleCase"
      @space="btnClick"
      @clear="longpress"
      @confirm="confirm"
    />
  </view>
</template>

<style lang="scss">
@use './keyboard.scss' as *;
</style>
