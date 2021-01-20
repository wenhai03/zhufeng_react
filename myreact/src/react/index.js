import {ELEMENT, TEXT} from "./constants"
import {ReactElement} from "./vdom"

function createElement (type, config = {}, ...children) {
  delete config.__source
  delete config.__self
  let {key, ref, ...props} = config
  let $$typeof = null
  if (typeof type === 'string') {  // span div button
    $$typeof = ELEMENT
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

const React = {
  createElement
}

export default React
