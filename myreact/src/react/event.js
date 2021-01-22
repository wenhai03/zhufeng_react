/*
* 在react中我们并不是把事件绑在DOM节点上，而绑定到document 类似于事件委托
* 1.因为合成事件可以屏蔽浏览器的差异，不同浏览器绑定事件和触发事件的方法不一样
* 2.合成可以实现事件对象复用，重用，减少垃圾回收。提高性能
* 因为默认我要实现批量更新 setState setState 两个setState合并成一次更新，这个也是在合成事件中实现
*
* dom 要绑定事件的DOM节点
* eventType 事件类型 onClick onChange
* listener 事件处理函数
* */
import {updateQueue} from "./component"

export function addEvent (dom, eventType, listener) {
  eventType = eventType.toLowerCase()
  let eventStore = dom.eventStore || (dom.eventStore = {})
  eventStore[eventType] = listener//eventStore.onclick=listener  addEventListener
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

let syntheticEvent

function dispatchEvent (event) {
  let {type, target} = event
  let eventType = 'on' + type
  syntheticEvent = getSyntheticEvent(event)
  //在事件监听函数执行前先进入批量更新模式
  updateQueue.isPending = true
  while (target) {
    let {eventStore} = target
    //找的是事件触发对象和它的上级对象上绑过的事件
    let listener = eventStore && eventStore[eventType]
    if (listener) {
      listener.call(target, syntheticEvent)
    }
    target = target.parentNode
  }
  for (let key in syntheticEvent) {
    if (syntheticEvent.hasOwnProperty(key))
      delete syntheticEvent[key]
  }
  //当事件处理函数执行完成后，把批量更新模式改为false
  updateQueue.isPending = false
  //执行批量更新，就是把缓存的那个updater全部执行了
  updateQueue.batchUpdate()
}

// 如果说执行了persist，就让syntheticEvent指向了新对象，white循环结束之后再清除的是新对象的属性
function persist () {
  syntheticEvent = {}
  Object.setPrototypeOf(syntheticEvent, {
    persist
  })
}

function getSyntheticEvent (nativeEvent) {
  if (!syntheticEvent) {
    persist()
  }
  syntheticEvent.nativeEvent = nativeEvent
  syntheticEvent.currentTarget = nativeEvent.target
  for (let key in nativeEvent) {
    if (typeof nativeEvent[key] == 'function') {
      syntheticEvent[key] = nativeEvent[key].bind(nativeEvent)
    } else {
      syntheticEvent[key] = nativeEvent[key]
    }
  }
  return syntheticEvent
}
