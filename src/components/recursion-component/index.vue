<template>
  <ul>
    <li v-for="(item, index) in data"
        :key="index">
      {{ item.code }}
      <!-- 在遍历时递归调用组件自身，当然，要有children，有数据的时候才去递归调用自身(递归需要有一个结束条件) -->
      <template v-if="item.children">
        <RecursionComponent :data="item.children"></RecursionComponent>
        <!-- 因为组件调用渲染，需要有数据，而这个tree.vue组件是的数据是通过props接收的，
        所以需要把子内容数据再传递给子组件，子组件用props接收，就能够一层一层的渲染了 -->
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'RecursionComponent',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      components: ['InputComponent', 'el-input', 'el-button']
    }
  }
}
</script>
