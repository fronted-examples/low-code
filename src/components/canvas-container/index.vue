<template>
  <section class="canvas-container">
    <div class="container-operate">
      <el-button type="text" icon="el-icon-view"
                 @click="readJson">查看json</el-button>
    </div>

    <div class="content-wrap">
      <section class="page-content"
               ref="pageContent"
               :style="{minWidth: page.style.minWidth.value + 'px', minHeight: page.style.minHeight.value + 'px', backgroundColor: page.style.backgroundColor.value}"
               :class="[currentMoveItem && currentMoveItem.id === page.id ? 'selected' : '']"
               @mousedown.stop="selectItem(page)">
        <div v-if="!componentList.length"
             class="container-placeholder">
          拖拽组件或模板到这里</div>

        <recursion-component :list="page.children"
                             read-only
                             @deleteComponent="deleteComponent" />
        <!-- <div class="component-wrap"
             v-for="item in componentList"
             :id="item.id"
             :key="item.id"
             :ref="item.id"
             :style="{
          top: `${item.style.top.value}px`,
          left: `${item.style.left.value}px`,
          'z-index': `${item.style.zIndex.value}`
        }"
             v-drag.outRange="wrapPosition"
             :class="[currentMoveItem && currentMoveItem.id === item.id ? 'selected' : '']"
             @mousedown.stop="selectItem(item)">
          <span class="component-operate"
                v-if="currentMoveItem && currentMoveItem.id === item.id">
            <svg-icon icon-class="delete"
                      @mousedown.stop
                      @click.stop="deleteItem(item)" />
          </span>
          <template v-if="item.code === 'Input'">
            <input-component />
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
               v-drag.outRange="wrapPosition"
               @mousedown.stop="selectItem(child)">
            <span class="component-operate"
                  v-if="currentMoveItem && currentMoveItem.id === child.id">
              <svg-icon icon-class="delete"
                        @mousedown.stop
                        @click.stop="deleteItem(child)" />
            </span>
            <template v-if="child.code === 'Input'">
              <input-component />
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
        </div> -->

        <el-dialog title="查看json"
                   :visible.sync="visible">
          <ace v-model="json" theme="kuroir"
               read-only mode="JSON" />
        </el-dialog>
      </section>
    </div>
  </section>
</template>

<script>
import { deepCopy } from '@/utils/index'
import { mapGetters, mapActions } from 'vuex'

import RecursionComponent from '@/components/recursion-component'

export default {
  name: 'CanvasContainer',
  components: {
    RecursionComponent
  },
  props: {
    component: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      componentList: [],
      currentMoveItem: null,
      wrapPosition: {
        top: 0,
        left: 0
      },
      visible: false,
      json: ''
    }
  },
  computed: {
    ...mapGetters('appModule', ['page'])
  },
  watch: {
    'wrapPosition.top' (newVal) {
      this.currentMoveItem.style.top.value = newVal
    },
    'wrapPosition.left' (newVal) {
      this.currentMoveItem.style.left.value = newVal
    },
    page: {
      handler (newVal) {
        this.componentList = newVal.children
        this.json = JSON.stringify(newVal, null, 2)
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.addDrag()
  },
  methods: {
    ...mapActions({
      updatePage: 'appModule/updatePage'
    }),
    addDrag () {
      // 设置元素的放置行为——移动
      this.$refs.pageContent.addEventListener('dragenter', this.dragenter)
      // 在目标元素经过 必须要阻止默认行为 否则不能触发drop
      this.$refs.pageContent.addEventListener('dragover', this.dragover)
      // 离开目标元素时设置元素的放置行为——不能拖放
      this.$refs.pageContent.addEventListener('dragleave', this.dragleave)
      // 拖动元素在目标元素松手时添加元素到画布
      this.$refs.pageContent.addEventListener('drop', this.drop)
    },
    removeDrag () {
      this.$refs.pageContent.removeEventListener('dragenter', this.dragenter)
      this.$refs.pageContent.removeEventListener('dragover', this.dragover)
      this.$refs.pageContent.removeEventListener('dragleave', this.dragleave)
      this.$refs.pageContent.removeEventListener('drop', this.drop)
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
        props: deepCopy(props),
        style: deepCopy(style),
        advanced: deepCopy(advanced),
        children: children || []
      }

      console.log(e)

      params.style.top.value = e.offsetY
      params.style.left.value = e.offsetX
      params.style.zIndex.value = 1

      this.currentMoveItem = params
      this.$emit('selectComponent', params)

      let flag = this.recursionFindListItem(this.componentList, params, e.toElement.id)

      console.log('flag: ', flag)

      // let flag = false

      // for (let i = 0; i < this.componentList.length; i++) {
      //   if (e.toElement.id === this.componentList[i].id) {
      //     this.componentList[i].children.push(params)
      //     flag = true
      //   }
      // }

      if (!flag) {
        this.componentList.push(params)
      }

      this.page.children = this.componentList

      this.updatePage(this.page)

      console.log('this.componentList: ', this.componentList)
    },
    recursionFindListItem (array, findItem, findId) {
      let flag = false
      if (array.length) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].id === findId) {
            flag = true
            array[i].children.push(findItem)
          } else if (array[i].children) {
            this.recursionDeleteListItem(array[i].children, findItem, findId)
          }
        }
      }

      return flag
    },
    deleteComponent (item) {
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
    selectItem (item) {
      console.log('item: ', item)
      this.currentMoveItem = item
      this.$emit('selectComponent', item)
    },
    readJson () {
      this.visible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.canvas-container {
  width: calc(100% - 566px);
  height: 100%;
  box-sizing: border-box;
  background-color: #f0f0f0;
  .container-operate {
    height: 48px;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 24px;
    background-color: #fff;
  }
  .content-wrap {
    width: 100%;
    height: calc(100% - 48px);
    box-sizing: border-box;
    padding: 10px 20px;
    overflow: auto;
    .page-content {
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      overflow: auto;
      padding: 24px;
      position: relative;
      &.selected {
        border-width: 1px;
        border-color: rgba(0, 137, 255, 1);
        border-style: solid;
        border-radius: 4px;
      }

      .container-placeholder {
        min-height: 60px;
        height: 100%;
        width: 100%;
        background-color: #f0f0f0;
        box-sizing: border-box;
        border: 1px dotted;
        color: #a7b1bd;
        display: flex;
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
  }
}
</style>
