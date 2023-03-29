<template>
  <fragment>
    <template v-if="disabled">
      <div v-for="(item, index) in list"
           :key="index"
           :id="item.id"
           class="item"
           v-drag.outRange.disabled
           :style="{
          top: `${item.style.top.value}px`,
          left: `${item.style.left.value}px`,
          'z-index': `${item.style.zIndex.value}`
        }">
        {{ item.code }}
        <component :is="components[item.code]"></component>

        <!-- 在遍历时递归调用组件自身，当然，要有children，有数据的时候才去递归调用自身(递归需要有一个结束条件) -->
        <div v-if="item.children">
          <RecursionComponent :data="item.children"></RecursionComponent>
          <!-- 因为组件调用渲染，需要有数据，而这个tree.vue组件是的数据是通过props接收的，
        所以需要把子内容数据再传递给子组件，子组件用props接收，就能够一层一层的渲染了 -->
        </div>
      </div>
    </template>

    <template v-if="!disabled">
      <div v-for="(item, index) in list"
           :key="index"
           :id="item.id"
           class="item"
           :class="{
            disable: readOnly,
            selected: component && component.id === item.id
           }"
           v-drag.outRange="position"
           :style="{
          top: `${item.style.top.value}px`,
          left: `${item.style.left.value}px`,
          'z-index': `${item.style.zIndex.value}`
        }"
           @mousedown.stop="selectItem(item)">
        {{ item.code }}
        <span class="component-operate"
              v-if="component && component.id === item.id">
          <svg-icon icon-class="delete"
                    @mousedown.stop
                    @click.stop="deleteItem(item)" />
        </span>
        <component :is="components[item.code]"></component>

        <!-- 在遍历时递归调用组件自身，当然，要有children，有数据的时候才去递归调用自身(递归需要有一个结束条件) -->
        <div v-if="item.children">
          <RecursionComponent :data="item.children"></RecursionComponent>
          <!-- 因为组件调用渲染，需要有数据，而这个tree.vue组件是的数据是通过props接收的，
        所以需要把子内容数据再传递给子组件，子组件用props接收，就能够一层一层的渲染了 -->
        </div>
      </div>
    </template>
  </fragment>
</template>

<script>
export default {
  name: 'RecursionComponent',
  props: {
    list: {
      type: Array,
      default () {
        return []
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      components: {
        'InputComponent': 'input-component',
        'Button': 'el-button',
        'Textarea': 'el-input'
      },
      position: {
        top: 0,
        left: 0
      },
      component: null
    }
  },
  watch: {
    'position.top' (newVal) {
      console.log('top: ', newVal)
      this.component.style.top.value = newVal
    },
    'position.left' (newVal) {
      console.log('left: ', newVal)
      this.component.style.left.value = newVal
    }
  },
  methods: {
    selectItem (item) {
      console.log('item: ', item)
      this.component = item
      this.$emit('selectComponent', item)
    },
    deleteItem (item) {
      this.$emit('deleteComponent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid transparent;
  position: absolute;
  z-index: 999;
  border-radius: 4px;

  &.selected {
    border-color: rgba(0, 137, 255, 1);
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

.disable {
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
}
</style>
