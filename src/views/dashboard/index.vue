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
        props: {
          placeholder: '输入框'
        },
        style: {
          position: {
            top: 0,
            left: 0
          },
          width: 100,
          height: 20
        },
        advanced: {}
      }, {
        code: 'Textarea',
        name: '多行输入框',
        icon: 'textarea',
        props: {},
        style: {
          position: {
            top: 0,
            left: 0
          }
        },
        advanced: {}
      }, {
        code: 'Button',
        name: '按钮',
        icon: 'button',
        props: {},
        style: {
          position: {
            top: 0,
            left: 0
          }
        },
        advanced: {}
      }],
      component: null
    }
  },
  methods: {
    dragItemStart (item) {
      console.log('item: ', item)
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
