<template>
  <section class="component-library"
           @dragstart="startMove"
           @dragend="stopMove"
           v-if="libraryVisible"
           draggable>
    <div class="header">
      <span class="header-title">组件库</span>
      <svg-icon icon-class="close"
                @click.stop="closeLibrary"></svg-icon>
    </div>
    <span class="component-item"
          v-for="(item, index) of componentList"
          :key="index"
          draggable
          @dragstart.stop="e => dragstart(e, item)"
          @dragend.stop="dragend">
      <svg-icon :icon-class="item.icon" />
      <span class="component-title">
        {{ item.name }}</span>
    </span>
  </section>
</template>

<script>
export default {
  name: 'ComponentLibrary',
  props: {
    componentList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      libraryVisible: true
    }
  },
  methods: {
    closeLibrary () {
      this.libraryVisible = false
    },
    startMove (e) {
      const container = document.querySelector('.component-library')
      // e.pageX, e.pageY 是鼠标在页面上的坐标
      // box.offsetLeft, box.offsetTop 是元素相对于页面左上角的偏移位置
      // disx, disy 便是鼠标相对于元素左上角的偏移位置
      let disx = e.pageX - container.offsetLeft
      let disy = e.pageY - container.offsetTop

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

        container.style.left = x + 'px'
        container.style.top = y + 'px'
      }
    },
    stopMove () {
      document.onmousemove = document.onmouseup = null
    },
    dragstart (e, item) {
      // this.dragItem = item
      // // 设置元素的放置行为——移动
      // this.$refs.targetContent.addEventListener('dragenter', this.dragenter)
      // // 在目标元素经过 必须要阻止默认行为 否则不能触发drop
      // this.$refs.targetContent.addEventListener('dragover', this.dragover)
      // // 离开目标元素时设置元素的放置行为——不能拖放
      // this.$refs.targetContent.addEventListener('dragleave', this.dragleave)
      // // 拖动元素在目标元素松手时添加元素到画布
      // this.$refs.targetContent.addEventListener('drop', this.drop)
    },
    dragend (e) {
      // this.$refs.targetContent.removeEventListener('dragenter', this.dragenter)
      // this.$refs.targetContent.removeEventListener('dragover', this.dragover)
      // this.$refs.targetContent.removeEventListener('dragleave', this.dragleave)
      // this.$refs.targetContent.removeEventListener('drop', this.drop)
    },
    dragenter (e) {
      e.dataTransfer.dropEffect = 'move'
    },
    dragover (e) {
      e.preventDefault()
    },
    dragleave (e) {
      e.dataTransfer.dropEffect = 'none'
    },
    drop (e) {
      const { code } = this.dragItem
      this.list2.push({
        top: e.offsetY,
        left: e.offsetX,
        zIndex: 1,
        code: code,
        id: Date.parse(new Date())
      })
      this.dragItem = null
    }
  }
}
</script>

<style lang="scss" scoped>
.component-library {
  width: 266px;
  height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.15);
  position: absolute;
  z-index: 820;
  .header {
    height: 48px;
    font-size: 16px;
    padding: 0 15px;
    color: #0f1726;
    font-weight: 700;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .svg-icon {
      cursor: pointer;
    }
  }
  .component-item {
    box-sizing: border-box;
    border: 1px solid #e5e6e8;
    border-radius: 6px;
    width: 117px;
    height: 36px;

    padding: 0 8px;
    margin: 8px 0 0 8px;
    background: #fff;

    cursor: grab;

    display: inline-flex;
    align-items: center;

    .svg-icon {
      fill: rgba(31, 56, 88, 0.4);
      width: 14px;
      height: 100%;
      margin-right: 8px;
    }

    .component-title {
      font-size: 12px;
      color: #171a1d;
      letter-spacing: 0;
      line-height: 18px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
