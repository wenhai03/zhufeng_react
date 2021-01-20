import {onlyOne, setProps} from './utils'
import {ELEMENT, TEXT} from "./constants"

export function createDOM (element) {
  element = onlyOne(element)
  let {$$typeof} = element
  
  // const TEXT = Symbol.for('react.text')
  // const ELEMENT = Symbol.for('react.element')
  
  let dom = null
  if (!$$typeof) { // element是一个字符串或者数字
    dom = document.createTextNode(element)
  } else if ($$typeof === TEXT) {  // 对象{$$typeof: TEXT}
    dom = document.createTextNode(element.content)
  } else if ($$typeof === ELEMENT) {
    // 如果此虚拟DOM是一个原生DOM节点
    dom = createNativeDOM(element)
  }
  
  return dom
}

function createNativeDOM (element) {
  let {type, props} = element
  let dom = document.createElement(type) // 真实的button dom对象
  // 1.创建此虚拟DOM节点的子节点
  createNativeDOMChildren(dom, element.props.children)
  setProps(dom, props)
  // 2.给此DOM元素添加属性
  return dom
}

function createNativeDOMChildren (parentNode, children) {
  children && children.flat(Infinity).forEach(child => {
  // children && children.forEach(child => {
    let childDOM = createDOM(child) // 创建子虚拟DOM节点的真实DOM元素
    parentNode.appendChild(childDOM)
  })
}

export function ReactElement ($$typeof, type, key, ref, props) {
  let element = {
    $$typeof, type, key, ref, props
  }
  return element
}




