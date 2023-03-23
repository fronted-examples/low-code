<template>
  <section class="property-setting"
           v-drag="position">
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
            <el-input v-if="Object.prototype.toString.call(option.value) === '[object String]'"
                      v-model="option.value"
                      :placeholder="option.placeholder"></el-input>
            <el-input-number v-if="Object.prototype.toString.call(option.value) === '[object Number]'"
                             v-model="option.value"></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
      }
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
    }
  },
  methods: {
    selectTab (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.property-setting {
  width: 266px;
  height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  right: 0;
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
</style>
