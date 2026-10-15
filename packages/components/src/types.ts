export type RbType = 'primary' | 'success' | 'warning' | 'error' | 'info'
/** @deprecated 优先使用 RbButtonSize；medium 等同 default */
export type RbSize = 'mini' | 'small' | 'medium' | 'default' | 'large'

export interface RbComponentProps {
  customStyle?: string | Record<string, string | number>
  customClass?: string
}
