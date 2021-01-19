import $ from 'jquery'
import {createUnit} from "./unit"
import {createElement} from "./element"

let React = {
  render,
  rootIndex: 0,
  createElement,
}

// 此元素可能是一个文本节点、DOM节点(div)、或者 自定义组件Counter
function render (element, container) {
  // container.innerHTML = `<span data-reactid="${React.rootIndex}">${element}</span>`
  
  let unit = createUnit(element)
  let markup = unit.getMarkup(React.rootIndex) // 用来返回HTML标记
  // console.log('markup -> ', markup)
  $(container).html(markup)
}

export default {
  render,
  createElement
}
