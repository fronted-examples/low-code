<template>
  <section class="input">
    <input @change="handleChange" />
  </section>
</template>

<script>
export default {
  name: 'InputComponent',
  props: {
    id: {
      type: String,
      default: ''
    },
    methodName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.$on(`${this.id}-${this.methodName}`, params => {
      // TODO
      console.log('params: ', params)
    })
  },
  destroyed () {
    this.$off(`${this.id}-${this.methodName}`)
  },
  methods: {
    componentMethod (id, methodName, params) {
      window.vm.$emit(`${id}-${methodName}`, params)
    },
    handleChange (e) {
      console.log('chang事件：', e)
    }
  }
}
</script>
