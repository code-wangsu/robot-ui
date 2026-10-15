import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import RbImage from '../src/image/rb-image.vue'
import RbVideo from '../src/video/rb-video.vue'
import RbUpload from '../src/upload/rb-upload.vue'
import type { UploadFileItem } from '../src/upload/rb-upload.vue'

const previewImage = vi.fn()
const chooseImage = vi.fn()
const chooseVideo = vi.fn()
const uploadFile = vi.fn()

beforeEach(() => {
  previewImage.mockReset()
  chooseImage.mockReset()
  chooseVideo.mockReset()
  uploadFile.mockReset()

  ;(globalThis as any).uni = {
    previewImage,
    chooseImage,
    chooseVideo,
    uploadFile,
    createVideoContext: () => ({
      play: vi.fn(),
      pause: vi.fn(),
      stop: vi.fn(),
      seek: vi.fn(),
      requestFullScreen: vi.fn(),
      exitFullScreen: vi.fn(),
    }),
  }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RbImage', () => {
  it('配置 previewSrcList 后点击打开自定义预览器', async () => {
    const list = ['a.jpg', 'b.jpg']
    const wrapper = mount(RbImage, {
      props: {
        src: 'a.jpg',
        previewSrcList: list,
        initialIndex: 0,
        showLoading: false,
      },
      global: {
        stubs: {
          RbImageViewer: {
            props: ['show', 'urlList'],
            emits: ['update:show', 'switch', 'close'],
            template: '<div v-if="show" class="viewer-stub" />',
          },
        },
      },
    })

    await wrapper.trigger('click')
    await nextTick()
    expect(wrapper.find('.viewer-stub').exists()).toBe(true)
    expect(wrapper.emitted('show')).toBeTruthy()
    expect(previewImage).not.toHaveBeenCalled()
  })

  it('nativePreview 时走 uni.previewImage', async () => {
    const list = ['a.jpg', 'b.jpg']
    const wrapper = mount(RbImage, {
      props: {
        src: 'a.jpg',
        previewSrcList: list,
        nativePreview: true,
        showLoading: false,
      },
      global: {
        stubs: { RbImageViewer: true },
      },
    })

    await wrapper.trigger('click')
    expect(previewImage).toHaveBeenCalledWith({
      urls: list,
      current: 'a.jpg',
    })
  })

  it('未配置 previewSrcList 时不预览', async () => {
    const wrapper = mount(RbImage, {
      props: { src: 'a.jpg', showLoading: false },
      global: { stubs: { RbImageViewer: true } },
    })
    await wrapper.trigger('click')
    expect(previewImage).not.toHaveBeenCalled()
  })
})

describe('RbImageViewer', () => {
  it('多图可左右切换', async () => {
    const RbImageViewer = (await import('../src/image-viewer/rb-image-viewer.vue')).default
    const show = ref(true)
    const index = ref(0)
    const wrapper = mount(RbImageViewer, {
      props: {
        show: true,
        urlList: ['a.jpg', 'b.jpg', 'c.jpg'],
        initialIndex: 0,
        index: index.value,
        'onUpdate:index': (v: number) => {
          index.value = v
          wrapper.setProps({ index: v })
        },
        'onUpdate:show': (v: boolean) => {
          show.value = v
        },
      },
      global: {
        stubs: {
          RbPopup: {
            props: ['show'],
            template: '<div v-if="show" class="popup"><slot /></div>',
          },
          RbButton: {
            props: ['text'],
            emits: ['click'],
            template: '<button class="btn" @click="$emit(\'click\')">{{ text }}</button>',
          },
        },
      },
    })

    expect(wrapper.text()).toContain('1 / 3')
    const navs = wrapper.findAll('.rb-image-viewer__nav')
    expect(navs.length).toBe(2)
    await navs[1].trigger('click')
    expect(index.value).toBe(1)
    await navs[0].trigger('click')
    expect(index.value).toBe(0)
  })
})

describe('RbVideo', () => {
  it('渲染 video 并透传 src', () => {
    const wrapper = mount(RbVideo, {
      props: {
        src: 'demo.mp4',
        poster: 'poster.jpg',
        objectFit: 'cover',
      },
    })
    const video = wrapper.find('video')
    expect(video.exists()).toBe(true)
    expect(video.attributes('src')).toBe('demo.mp4')
  })
})

describe('RbUpload', () => {
  it('chooseImage 选图后更新 fileList（无 action 不上传）', async () => {
    chooseImage.mockImplementation((opts: any) => {
      opts.success({
        tempFilePaths: ['tmp://1.jpg'],
        tempFiles: [{ path: 'tmp://1.jpg', size: 1024, name: '1.jpg' }],
      })
    })

    const fileList = ref<UploadFileItem[]>([])
    const wrapper = mount(RbUpload, {
      props: {
        fileList: fileList.value,
        autoUpload: false,
        'onUpdate:fileList': (list: UploadFileItem[]) => {
          fileList.value = list
          wrapper.setProps({ fileList: list })
        },
      },
    })

    await wrapper.find('.rb-upload__trigger').trigger('click')
    await nextTick()

    expect(chooseImage).toHaveBeenCalled()
    expect(fileList.value).toHaveLength(1)
    expect(fileList.value[0].path).toBe('tmp://1.jpg')
    expect(uploadFile).not.toHaveBeenCalled()
  })

  it('配置 action 后走 uni.uploadFile', async () => {
    chooseImage.mockImplementation((opts: any) => {
      opts.success({
        tempFilePaths: ['tmp://2.jpg'],
        tempFiles: [{ path: 'tmp://2.jpg', size: 2048, name: '2.jpg' }],
      })
    })

    const task = {
      onProgressUpdate: vi.fn((cb: (e: { progress: number }) => void) => {
        cb({ progress: 50 })
      }),
      abort: vi.fn(),
    }

    uploadFile.mockImplementation((opts: any) => {
      opts.success({
        statusCode: 200,
        data: JSON.stringify({ url: 'https://cdn.example.com/2.jpg' }),
      })
      return task
    })

    const fileList = ref<UploadFileItem[]>([])
    const wrapper = mount(RbUpload, {
      props: {
        fileList: fileList.value,
        action: 'https://api.example.com/upload',
        name: 'file',
        headers: { Authorization: 'Bearer x' },
        data: { biz: 'demo' },
        autoUpload: true,
        'onUpdate:fileList': (list: UploadFileItem[]) => {
          fileList.value = list
          wrapper.setProps({ fileList: list })
        },
      },
    })

    await wrapper.find('.rb-upload__trigger').trigger('click')
    await nextTick()
    await nextTick()

    expect(uploadFile).toHaveBeenCalled()
    const arg = uploadFile.mock.calls[0][0]
    expect(arg.url).toBe('https://api.example.com/upload')
    expect(arg.filePath).toBe('tmp://2.jpg')
    expect(arg.name).toBe('file')
    expect(arg.header).toEqual({ Authorization: 'Bearer x' })
    expect(arg.formData.biz).toBe('demo')
    expect(fileList.value[0].status).toBe('success')
    expect(fileList.value[0].url).toBe('https://cdn.example.com/2.jpg')
  })

  it('点击已上传图片可预览', async () => {
    const wrapper = mount(RbUpload, {
      props: {
        fileList: [{ uid: '1', url: 'https://a.jpg', status: 'success' }],
        autoUpload: false,
      },
    })

    await wrapper.find('.rb-upload__image').trigger('click')
    expect(previewImage).toHaveBeenCalled()
  })
})
