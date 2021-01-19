import React from './react'

// jsx浏览器不能识别和运行，要靠babel转换成javaScript
function sayHello () {
  alert('hello')
}

// let element = (
//   <button id="sayHello" style={{color: "rend", background: "green"}} onClick={ sayHello}>
//     say
//     <b>hello</b>
//   </button>
// )

let element = React.createElement(
  'button',
  {id: 'sayHello', style: {color: 'red', backgroundColor: 'green'}, onClick: sayHello},
  'say',
  React.createElement('b', {}, 'Hello')
)

React.render(
  element,
  document.getElementById('root')
)

