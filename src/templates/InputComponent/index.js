import InputComponent from './src/component'

InputComponent.install = function (Vue) {
  Vue.install(InputComponent.name, InputComponent)
}

export default InputComponent
