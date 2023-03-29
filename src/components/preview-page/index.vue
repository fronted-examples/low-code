<template>
  <section class="preview-page">
    <transition name="mask">
      <div class="mask"
           v-show="visible"></div>
    </transition>
    <transition name="bullet">
      <section class="preview-content"
               v-show="visible">
        <div class="preview-header">
          <span class="preview-title">{{ title }}</span>

          <div>
            <svg-icon icon-class="close"
                      @click.stop="close" />
          </div>
        </div>
        <div class="preview-body">
          <slot />
        </div>
      </section>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'PreviewPage',
  props: {
    title: {
      type: String,
      default: '页面预览'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang='scss' scoped>
.preview-page {
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 999999;
  }
  .preview-content {
    width: 100vw;
    height: 548px;
    position: fixed;
    bottom: 0;
    z-index: 9999999;
    .preview-header {
      width: 100%;
      height: 48px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      background-color: #fff;
      padding: 0 20px;
      font-size: 18px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .preview-title {
        font-weight: bold;
      }

      .svg-icon {
        cursor: pointer;
      }
    }

    .preview-body {
      height: 500px;
      overflow: auto;
      background-color: #edeff3;
      box-sizing: border-box;
      padding: 10px 20px;
    }
  }
}

/* 给过渡的name加样式 */
.mask-leave-active,
.mask-enter-active {
  transition: all 0.8s ease;
}

.mask-leave-active,
.mask-enter {
  opacity: 0 !important;
}

.mask-leave,
.mask-enter-active {
  opacity: 1;
}

.bullet-leave-active,
.bullet-enter-active {
  transition: all 0.8s ease;
}

.bullet-leave-active,
.bullet-enter {
  height: 0px !important;
}

.bullet-leave,
.bullet-enter-active {
  height: 548px;
}
</style>
