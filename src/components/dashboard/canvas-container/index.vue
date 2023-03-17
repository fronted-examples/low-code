<template>
  <section class="canvas-container"
           ref="canvasContainer">
    <div class="container-placeholder">拖拽组件或模板到这里</div>
  </section>
</template>

<script>
export default {
  name: 'CanvasContainer',
  data () {
    return {}
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
}
</style>
