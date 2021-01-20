import {createDOM} from "../react/vdom"

function render(element, container) {
  console.log('element -> ', element)
  
  // 1.要把虚拟 DOM 变成真实 DOM
  let dom = createDOM(element)
  console.log('dom -> ', dom)
  // 2.把直接DOM挂载到container上
  container.appendChild(dom)
}

export default {
  render
}
