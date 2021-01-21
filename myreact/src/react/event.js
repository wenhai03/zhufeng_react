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
export function addEvent (dom, eventType, listener) {
  eventType = eventType.toLowerCase() // onClick => onclick
  // 在要绑定的DOM节点上挂载一个对象，准备存放监听函数
  let eventStore = dom.eventStore || (dom.eventStore = {})
  // eventStore.onclick = ()= > { alert('hello')}
  eventStore[eventType] = listener
  // document.addEventListener(click', dispatchEvent)
  // 第一阶段是捕获，第二阶段是冒泡 false冒泡
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
  
}

// 真正事件触发的回调是这个dispatchEvent方法
// event就是原生DOM事件对象，但是传递给我们的监听函数并不是它
// 所有的事件处理函数都会进入dispatchEvent
let synctheticEvent

function dispatchEvent (event) {
  let {type, target} = event // type=click target==button
  let eventType = 'on' + type // onclick
  // 在此处给synctheticEvent赋值
  synctheticEvent = getSyntheticEvent(event)
  
  // 模拟事件冒泡
  while (target) {
    let {eventStore} = target
    let listener = eventStore && eventStore[eventType] // onclick
    if (listener) {
      listener.call(target, synctheticEvent)
    }
    target = target.parentNode
  }
  // 等所有的监听函数执行完了，就可以清掉所有的属性了，供下次复用此syntheticEvent对象 对象池
  for (let key in synctheticEvent) {
    let eventType = 'on' + type // onclick
    
    // if (key !== 'persist') {
    //   synctheticEvent[key] = null
    // }
  }
}

// 如果说执行了persist，就让syntheticEvent指向了新对象，white循环结束之后再清除的是新对象的属性
function persist () {
  synctheticEvent = {persist}
}

function getSyntheticEvent (nativeEvent) {
  // 第一次才会创建，以后就不再创建，始终有同一个
  if (!synctheticEvent) {
    synctheticEvent = {}
    synctheticEvent.__proto__.persist = persist
  }
  synctheticEvent.nativeEvent = nativeEvent
  synctheticEvent.currentTarget = nativeEvent.target
  // 把原生事件对象上的方法和属性都拷贝到了合成对象上
  for (const key in nativeEvent) {
    if (typeof nativeEvent[key] === 'function') {
      synctheticEvent[key] = nativeEvent[key].bind(nativeEvent)
    } else {
      synctheticEvent[key] = nativeEvent[key]
    }
  }
  return synctheticEvent
}
