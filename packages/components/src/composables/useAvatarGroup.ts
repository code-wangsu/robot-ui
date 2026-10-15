import type { ComputedRef, InjectionKey } from 'vue'

export interface AvatarGroupContext {
  size: ComputedRef<string | number>
}

export const AVATAR_GROUP_KEY: InjectionKey<AvatarGroupContext> = Symbol('rbAvatarGroup')
