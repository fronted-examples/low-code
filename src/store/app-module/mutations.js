import { CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE } from './constants'

const mutations = {
  [CREATE_PAGE]: (state, payload) => {
    state.page = payload
  },
  [UPDATE_PAGE]: (state, payload) => {
    state.page = payload
  },
  [DELETE_PAGE]: (state) => {
    state.page = {}
  }
}

export default mutations
