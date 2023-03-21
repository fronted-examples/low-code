<template>
  <section class="canvas-container"
           ref="canvasContainer">
    <div v-if="!componentList.length"
         class="container-placeholder">拖拽组件或模板到这里</div>
    <div class="item"
         v-for="item in componentList"
         :key="item.id"
         :ref="item.id"
         :style="{
          top: `${item.top - 16}px`,
          left: `${item.left - 85}px`,
          'z-index': `${item.zIndex}`
        }"
         @mousedown="e => moveItem(e, item)">
      <template v-if="item.code === 'Input'">
        <el-input></el-input>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CanvasContainer',
  props: {
    component: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      componentList: [],
      currentMoveItem: null
    }
  },
  mounted () {
    this.addDrag()
  },
  methods: {
    addDrag () {
      // 设置元素的放置行为——移动
      this.$refs.canvasContainer.addEventListener('dragenter', this.dragenter)
      // 在目标元素经过 必须要阻止默认行为 否则不能触发drop
      this.$refs.canvasContainer.addEventListener('dragover', this.dragover)
      // 离开目标元素时设置元素的放置行为——不能拖放
      this.$refs.canvasContainer.addEventListener('dragleave', this.dragleave)
      // 拖动元素在目标元素松手时添加元素到画布
      this.$refs.canvasContainer.addEventListener('drop', this.drop)
    },
    removeDrag () {
      this.$refs.canvasContainer.removeEventListener('dragenter', this.dragenter)
      this.$refs.canvasContainer.removeEventListener('dragover', this.dragover)
      this.$refs.canvasContainer.removeEventListener('dragleave', this.dragleave)
      this.$refs.canvasContainer.removeEventListener('drop', this.drop)
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
      const { code } = this.component
      this.componentList.push({
        top: e.offsetY,
        left: e.offsetX,
        zIndex: 1,
        code: code,
        id: `${code}_${Date.parse(new Date())}`
      })

      console.log('this.componentList: ', this.componentList)
    },
    moveItem (e, item) {
      this.currentMoveItem = item
      document.addEventListener('mousemove', this.mousemove)
      document.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      const { clientX, clientY } = e
      let moveIdx
      this.componentList.forEach((item, index) => {
        if (item.id === this.currentMoveItem.id) {
          moveIdx = index
        }
      })

      this.componentList[moveIdx].top = clientY
      this.componentList[moveIdx].left = clientX
    },
    mouseup (e) {
      document.removeEventListener('mousemove', this.mousemove)
      document.removeEventListener('mouseup', this.mouseup)
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-container {
  min-width: 1200px;
  min-height: 560px;
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
  .container-placeholder {
    min-height: 60px;
    height: 520px;
    width: 100%;
    background-color: #f0f0f0;
    border: 1px dotted;
    color: #a7b1bd;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .item {
    position: absolute;
  }
}
</style>
