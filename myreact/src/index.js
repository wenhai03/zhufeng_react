import React from './react'
// import ReactDOM from './react-dom/index.js'
import ReactDOM from './react-dom'

let onClick = (event) => {
  alert("Hello")
}
// let element = (
//   <button id="sayHello" onClick={onClick}>
//     say <span color="red">000Hello</span>
//   </button>
// )

let element = React.createElement(
  'button',
  {id: 'sayHello', onClick},
  'say', React.createElement('span', {style: {color: 'red'}}, 'Hello')
)


ReactDOM.render(
  element,
  document.getElementById('root')
)

