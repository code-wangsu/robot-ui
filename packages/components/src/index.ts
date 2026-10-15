import type { App, Component } from 'vue'
import RbButton from './button/rb-button.vue'
import RbIcon from './icon/rb-icon.vue'
import RbLoading from './loading/rb-loading.vue'
import RbEmpty from './empty/rb-empty.vue'
import RbCell from './cell/rb-cell.vue'
import RbCellGroup from './cell-group/rb-cell-group.vue'
import RbTable from './table/rb-table.vue'
import RbCard from './card/rb-card.vue'
import RbPagination from './pagination/rb-pagination.vue'
import RbLoadmore from './loadmore/rb-loadmore.vue'
import RbPullRefresh from './pull-refresh/rb-pull-refresh.vue'
import RbVirtualList from './virtual-list/rb-virtual-list.vue'
import RbList from './list/rb-list.vue'
import RbListItem from './list-item/rb-list-item.vue'
import RbLineProgress from './line-progress/rb-line-progress.vue'
import RbCountDown from './count-down/rb-count-down.vue'
import RbCountTo from './count-to/rb-count-to.vue'
import RbOverlay from './overlay/rb-overlay.vue'
import RbTransition from './transition/rb-transition.vue'
import RbPopup from './popup/rb-popup.vue'
import RbRootPortal from './root-portal/rb-root-portal.vue'
import RbModal from './modal/rb-modal.vue'
import RbActionSheet from './action-sheet/rb-action-sheet.vue'
import RbToast from './toast/rb-toast.vue'
import RbAlert from './alert/rb-alert.vue'
import RbNoticeBar from './notice-bar/rb-notice-bar.vue'
import RbNotify from './notify/rb-notify.vue'
import RbTooltip from './tooltip/rb-tooltip.vue'
import RbSwipeAction from './swipe-action/rb-swipe-action.vue'
import RbSwipeActionItem from './swipe-action-item/rb-swipe-action-item.vue'
import RbCollapse from './collapse/rb-collapse.vue'
import RbCollapseItem from './collapse-item/rb-collapse-item.vue'
import RbScrollList from './scroll-list/rb-scroll-list.vue'
import RbLine from './line/rb-line.vue'
import RbNoNetwork from './no-network/rb-no-network.vue'
import RbGrid from './grid/rb-grid.vue'
import RbGridItem from './grid-item/rb-grid-item.vue'
import RbSwiper from './swiper/rb-swiper.vue'
import RbSkeleton from './skeleton/rb-skeleton.vue'
import RbSticky from './sticky/rb-sticky.vue'
import RbDivider from './divider/rb-divider.vue'
import RbGap from './gap/rb-gap.vue'
import RbTabbar from './tabbar/rb-tabbar.vue'
import RbTabbarItem from './tabbar-item/rb-tabbar-item.vue'
import RbBackTop from './back-top/rb-back-top.vue'
import RbNavbar from './navbar/rb-navbar.vue'
import RbTabs from './tabs/rb-tabs.vue'
import RbSubsection from './subsection/rb-subsection.vue'
import RbIndexList from './index-list/rb-index-list.vue'
import RbIndexAnchor from './index-anchor/rb-index-anchor.vue'
import RbSteps from './steps/rb-steps.vue'
import RbStepsItem from './steps-item/rb-steps-item.vue'
import RbParse from './parse/rb-parse.vue'
import RbReadMore from './read-more/rb-read-more.vue'
import RbAvatar from './avatar/rb-avatar.vue'
import RbAvatarGroup from './avatar-group/rb-avatar-group.vue'
import RbLink from './link/rb-link.vue'
import RbStatusBar from './status-bar/rb-status-bar.vue'
import RbSafeBottom from './safe-bottom/rb-safe-bottom.vue'
import RbForm from './form/rb-form.vue'
import RbFormItem from './form-item/rb-form-item.vue'
import RbInput from './input/rb-input.vue'
import RbTextarea from './textarea/rb-textarea.vue'
import RbCheckbox from './checkbox/rb-checkbox.vue'
import RbCheckboxGroup from './checkbox-group/rb-checkbox-group.vue'
import RbRadio from './radio/rb-radio.vue'
import RbRadioGroup from './radio-group/rb-radio-group.vue'
import RbSwitch from './switch/rb-switch.vue'
import RbSlider from './slider/rb-slider.vue'
import RbRate from './rate/rb-rate.vue'
import RbSearch from './search/rb-search.vue'
import RbNumberBox from './number-box/rb-number-box.vue'
import RbUpload from './upload/rb-upload.vue'
import RbVideo from './video/rb-video.vue'
import RbCode from './code/rb-code.vue'
import RbCodeInput from './code-input/rb-code-input.vue'
import RbPicker from './picker/rb-picker.vue'
import RbDatetimePicker from './datetime-picker/rb-datetime-picker.vue'
import RbDatetimePanel from './datetime-panel/rb-datetime-panel.vue'
import RbDatePicker from './date-picker/rb-date-picker.vue'
import RbCalendar from './calendar/rb-calendar.vue'
import RbKeyboard from './keyboard/rb-keyboard.vue'
import RbAlbum from './album/rb-album.vue'
import RbImage from './image/rb-image.vue'
import RbImageViewer from './image-viewer/rb-image-viewer.vue'
import RbText from './text/rb-text.vue'
import RbRow from './row/rb-row.vue'
import RbCol from './col/rb-col.vue'
import RbColor from './color/rb-color.vue'
import RbLayout from './layout/rb-layout.vue'
import RbScroll from './scroll/rb-scroll.vue'
import RbBadge from './badge/rb-badge.vue'
import RbTag from './tag/rb-tag.vue'
import RbLoadingIcon from './loading-icon/rb-loading-icon.vue'
import RbLoadingPage from './loading-page/rb-loading-page.vue'
import RbSoftKeyboard from './soft-keyboard/rb-soft-keyboard.vue'
import RbSoftKeyboardInput from './soft-keyboard-input/rb-soft-keyboard-input.vue'
import RbSystemKeyboardInput from './system-keyboard-input/rb-system-keyboard-input.vue'
import RbAppDialog from './app-dialog/rb-app-dialog.vue'
import RbAppTag from './app-tag/rb-app-tag.vue'
import RbEmptyState from './empty-state/rb-empty-state.vue'
import RbIconFont from './icon-font/rb-icon-font.vue'
import RbFooterBack from './footer-back/rb-footer-back.vue'
import RbPageFooter from './page-footer/rb-page-footer.vue'
import RbMultiSelect from './multi-select/rb-multi-select.vue'

