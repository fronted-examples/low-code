<template>
  <section class="canvas-container">
    <div class="container-operate">
      <el-button type="text"
                 icon="el-icon-view"
                 @click="readJson">查看json</el-button>
    </div>

    <div class="content-wrap">
      <section class="page-content"
               ref="pageContent"
               :style="{minWidth: page.style.minWidth.value + 'px', minHeight: page.style.minHeight.value + 'px', backgroundColor: page.style.backgroundColor.value}"
               :class="[currentMoveItem && currentMoveItem.id === page.id ? 'selected' : '']"
               @mousedown.stop="selectItem(page)">
        <div v-if="!treeList.length"
             class="container-placeholder">
          拖拽组件或模板到这里</div>

        <recursion-component :list="treeList"
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
          <ace v-model="json"
               theme="kuroir"
               read-only
               mode="JSON" />
        </el-dialog>
      </section>
    </div>
  </section>
</template>

<script>
import { deepCopyObject } from '@/utils/index'
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
      treeList: [],
      visible: false,
      json: ''
    }
  },
  computed: {
    ...mapGetters('appModule', ['page'])
  },
  watch: {
    page: {
      handler (newVal) {
        // this.componentList = newVal.children
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
        parentId: e.toElement.id,
        code: code,
        id: `${code}_${Date.parse(new Date())}`,
        props: deepCopyObject(props),
        style: deepCopyObject(style),
        advanced: deepCopyObject(advanced),
        children: children || []
      }

      console.log('params: ', params)
      console.log(e)

      params.style.top.value = e.offsetY
      params.style.left.value = e.offsetX
      params.style.zIndex.value = 1

      this.componentList.push(params)

      this.treeList = this.recursionGenerateTree(this.componentList)

      this.page.children = this.treeList
      this.updatePage(this.page)

      console.log('this.componentList: ', this.componentList)
      console.log('tree: ', this.treeList)
      console.log('page: ', this.page)
    },
    recursionGenerateTree (data) {
      // * 先生成parent建立父子关系
      const obj = {}
      data.forEach((item) => {
        obj[item.id] = item
      })
      // * obj -> {1001: {id: 1001, parentId: 0, name: 'AA'}, 1002: {...}}
      console.log(obj, 'obj')
      const parentList = []
      console.log('parentList: ', parentList)
      data.forEach((item) => {
        const parent = obj[item.parentId]
        if (parent) {
          // * 当前项有父节点
          parent.children = parent.children || []
          let flag = false
          for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].id === item.id) {
              flag = true
            }
          }

          if (!flag) {
            parent.children.push(item)
          }
        } else {
          // * 当前项没有父节点 -> 顶层
          parentList.push(item)
        }
      })
      return parentList
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
