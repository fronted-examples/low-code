// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import appModule from './app-module'

Vue.use(Vuex)

// 应用信息持久化
const appPersistedState = createPersistedState({
  key: 'app',
  storage: window.sessionStorage, // 修改存储的状态
  paths: ['appModule'] // 存储的指定的模块的名字（存储某个模块对象）
})

export default new Vuex.Store({
  modules: {
    appModule
  },
  plugins: [appPersistedState] // 状态持久化
})
