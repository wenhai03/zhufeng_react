import {Element} from './element'

class Unit {
  constructor (element) {
    // 凡是挂载到私有属性上的都以 _ 开头
    console.log('父亲 -> ', element)
    this._currentElement = element
  }
  
  getMarkup () {
    throw Error('此方法不能被调用')
  }
}

class TextUnit extends Unit {
  getMarkup (reactid) {
    this._reactid = reactid
    return `<span data-reactid="${reactid}">${this._currentElement}</span`
  }
}

class NativeUnit extends Unit {
  getMarkup (reactid) {
    this._reactid = reactid
    let {type, props} = this._currentElement
    let tagStart = `<${type} `
    let childString = ''
    let tagEnd = `</${type}>`
    // {id: 'sayHello', onClick: sayHello, style: {color: 'red'}}, children: ['say', {type: 'b', {}, "Hello}]
    for (let propName in props) {
      if (/^on[A-Z]/.test(propName)) { // 说明要绑定事件了
      
      } else if (propName === 'style') { // 如果是一个样式对象
      
      } else if (propName === 'className') { // 如果是一个类名的话
      
      } else if (propName === 'children') { // 如果是一个样式对象
      
      } else {
        tagStart += (` ${propName} = ${props[propName]} `)
      }
    }
    
    return tagStart + ">" + childString + tagEnd
  }
}

function createUnit (element) {
  if (typeof element === 'string' || typeof element === 'number') {
    return new TextUnit(element)
  }
  if (element instanceof Element && typeof element.type === 'string') {
    return new NativeUnit(element)
  }
}


export {
  createUnit
}
