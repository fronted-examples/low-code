import { CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE } from './constants'
import { deepCopyObject } from '@/utils/index'

const mutations = {
  [CREATE_PAGE]: (state, payload) => {
    state.page = payload

    let flag = false
    for (let i = 0; i < state.app.length; i++) {
      if (state.app[i].id === state.page.id) {
        flag = true
      }
    }

    if (!flag) {
      const param = {
        id: state.page.id,
        page: deepCopyObject(state.page)
      }

      state.app.push(param)
    }
  },
  [UPDATE_PAGE]: (state, payload) => {
    state.page = payload
  },
  [DELETE_PAGE]: (state) => {
    state.page = {}
  }
}

export default mutations
