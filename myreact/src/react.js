let React = {
  render,
  rootIndex: 0
}
// 此元素可能是一个文本节点、DOM节点(div)、或者 自定义组件Counter
function render (element, container) {
  container.innerHTML = `<span data-reactid="${React.rootIndex}">${element}</span>`
}

export default {
  render
}
