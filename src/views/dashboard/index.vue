<template>
  <section class="dashboard">
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
        props: [{
          name: '标签',
          label: '输入框',
          required: false
        }, {
          name: 'placeholder',
          label: 'placeholder',
          value: '多行输入框',
          required: false
        }],
        style: [{
          name: 'top',
          label: '顶部',
          value: 0,
          required: true
        }, {
          name: 'label',
          label: '左边',
          value: 0,
          required: true
        }, {
          name: 'width',
          label: '宽度',
          value: 100,
          required: true
        }, {
          name: 'height',
          label: '高度',
          value: 20,
          required: false
        }],
        advanced: []
      }, {
        code: 'Textarea',
        name: '多行输入框',
        icon: 'textarea',
        props: [{
          name: '标签',
          label: '输入框',
          required: false
        }, {
          name: 'placeholder',
          label: 'placeholder',
          value: '多行输入框',
          required: false
        }],
        style: [{
          name: 'top',
          label: '顶部',
          value: 0,
          required: false
        }, {
          name: 'label',
          label: '左边',
          value: 0,
          required: false
        }, {
          name: 'width',
          label: '宽度',
          value: 100,
          required: true
        }, {
          name: 'height',
          label: '高度',
          value: 20,
          required: false
        }],
        advanced: []
      }, {
        code: 'Button',
        name: '按钮',
        icon: 'button',
        props: [{
          name: '标签',
          label: '输入框',
          required: false
        }, {
          name: 'placeholder',
          label: 'placeholder',
          value: '多行输入框',
          required: false
        }],
        style: [{
          name: 'top',
          label: '顶部',
          value: 0,
          required: false
        }, {
          name: 'label',
          label: '左边',
          value: 0,
          required: false
        }, {
          name: 'width',
          label: '宽度',
          value: 100,
          required: true
        }, {
          name: 'height',
          label: '高度',
          value: 20,
          required: false
        }],
        advanced: []
      }],
      component: null
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
