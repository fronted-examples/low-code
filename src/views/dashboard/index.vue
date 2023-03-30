<template>
  <section class="dashboard">
    <section class="dashboard-header">
      <el-button @click="preview"
                 size="mini">预览</el-button>
      <el-button type="primary"
                 size="mini">保存</el-button>
    </section>

    <section class="dashboard-body">
      <component-library :component-list="components"
                         @dragItemStart="dragItemStart" />
      <canvas-container :component="component"
                        @selectComponent="selectComponent" />
      <property-setting :component="component" />
    </section>

    <preview-page :visible.sync="prePageVisible">
      <div class="page-content"
           ref="pageContent"
           style="position: relative;"
           :style="{minWidth: page.style.minWidth.value + 'px', minHeight: page.style.minHeight.value + 'px', backgroundColor: page.style.backgroundColor.value}">
        <recursion-component :list="page.children"
                             disabled></recursion-component>
      </div>
    </preview-page>
  </section>
</template>

<script>
import CanvasContainer from '@/components/canvas-container'
import ComponentLibrary from '@/components/component-library'
import PropertySetting from '@/components/property-setting'

import RecursionComponent from '@/components/recursion-component'
import PreviewPage from '@/components/preview-page'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: {
    CanvasContainer,
    ComponentLibrary,
    PropertySetting,
    RecursionComponent,
    PreviewPage
  },
  data () {
    return {
      components: [{
        code: 'InputComponent',
        name: '输入框',
        icon: 'input',
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
        advanced: {}
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
      prePageVisible: false,
      component: null,
      content: ''
    }
  },
  computed: {
    ...mapGetters('appModule', ['page'])
  },
  created () {
    this.createPage({
      id: `page_${new Date().getTime()}`,
      name: 'pageOne',
      style: {
        minWidth: {
          type: 'number',
          label: '最小宽度',
          value: 1200,
          required: false,
          unit: 'px'
        },
        minHeight: {
          type: 'number',
          label: '最小高度',
          value: 1200,
          required: false,
          unit: 'px'
        },
        backgroundColor: {
          type: 'color',
          label: '背景色',
          value: '#fff',
          required: false,
          unit: ''
        }
      }
    })
  },
  methods: {
    ...mapActions({
      createPage: 'appModule/createPage'
    }),
    dragItemStart (item) {
      this.component = item
    },
    selectComponent (item) {
      this.component = item
    },
    preview () {
      this.prePageVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  .dashboard-header {
    height: 52px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
  .dashboard-body {
    display: flex;
    justify-content: space-between;
    height: calc(100vh - 52px);
  }
}
</style>
