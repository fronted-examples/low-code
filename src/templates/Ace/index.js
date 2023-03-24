import Ace from './src/component'

Ace.install = function (Vue) {
  Vue.install(Ace.name, Ace)
}

export default Ace
