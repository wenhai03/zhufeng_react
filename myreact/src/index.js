import React from './react'
import ReactDOM from './react-dom'
// import React from 'react'
// import ReactDOM from 'react-dom'

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {number: 0}
    //
    // setInterval(() => {
    //    this.setState({number: this.state.number + 1})
    // }, 1000)
  }
  // 在React中进行事件处理函数执行的时候，会先进入批量更新模式
  // 在执行此函数的时候，可能会引起多个组件的更新，但是因为当前是处于批量更新模式的
  // 不会立即更新state，而是会先把这个状态缓存起来，在事件函数执行完成之后再全部更新和这个脏组件
  handleClick = ()=> {
    this.setState({number: this.state.number +1})
    /*console.log('this.state.number -> ', this.state.number)
    this.setState({number: this.state.number +1})
    console.log('this.state.number -> ', this.state.number)
  
    setTimeout(() => {
      this.setState({number: this.state.number +1})
      console.log('this.state.number -> ', this.state.number)
      this.setState({number: this.state.number +1})
      console.log('this.state.number -> ', this.state.number)
    })*/
  }
  render() {
    return <div id={'counter' + this.state.number} onClick={this.handleClick}>+</div>
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)
/*
*
* 1.如何渲染类组件和函数组件
* 2.如果实现异步的seState
*
*
* */
