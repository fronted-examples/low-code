<template>
  <section class="property-setting"
           @mousedown="startMove"
           @mouseup="stopMove">
    <el-tabs v-model="tabName"
             @tab-click="selectTab"
             stretch>
      <el-tab-pane v-for="(item, index) of tabList"
                   :key="index"
                   :label="item.label"
                   :name="item.name">用户管理</el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
export default {
  name: 'PropertySetting',
  data () {
    return {
      tabName: '属性',
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
  .el-tabs {
    padding: 0 20px;
    height: 100%;
  }
}
</style>
