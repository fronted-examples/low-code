export default {
  methods: {
    componentMethod (id, methodName, params) {
      this.$emit(`${id}-${methodName}`, params)
    }
  }
}
