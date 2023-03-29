import { CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE } from './constants'
import { buildPage } from './util'

const actions = {
  [CREATE_PAGE]: (context, payload) => {
    const { id, name, model, props, style, advanced, children } = payload
    const page = buildPage(id, name, model, props, style, advanced, children)
    context.commit(CREATE_PAGE, page)
  },
  [UPDATE_PAGE]: (context, payload) => {
    context.commit(UPDATE_PAGE, payload)
  },
  [DELETE_PAGE]: (context, payload) => {
    context.commit(DELETE_PAGE, payload)
  }
}

export default actions