export {
  RbButton,
  RbIcon,
  RbLoading,
  RbEmpty,
  RbCell,
  RbCellGroup,
  RbTable,
  RbCard,
  RbPagination,
  RbLoadmore,
  RbPullRefresh,
  RbVirtualList,
  RbList,
  RbListItem,
  RbLineProgress,
  RbCountDown,
  RbCountTo,
  RbOverlay,
  RbTransition,
  RbPopup,
  RbRootPortal,
  RbModal,
  RbActionSheet,
  RbToast,
  RbAlert,
  RbNoticeBar,
  RbNotify,
  RbTooltip,
  RbSwipeAction,
  RbSwipeActionItem,
  RbCollapse,
  RbCollapseItem,
  RbScrollList,
  RbLine,
  RbNoNetwork,
  RbGrid,
  RbGridItem,
  RbSwiper,
  RbSkeleton,
  RbSticky,
  RbDivider,
  RbGap,
  RbTabbar,
  RbTabbarItem,
  RbBackTop,
  RbNavbar,
  RbTabs,
  RbSubsection,
  RbIndexList,
  RbIndexAnchor,
  RbSteps,
  RbStepsItem,
  RbParse,
  RbReadMore,
  RbAvatar,
  RbAvatarGroup,
  RbLink,
  RbStatusBar,
  RbSafeBottom,
  RbForm,
  RbFormItem,
  RbInput,
  RbTextarea,
  RbCheckbox,
  RbCheckboxGroup,
  RbRadio,
  RbRadioGroup,
  RbSwitch,
  RbSlider,
  RbRate,
  RbSearch,
  RbNumberBox,
  RbUpload,
  RbVideo,
  RbCode,
  RbCodeInput,
  RbPicker,
  RbDatetimePicker,
  RbDatetimePanel,
  RbDatePicker,
  RbCalendar,
  RbKeyboard,
  RbAlbum,
  RbImage,
  RbImageViewer,
  RbText,
  RbRow,
  RbCol,
  RbColor,
  RbLayout,
  RbScroll,
  RbBadge,
  RbTag,
  RbLoadingIcon,
  RbLoadingPage,
  RbSoftKeyboard,
  RbSoftKeyboardInput,
  RbSystemKeyboardInput,
  RbAppDialog,
  RbAppTag,
  RbEmptyState,
  RbIconFont,
  RbFooterBack,
  RbPageFooter,
  RbMultiSelect,
}

