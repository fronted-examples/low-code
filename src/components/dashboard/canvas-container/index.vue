<template>
  <section class="canvas-container"
           ref="canvasContainer">
    <div v-if="!componentList.length"
         class="container-placeholder">拖拽组件或模板到这里</div>

    <div class="component-wrap"
         v-for="item in componentList"
         :key="item.id"
         :ref="item.id"
         :style="{
          top: `${item.style.position.top - 16}px`,
          left: `${item.style.position.left - 85}px`,
          'z-index': `${item.style.position.zIndex}`
        }"
         :class="[currentMoveItem && currentMoveItem.id === item.id ? 'selected' : '']"
         @mousedown="e => moveItem(e, item)">
      <span class="component-operate"
            v-if="currentMoveItem && currentMoveItem.id === item.id">
        <svg-icon icon-class="delete"
                  @mousedown.stop
                  @click.stop="deleteItem(item)" />
      </span>
      <template v-if="item.code === 'Input'">
        <el-input readonly></el-input>
      </template>

      <template v-if="item.code === 'Textarea'">
        <el-input type="textarea"
                  readonly></el-input>
      </template>

      <template v-if="item.code === 'Button'">
        <input type="button"
               disabled
               value="按钮" />
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
      const { code, props, style, advanced } = this.component

      // 不能直接进行对象赋值，浅拷贝一下
      const params = {
        code: code,
        id: `${code}_${Date.parse(new Date())}`,
        props: { ...props },
        style: { ...style },
        advanced: { ...advanced }
      }

      params.style.position = {
        ...params.style.position,
        top: e.offsetY,
        left: e.offsetX,
        zIndex: 1
      }

      this.currentMoveItem = params
      this.$emit('selectComponent', params)
      this.componentList.push(params)

      console.log('this.componentList: ', this.componentList)
    },
    deleteItem (item) {
      this.componentList.forEach((component, index) => {
        if (component.id === item.id) {
          this.componentList.splice(index, 1)
        }
      })
    },
    moveItem (e, item) {
      this.currentMoveItem = item
      this.$emit('selectComponent', item)
      e.currentTarget.addEventListener('mousemove', this.mousemove)
      e.currentTarget.addEventListener('mouseleave', this.mouseleave)
      e.currentTarget.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      const { clientX, clientY } = e
      let moveIdx
      this.componentList.forEach((item, index) => {
        if (item.id === this.currentMoveItem.id) {
          moveIdx = index
        }
      })

      this.componentList[moveIdx].style.position.top = clientY
      this.componentList[moveIdx].style.position.left = clientX
    },
    mouseleave (e) {
      e.currentTarget.removeEventListener('mousemove', this.mousemove)
      e.currentTarget.removeEventListener('mouseleave', this.mouseleave)
      e.currentTarget.removeEventListener('mouseup', this.mouseup)
    },
    mouseup (e) {
      e.currentTarget.removeEventListener('mousemove', this.mousemove)
      e.currentTarget.removeEventListener('mouseup', this.mouseup)
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

  .component-wrap {
    position: absolute;
    cursor: move;
    box-sizing: border-box;
    border: 1px solid transparent;
    &:hover {
      border-width: 1px;
      border-color: rgba(0, 137, 255, 1);
      border-style: dashed;
    }

    &.selected {
      border-width: 1px;
      border-color: rgba(0, 137, 255, 1);
      border-style: solid;
      border-radius: 4px;
    }

    .component-operate {
      display: inline-block;
      height: 20px;
      background-color: rgba(0, 137, 255, 1);
      position: absolute;
      top: -22px;
      right: 0;

      pointer-events: none;
      cursor: default;

      .svg-icon {
        color: #fff;
        cursor: pointer;
        pointer-events: auto;
      }
    }
  }
}
</style>
