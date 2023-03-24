<template>
  <section class="dashboard">
    <component-library :component-list="components"
                       @dragItemStart="dragItemStart" />
    <canvas-container :component="component"
                      @selectComponent="selectComponent" />
    <property-setting :component="component" />

    <ace v-model="content"
         theme="kuroir" />
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
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            name: 'placeholder',
            label: 'placeholder',
            value: '多行输入框',
            required: false
          }
        },
        style: {
          top: {
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            name: 'width',
            label: '宽度',
            value: 208,
            required: false
          },
          height: {
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
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            name: 'placeholder',
            label: 'placeholder',
            value: '多行输入框',
            required: false
          }
        },
        style: {
          top: {
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            name: 'width',
            label: '宽度',
            value: 0,
            required: false
          },
          height: {
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
            name: 'label',
            label: 'label',
            value: '标签',
            required: false
          },
          placeholder: {
            name: 'placeholder',
            label: 'placeholder',
            value: '按钮',
            required: false
          }
        },
        style: {
          top: {
            name: 'top',
            label: '顶部',
            value: 0,
            required: false
          },
          left: {
            name: 'left',
            label: '左边',
            value: 0,
            required: false
          },
          zIndex: {
            name: 'zIndex',
            label: '层级',
            value: 0,
            required: false
          },
          width: {
            name: 'width',
            label: '宽度',
            value: 0,
            required: false
          },
          height: {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
}
</style>