export type { RbTableColumn, RbTableSortState, SortOrder } from './table/types'
export type { RbTableColumnType, RbTableRowKey, RbTableSize } from './table/types'
export type { RbCardType } from './card/rb-card.vue'
export type { RbCollapseName, RbCollapseModelValue } from './collapse/rb-collapse.vue'
export type { RbIconName, RbIconMeta } from '@robot-ui/assets'
export type { RbPaginationSize, RbPaginationLayout } from './pagination/rb-pagination.vue'
export {
  iconList,
  iconNames,
  iconNameSet,
  ICON_PREFIX,
  ICON_FONT_FAMILY,
} from '@robot-ui/assets'

export type { LoadmoreStatus } from './loadmore/rb-loadmore.vue'
export type { RbType, RbSize } from './types'
export type { RbButtonSize } from './button/rb-button.vue'
export type { RbTagType, RbTagEffect, RbTagSize } from './tag/rb-tag.vue'
export type { ActionSheetItem } from './action-sheet/rb-action-sheet.vue'
export type { SwipeActionButton } from './swipe-action-item/rb-swipe-action-item.vue'
export type { TabItem } from './tabs/rb-tabs.vue'
export type { SubsectionItem } from './subsection/rb-subsection.vue'
export type { PickerColumn } from './picker/rb-picker.vue'
export type { RbDatePickerType } from './date-picker/rb-date-picker.vue'
export type { RbImageFit } from './image/rb-image.vue'
export type { RbVideoObjectFit } from './video/rb-video.vue'
export type {
  UploadFileItem,
  UploadFileStatus,
  UploadListType,
  UploadAccept,
  UploadRawFile,
  UploadRequestOptions,
} from './upload/rb-upload.vue'
export type { FormRule, FormContext, FormItemExpose } from './composables/useForm'
export { showToast, hideToast, useToastState } from './toast/toast'
export type { ToastOptions, ToastType, ToastPosition } from './toast/toast'
export type { MultiSelectOption } from './multi-select/rb-multi-select.vue'
export {
  registerSoftKeyboardDismiss,
  unregisterSoftKeyboardDismiss,
  dismissActiveSoftKeyboard,
  flushActiveFormInput,
} from './composables/useSoftKeyboardDismiss'

export const components: Record<string, Component> = {
  RbButton,
  RbIcon,
  RbLoading,
  RbEmpty,
  RbCell,
  RbCellGroup,
  RbTable,
  RbCard,
  RbPagination,
  RbLoadmore,
  RbPullRefresh,
  RbVirtualList,
  RbList,
  RbListItem,
  RbLineProgress,
  RbCountDown,
  RbCountTo,
  RbOverlay,
  RbTransition,
  RbPopup,
  RbRootPortal,
  RbModal,
  RbActionSheet,
  RbToast,
  RbAlert,
  RbNoticeBar,
  RbNotify,
  RbTooltip,
  RbSwipeAction,
  RbSwipeActionItem,
  RbCollapse,
  RbCollapseItem,
  RbScrollList,
  RbLine,
  RbNoNetwork,
  RbGrid,
  RbGridItem,
  RbSwiper,
  RbSkeleton,
  RbSticky,
  RbDivider,
  RbGap,
  RbTabbar,
  RbTabbarItem,
  RbBackTop,
  RbNavbar,
  RbTabs,
  RbSubsection,
  RbIndexList,
  RbIndexAnchor,
  RbSteps,
  RbStepsItem,
  RbParse,
  RbReadMore,
  RbAvatar,
  RbAvatarGroup,
  RbLink,
  RbStatusBar,
  RbSafeBottom,
  RbForm,
  RbFormItem,
  RbInput,
  RbTextarea,
  RbCheckbox,
  RbCheckboxGroup,
  RbRadio,
  RbRadioGroup,
  RbSwitch,
  RbSlider,
  RbRate,
  RbSearch,
  RbNumberBox,
  RbUpload,
  RbVideo,
  RbCode,
  RbCodeInput,
  RbPicker,
  RbDatetimePicker,
  RbDatetimePanel,
  RbDatePicker,
  RbCalendar,
  RbKeyboard,
  RbAlbum,
  RbImage,
  RbImageViewer,
  RbText,
  RbRow,
  RbCol,
  RbColor,
  RbLayout,
  RbScroll,
  RbBadge,
  RbTag,
  RbLoadingIcon,
  RbLoadingPage,
  RbSoftKeyboard,
  RbSoftKeyboardInput,
  RbSystemKeyboardInput,
  RbAppDialog,
  RbAppTag,
  RbEmptyState,
  RbIconFont,
  RbFooterBack,
  RbPageFooter,
  RbMultiSelect,
}

export function registerComponents(app: App, prefix = 'Rb') {
  Object.entries(components).forEach(([name, component]) => {
    const tag = name.startsWith(prefix) ? name : `${prefix}${name}`
    app.component(tag, component)
  })
}

export default {
  registerComponents,
}
