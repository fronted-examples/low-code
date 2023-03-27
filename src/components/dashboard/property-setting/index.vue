<template>
  <section class="property-setting">
    <!-- <div class="property-header">
      <el-tooltip class="item"
                  effect="dark"
                  :content="tooltipText"
                  placement="top">
        <svg-icon :icon-class="svgIconClass"
                  @click.stop="minimizeOrMaximize" />
      </el-tooltip>
    </div> -->

    <div class="property-body">
      <div class="settings-notice"
           v-if="!component">
        <p>请在左侧画布选中节点</p>
      </div>

      <el-tabs v-if="component"
               v-model="tabName"
               @tab-click="selectTab"
               stretch>
        <el-tab-pane v-for="(item, index) of tabList"
                     :key="index"
                     :label="item.label"
                     :name="item.name">
          <el-form>
            <el-form-item v-for="(option, index) of item.options"
                          :key="index">
              <label>{{option.label}}</label>
              <el-input v-if="option.type === 'text'"
                        v-model="option.value"
                        :placeholder="option.placeholder"
                        size="small"></el-input>
              <el-input-number v-if="option.type === 'number'"
                               v-model="option.value"
                               size="small"></el-input-number>

              <el-select v-if="option.type === 'event'"
                         v-model="eventType"
                         @change="selectEventType"
                         placeholder="新建事件">
                <el-option v-for="(event, index) of option.supportEvents"
                           :key="index"
                           :label="event"
                           :value="event"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :title="eventType"
               :visible.sync="visible"
               :close-on-click-modal="false"
               append-to-body
               width="800px">
      <ace v-model="event"
           theme="kuroir" />
      <div slot="footer">
        <el-button type="primary"
                   @click="test">测试</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import { styleMap } from '@/utils/style'
export default {
  name: 'PropertySetting',
  props: {
    component: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tabName: 'property',
      tabList: [{
        label: '属性',
        name: 'property'
      }, {
        label: '样式',
        name: 'style'
      }, {
        label: '高级',
        name: 'advanced'
      }],
      position: {
        top: 0,
        left: 0
      },
      direction: 'left-bottom',
      visible: false,
      eventType: '',
      event: '',
      tooltipText: '最小化',
      svgIconClass: 'minimize',
      minimized: false
    }
  },
  computed: {
    STYLE_MAP () {
      return styleMap
    }
  },
  watch: {
    component (newValue) {
      console.log('newValue: ', newValue)
      this.tabList.forEach((tab) => {
        if (tab.name === 'property') {
          tab.options = newValue.props
        }

        if (tab.name === 'style') {
          tab.options = newValue.style
        }

        if (tab.name === 'advanced') {
          tab.options = newValue.advanced
        }
      })

      console.log('tabList: ', this.tabList)
    }
  },
  methods: {
    // minimizeOrMaximize () {
    //   const modal = document.querySelector('.property-setting')
    //   const modalHeader = document.querySelector('.property-header')
    //   const modalBody = document.querySelector('.property-body')

    //   if (!this.minimized) {
    //     modal.style.width = '80px'
    //     modal.style.height = '48px'
    //     modal.style.transition = 'width .3s, height .3s'
    //     modalBody.style.display = 'none'
    //     this.svgIconClass = 'maximize'
    //     this.tooltipText = '最大化'
    //     this.minimized = true
    //   } else {
    //     modal.style.width = '266px'
    //     modal.style.height = '500px'
    //     modal.style.transition = 'width .3s, height .3s'
    //     modalHeader.style.display = 'flex'
    //     modalBody.style.display = 'block'
    //     this.svgIconClass = 'minimize'
    //     this.tooltipText = '最小化'
    //     this.minimized = false
    //   }
    // },
    selectTab (tab, event) {
      console.log(tab, event)
    },
    selectEventType (item) {
      console.log(item)
      this.visible = true
    },
    test () {
      console.log(this.event)
      this.funcStrParse(this.event)()
    },
    funcStrParse (funcStr) {
      // eslint-disable-next-line no-new-func
      return Function("'use strict';return (" + funcStr + ')')()
    }
  }
}
</script>

<style lang="scss" scoped>
.property-setting {
  width: 266px;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  .property-header {
    height: 48px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    padding: 0 20px;
    .svg-icon {
      cursor: pointer;
    }
  }

  .property-body {
    .settings-notice {
      text-align: center;
      font-size: 12px;
      font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial, sans-serif;
      color: rgba(0, 0, 0, 0.6);
      padding: 50px 15px 0;

      p {
        margin: 0;
        font-size: 14px;
      }
    }
    .el-tabs {
      padding: 0 20px;
      height: 100%;
    }
  }
}
</style>
