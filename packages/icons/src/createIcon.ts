import { computed, defineComponent, h, type PropType } from 'vue'

function addUnit(value?: string | number, unit = 'rpx'): string {
  if (value === undefined || value === '') {
    return ''
  }
  if (typeof value === 'number' || /^-?\d+(\.\d+)?$/.test(String(value))) {
    return `${value}${unit}`
  }
  return String(value)
}

export function createRobotIcon(name: string, fontClass: string, title?: string) {
  return defineComponent({
    name,
    props: {
      size: {
        type: [String, Number] as PropType<string | number>,
        default: 32,
      },
      color: {
        type: String,
        default: '',
      },
      customClass: {
        type: String,
        default: '',
      },
      customStyle: {
        type: [String, Object] as PropType<string | Record<string, string | number>>,
        default: '',
      },
    },
    setup(props) {
      const style = computed(() => {
        if (typeof props.customStyle === 'string' && props.customStyle) {
          return props.customStyle
        }
        const base: Record<string, string | number> = {
          fontSize: addUnit(props.size),
        }
        if (props.color) {
          base.color = props.color
        }
        if (props.customStyle && typeof props.customStyle === 'object') {
          Object.assign(base, props.customStyle)
        }
        return base
      })

      return () =>
        h('span', {
          class: ['iconfont', `icon-${fontClass}`, 'rb-icons-item', props.customClass],
          style: style.value,
          title,
        })
    },
  })
}
