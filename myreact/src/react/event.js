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
  eventType = eventType.toLowerCase(); // onClick => onclick
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
function dispatchEvent(event) {

}
