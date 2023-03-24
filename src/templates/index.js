import SvgIcon from './SvgIcon'
import InputComponent from './InputComponent'
import Ace from './Ace'

const components = [
  SvgIcon,
  InputComponent,
  Ace
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  SvgIcon,
  InputComponent,
  Ace
}
