import page from './page'

export default {
  install (Vue) {
    // 页签操作
    Vue.prototype.$page = page
  }
}
