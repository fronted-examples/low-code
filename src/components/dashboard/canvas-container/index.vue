<template>
  <section class="canvas-container"
           ref="canvasContainer">
    <div v-if="!componentList.length"
         class="container-placeholder">拖拽组件或模板到这里</div>

    <div class="component-wrap"
         v-for="item in componentList"
         :id="item.id"
         :key="item.id"
         :ref="item.id"
         :style="{
          top: `${item.style.top.value}px`,
          left: `${item.style.left.value}px`,
          'z-index': `${item.style.zIndex.value}`
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

      <div class="component-wrap"
           v-for="child in item.children"
           :id="child.id"
           :key="child.id"
           :ref="child.id"
           :style="{
          top: `${child.style.top.value}px`,
          left: `${child.style.left.value}px`,
          'z-index': `${child.style.zIndex.value}`
        }"
           :class="[currentMoveItem && currentMoveItem.id === child.id ? 'selected' : '']"
           @mousedown.stop="e => moveItem(e, child)">
        <span class="component-operate"
              v-if="currentMoveItem && currentMoveItem.id === child.id">
          <svg-icon icon-class="delete"
                    @mousedown.stop
                    @click.stop="deleteItem(child)" />
        </span>
        <template v-if="child.code === 'Input'">
          <el-input readonly></el-input>
        </template>

        <template v-if="child.code === 'Textarea'">
          <el-input type="textarea"
                    readonly></el-input>
        </template>

        <template v-if="child.code === 'Button'">
          <input type="button"
                 disabled
                 value="按钮" />
        </template>
      </div>
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
      const { code, props, style, advanced, children } = this.component

      // 不能直接进行对象赋值，浅拷贝一下
      const params = {
        code: code,
        id: `${code}_${Date.parse(new Date())}`,
        props: { ...props },
        style: { ...style },
        advanced: { ...advanced },
        children: children || []
      }

      params.style.top.value = e.offsetY
      params.style.left.value = e.offsetX
      params.style.zIndex.value = 1

      this.currentMoveItem = params
      this.$emit('selectComponent', params)

      if (!this.componentList.length) {
        this.componentList.push(params)
      } else {
        this.componentList.forEach((component) => {
          console.log('component: ', component)
          console.log('id: ', e.toElement.id)
          if (e.toElement.id === component.id) {
            component.children.push(params)
          } else {
            this.componentList.push(params)
          }
        })
      }

      console.log('this.componentList: ', this.componentList)
    },
    deleteItem (item) {
      this.recursionDeleteListItem(this.componentList, item)
    },
    recursionDeleteListItem (array, deleteItem) {
      if (array.length) {
        for (let i = array.length - 1; i >= 0; i--) {
          if (array[i].id === deleteItem.id) {
            array.splice(i, 1)
          } else if (array[i].children) {
            this.recursionDeleteListItem(array[i].children, deleteItem)
          }
        }
      }
    },
    moveItem (e, item) {
      console.log('item: ', item, e)
      this.currentMoveItem = item
      this.$emit('selectComponent', item)
      e.currentTarget.addEventListener('mousemove', this.mousemove)
      e.currentTarget.addEventListener('mouseleave', this.mouseleave)
      e.currentTarget.addEventListener('mouseup', this.mouseup)
    },
    mousemove (e) {
      console.log('移动鼠标：', e)

      const { clientX, clientY, offsetX, offsetY } = e
      if (e.target.parentElement.id) {
        this.currentMoveItem.style.top.value = offsetY
        this.currentMoveItem.style.left.value = offsetX
      } else {
        this.currentMoveItem.style.top.value = clientY
        this.currentMoveItem.style.left.value = clientX
      }
      // const { clientX, clientY } = e

      // this.currentMoveItem.style.top.value = clientY
      // this.currentMoveItem.style.left.value = clientX
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
    box-sizing: border-box;
    border: 1px solid transparent;
    &:hover {
      border-width: 1px;
      border-color: rgba(0, 137, 255, 1);
      border-style: dashed;
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      cursor: default;
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
