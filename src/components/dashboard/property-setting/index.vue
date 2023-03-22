<template>
  <section class="property-setting"
           @mousedown="startMove"
           @mouseup="stopMove">
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
            <label>{{option}}</label>
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
      }]
    }
  },
  computed: {
    STYLE_MAP () {
      return styleMap
    }
  },
  watch: {
    component (newValue) {
      console.log(newValue)
      this.tabList.forEach((tab) => {
        if (tab.name === 'property') {
          // tab.options = newValue.props
          tab.options = this.jsonToJsArray(newValue.props)
        }

        if (tab.name === 'style') {
          // tab.options = newValue.style
          tab.options = this.jsonToJsArray(newValue.style)
        }

        if (tab.name === 'advanced') {
          // tab.options = newValue.advanced
          tab.options = this.jsonToJsArray(newValue.advanced)
        }
      })

      console.log('tabList: ', this.tabList)
      // let jsonString = {
      //   position: {
      //     top: 133,
      //     left: 602,
      //     zIndex: 1
      //   }
      // }
      // let jsonString = {
      //   placeholder: '输入框'
      // }
      // console.log(this.jsonToJsArray(jsonString))
    }
  },
  methods: {
    startMove (e) {
      let box = document.querySelector('.property-setting')
      // e.pageX, e.pageY 是鼠标在页面上的坐标
      // box.offsetLeft, box.offsetTop 是元素相对于页面左上角的偏移位置
      // disx, disy 便是鼠标相对于元素左上角的偏移位置
      let disx = e.pageX - box.offsetLeft
      let disy = e.pageY - box.offsetTop

      // document.documentElement.clientWidth: 浏览器页面可用宽度
      // document.documentElement.clientHeight: 浏览器页面可用高度

      document.onmousemove = function (e) { // 鼠标移动的时候计算元素的位置
        let x, y
        // e.pageX - disx  鼠标在页面上的位置 - 鼠标在元素中的偏移位置  得到的是元素相对于页面左上角的偏移位置
        if ((e.pageX - disx) > 0) { // 元素相对于页面左上角的偏移位置 大于0时
          if ((e.pageX - disx) > document.documentElement.clientWidth - 60) { // 元素相对于页面左上角的偏移位置 移出到页面以外（右侧）
            x = document.documentElement.clientWidth - 60 // 60是元素自身的宽高
          } else {
            x = e.pageX - disx
          }
        } else { // 元素移到到页面以外（左侧）
          x = 0
        }

        if ((e.pageY - disy) > 0) {
          if ((e.pageY - disy) > document.documentElement.clientHeight - 60) { // 元素移动到页面以外（底部）
            y = document.documentElement.clientHeight - 60
          } else {
            y = e.pageY - disy
          }
        } else { // 元素移动到页面以外（顶部）
          y = 0
        }

        box.style.left = x + 'px'
        box.style.top = y + 'px'
      }
    },
    stopMove (e) {
      document.onmousemove = document.onmouseup = null
    },
    selectTab (tab, event) {
      console.log(tab, event)
    },
    jsonToJsArray (jsonString, params = [], object) {
      // console.log(Object.keys(jsonString))
      // const keys = Object.keys(jsonString)

      // for (let i = 0; i < keys.length; i++) {
      //   console.log(jsonString[keys[i]])

      //   if (Object.prototype.toString.call(jsonString[keys[i]]) !== '[object Object]') {
      //     const param = {
      //       label: keys[i],
      //       value: jsonString[keys[i]]
      //     }

      //     if (Object.prototype.toString.call(object) === '[object Object]' && Object.keys(object).length === 0) {
      //       console.log('空 object： ', object)
      //       params.push(param)
      //     }

      //     // if (Object.prototype.toString.call(object) === '[object Object]' && Object.keys(object).length !== 0) {
      //     //   object.value = { ...param }
      //     //   params.push(object)
      //     // }
      //   }

      //   if (Object.prototype.toString.call(jsonString[keys[i]]) === '[object Object]') {
      //     object.label = keys[i]

      //     this.jsonToJsArray(jsonString[keys[i]], params, object)
      //   }
      // }

      for (let key in jsonString) {
        if (Object.prototype.toString.call(jsonString[key]) !== '[object Object]') {
          const param = {
            label: key,
            value: jsonString[key]
          }

          if (!object) {
            params.push(param)
          } else {
            object.value.push(param)
            // console.log('object: ', object)
          }
        }

        if (Object.prototype.toString.call(jsonString[key]) === '[object Object]' && Object.keys(jsonString[key]).length !== 0) {
          let object = {
            label: key
          }

          for (let iKey in jsonString[key]) {
            if (Object.prototype.toString.call(jsonString[key][iKey]) === '[object Object]' && Object.keys(jsonString[key][iKey]).length !== 0) {
              object.value = {}
            } else {
              object.value = []
            }
          }

          this.jsonToJsArray(jsonString[key], params, object)
        }
      }

      if (object) {
        params.push(object)
      }

      console.log(params)

      return params
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
  z-index: 820;
  cursor: move;
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
