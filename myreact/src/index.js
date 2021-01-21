import React from './react'
// import ReactDOM from './react-dom/index.js'
import ReactDOM from './react-dom'

let onClick = (synctheticEvent) => {
  console.log('synctheticEvent', synctheticEvent)
  alert('onClick')
  synctheticEvent.persist()
  
  // setInterval(()  => {
  //   console.log('2', synctheticEvent)
  // }, 1500)
}
let spanClick = (synctheticEvent) => {
  alert('spanClick')
}
// let element = (
//   <button id="sayHello" onClick={onClick}>
//     say <span color="red">000Hello</span>
//   </button>
// )

let element = React.createElement(
  'button',
  {id: 'sayHello', onClick},
  'say', React.createElement('span', {onClick: spanClick, style: {color: 'red'}}, 'Hello')
)


ReactDOM.render(
  element,
  document.getElementById('root')
)

