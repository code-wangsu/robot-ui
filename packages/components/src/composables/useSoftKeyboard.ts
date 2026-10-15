import { computed, ref, type EmitFn } from 'vue'

const LOGIN_LETTERS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm']
const IP_LETTERS = ['qwertyuiop', '.asdfghjkl/:', 'zxcvbnm']
export const SYMBOL_TOGGLE_KEY = '符'
export const LETTER_TOGGLE_KEY = 'ABC'
export const NUMBER_TOGGLE_KEY = '123'
export const NUMBER_BACK_KEY = '返回'
const NUMBER_SYMBOL_LIST = [',', '.', '/', '|', ':', '-', '_', '@', '#', '+', '=']
const SYMBOL_ROWS = [
  [',', '.', '-', '_', '/', ':', ';', '!', '?', '+', '='],
  ['@', '#', '&', '*', '%', '$', '|', '(', ')', '[', ']'],
]

export interface SoftKeyboardProps {
  modelValue?: string
  max?: number | string
  mode?: string
  enableSymbols?: boolean
  enableNumberSymbols?: boolean
  enableSpace?: boolean
  /** 大写态图标（点击后切小写时展示） */
  largeCaseIcon?: string
  /** 小写态图标（点击后切大写时展示） */
  smallCaseIcon?: string
}

type SoftKeyboardEmit = EmitFn<{
  'update:modelValue': [value: string]
  input: [value: string]
  confirm: []
  getHeight: [height: number]
}>

/**
 * 软键盘输入逻辑：登录页与 IP 输入共用，通过 mode 区分字母行配置。
 * 从 management/composables/useSoftKeyboard 迁入。
 */
export function useSoftKeyboard(props: SoftKeyboardProps, emit: SoftKeyboardEmit) {
  const numberList = '1234567890'
  const numberSymbolList = NUMBER_SYMBOL_LIST
  const showExtraSymbols = ref(false)
  const showNumberOnly = ref(false)
  const upperCase = ref(false)

  const result = computed({
    get() {
      return props.modelValue || ''
    },
    set(val: string) {
      emit('update:modelValue', val)
      setTimeout(() => {
        emit('input', val)
      })
    },
  })

  const baseLetters = computed(() => (props.mode === 'ip' ? IP_LETTERS : LOGIN_LETTERS))
  const letterList = computed(() =>
    upperCase.value
      ? baseLetters.value.map((row) => row.toUpperCase())
      : [...baseLetters.value],
  )
  const enableSymbols = computed(() => props.enableSymbols !== false)
  const enableNumberSymbols = computed(
    () => props.enableNumberSymbols === true || enableSymbols.value,
  )
  const enableSpace = computed(() => props.enableSpace !== false)

  const caseToggleIcon = computed(() =>
    upperCase.value
      ? props.smallCaseIcon || ''
      : props.largeCaseIcon || '',
  )
  const symbolToggleKey = computed(() =>
    showExtraSymbols.value ? LETTER_TOGGLE_KEY : SYMBOL_TOGGLE_KEY,
  )
  const numberToggleKey = computed(() =>
    showNumberOnly.value ? NUMBER_BACK_KEY : NUMBER_TOGGLE_KEY,
  )
  const showNumberRow = computed(() => showNumberOnly.value || showExtraSymbols.value)
  const symbolRows = computed(() => SYMBOL_ROWS)

  function appendText(text: string) {
    const len = Number(props.max) || 200
    result.value = (result.value + text).slice(0, len)
  }

  function toggleCase() {
    upperCase.value = !upperCase.value
  }

  const btnClick = (e: { target?: { dataset?: { index?: string } } }) => {
    const clickVal = e.target?.dataset?.index
    if (clickVal === 'del') {
      result.value = result.value.slice(0, -1)
      return
    }
    if (!clickVal) return
    if (clickVal === SYMBOL_TOGGLE_KEY || clickVal === LETTER_TOGGLE_KEY) {
      if (!enableSymbols.value) return
      showExtraSymbols.value = !showExtraSymbols.value
      showNumberOnly.value = false
      return
    }
    if (clickVal === NUMBER_TOGGLE_KEY || clickVal === NUMBER_BACK_KEY) {
      showNumberOnly.value = !showNumberOnly.value
      showExtraSymbols.value = false
      return
    }
    if (!enableSpace.value && clickVal === 'space') return
    appendText(clickVal === 'space' ? ' ' : clickVal)
  }

  const longpress = () => {
    result.value = ''
  }

  const confirm = () => {
    emit('confirm')
  }

  return {
    numberList,
    numberSymbolList,
    symbolRows,
    symbolToggleKey,
    numberToggleKey,
    showExtraSymbols,
    showNumberOnly,
    showNumberRow,
    result,
    letterList,
    enableSymbols,
    enableNumberSymbols,
    enableSpace,
    upperCase,
    caseToggleIcon,
    toggleCase,
    btnClick,
    longpress,
    confirm,
  }
}
