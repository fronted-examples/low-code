<template>
  <section class="dashboard">
    <component-library :component-list="components" />
    <canvas-container />
    <property-setting />
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
        props: {}
      }, {
        code: 'Textarea',
        name: '多行输入框',
        icon: 'textarea',
        props: {}
      }, {
        code: 'Button',
        name: '按钮',
        icon: 'button',
        props: {}
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>