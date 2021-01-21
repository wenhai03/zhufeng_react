// 如果obj是数组，只取第一个元素，如果不是数组，就返回自己
import {addEvent} from "./event"

export function onlyOne (obj) {
  return Array.isArray(obj) ? obj[0] : obj
}

/*
*
* 诶真实DOM节点赋属性
* */
export function setProps (dom, props) {
  for (let key in props) {
    let value = props[key]
    setProp(dom, key, value)
  }
}

function setProp (dom, key, value) {
  if (/^on/.test(key)) { // 如果属性名是以on开头的说明要绑定事件
    // dom[key.toLowerCase()] = value // 稍后会改成合成事件
    addEvent(dom, key, value)
  } else if (key === 'className') {
    dom.className = value
  } else if (key === 'style') {
    for (let styleName in value) { // {color: 'red'}
      dom.style[styleName] = value[styleName]
    }
  } else {
    dom.setAttribute(key, value)
  }
}
