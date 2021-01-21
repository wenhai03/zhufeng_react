import {createDOM} from "../react/vdom"

function render(element, container) {
  // 1.要把虚拟 DOM 变成真实 DOM
  let dom = createDOM(element)
  // 2.把直接DOM挂载到container上
  container.appendChild(dom)
}

export default {
  render
}
