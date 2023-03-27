<template>
  <section class="dashboard">
    <!-- <section class="operate">
      <el-button @click="preview">预览</el-button>
      <el-button type="primary">保存</el-button>
    </section> -->
    <component-library :component-list="components"
                       @dragItemStart="dragItemStart" />
    <canvas-container :component="component"
                      @selectComponent="selectComponent" />
    <property-setting :component="component" />
  </section>
</template>

<script>
import CanvasContainer from '@/components/dashboard/canvas-container'
import ComponentLibrary from '@/components/dashboard/component-library'
import PropertySetting from '@/components/dashboard/property-setting'

export default {
  name: 'Dashboard',
  components: {
    CanvasContainer,
    ComponentLibrary,
    PropertySetting
  },
  data () {
    return {
      components: [{
        code: 'Input',
        name: '输入框',
        icon: 'input',
        children: [],
        props: {
          label: {
            type: 'text',
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            type: 'text',
            name: 'placeholder',
            label: 'placeholder',
            value: '多行输入框',
            required: false
          },
          event: {
            type: 'event',
            name: 'event',
            label: '绑定事件',
            value: '',
            supportEvents: ['onChange', 'onFocus'],
            required: false
          }
        },
        style: {
          top: {
            type: 'number',
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            type: 'number',
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            type: 'number',
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            type: 'number',
            name: 'width',
            label: '宽度',
            value: 208,
            required: false
          },
          height: {
            type: 'number',
            name: 'height',
            label: '高度',
            value: 40,
            required: false
          }
        },
        advanced: {}
      }, {
        code: 'Textarea',
        name: '多行输入框',
        icon: 'textarea',
        props: {
          label: {
            type: 'text',
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            type: 'text',
            name: 'placeholder',
            label: 'placeholder',
            value: '多行输入框',
            required: false
          }
        },
        style: {
          top: {
            type: 'number',
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            type: 'number',
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            type: 'number',
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            type: 'number',
            name: 'width',
            label: '宽度',
            value: 0,
            required: false
          },
          height: {
            type: 'number',
            name: 'height',
            label: '高度',
            value: 0,
            required: false
          }
        },
        advanced: []
      }, {
        code: 'Button',
        name: '按钮',
        icon: 'button',
        props: {
          label: {
            type: 'text',
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            type: 'text',
            name: 'placeholder',
            label: 'placeholder',
            value: '按钮',
            required: false
          }
        },
        style: {
          top: {
            type: 'number',
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            type: 'number',
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            type: 'number',
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            type: 'number',
            name: 'width',
            label: '宽度',
            value: 0,
            required: false
          },
          height: {
            type: 'number',
            name: 'height',
            label: '高度',
            value: 0,
            required: false
          }
        },
        advanced: {}
      }],
      component: null,
      content: ''
    }
  },
  watch: {
    content (newVal) {
      console.log('ace content：', newVal)
    }
  },
  methods: {
    dragItemStart (item) {
      this.component = item
    },
    selectComponent (item) {
      this.component = item
    },
    preview () {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  justify-content: space-between;
}
</style>
