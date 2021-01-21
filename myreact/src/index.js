import React from './react'
// import ReactDOM from './react-dom/index.js'
import ReactDOM from './react-dom'
import {ELEMENT} from "./react/constants"

class ClassComponent extends React.Component {
  // render只会返回一个顶级元素
  render() {
    return React.createElement(FunctionCounter, {id: 'ClassComponent'}, 'hello')
  }
}

function FunctionCounter() {
  return React.createElement('div', {id: 'FunctionCounter '}, 'hello', 'world')
}

// let element1 = React.createElement('div', {id: 'counter'}, 'hello')
let element2 = React.createElement(ClassComponent, {id: 'counter'})
let element3  = React.createElement(FunctionCounter)
// React元素 = 虚拟DOM = {$$typeof: ELEMENT, type: 'div'}

ReactDOM.render(
  element2,
  document.getElementById('root')
)
/*
*
* 1.如何渲染类组件和函数组件
* 2.如果实现异步的seState
*
*
* */
