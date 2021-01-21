import {ELEMENT, TEXT, FUNCTION_COMPONENT, CLASS_COMPONENT} from "./constants"
import {ReactElement} from "./vdom"
import {Component} from "./component"

function createElement (type, config = {}, ...children) {
  delete config.__source
  delete config.__self
  let {key, ref, ...props} = config
  let $$typeof = null
  if (typeof type === 'string') {  // span div button
    $$typeof = ELEMENT // 是一个原生的DOM类型
  } else if (typeof type === 'function' && type.prototype.isReactComponent) { // 说明这个类型是一个类组件
    $$typeof = CLASS_COMPONENT
  } else if (typeof type === 'function') {// 说明是一个函数组件
    $$typeof = FUNCTION_COMPONENT
  }
  
  props.children = children.map(item => {
    if (typeof item === 'object') {
      return item  // React.crateElement('span', {color: 'red'}, 'Hello')
    } else {
      return {$$typeof: TEXT, type: TEXT, content: item} // item: 'Hello'
    }
  })
  return ReactElement($$typeof, type, key, ref, props)
}

export {
  Component
}

const React = {
  createElement,
  Component
}

export default React
