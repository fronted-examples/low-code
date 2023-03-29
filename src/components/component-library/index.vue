<template>
  <section class="component-library"
           v-if="libraryVisible">
    <div class="header">
      <span class="header-title">组件库</span>
      <svg-icon icon-class="close"
                @click.stop="closeLibrary"></svg-icon>
    </div>
    <span class="component-item"
          v-for="(item, index) of componentList"
          :key="index + new Date().getTime()"
          @dragstart="e => dragstart(e, item)"
          @dragend="dragend"
          draggable>
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
    dragstart (e, item) {
      this.$emit('dragItemStart', item)
    },
    dragend (e) {
    }
  }
}
</script>

<style lang="scss" scoped>
.component-library {
  width: 266px;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  // 单纯右边有阴影
  box-shadow: 6px 0px 4px -4px rgba(0, 0, 0, 0.15);
  /* 父元素设置了flex,zIndex>0,box-shadow在非position为relative、absolute、fixed情况下才会生效 */
  z-index: 1;
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
