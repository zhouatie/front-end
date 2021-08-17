import { updateQueue } from './Components';
/**
 * 给元素添加事件
 *
 * @export
 * @param {*} dom
 * @param {*} eventName
 * @param {*} event
 */
export function addEvent(dom, eventName, event) {
  // console.log(dom, eventName, event, '函数执行 addEvent ===============')
  if (dom.store) {
    dom.store.eventName = event;
  } else {
    dom.store = {
      [eventName]: event,
    };
  }

  const name = eventName.toLowerCase();
  if (!document[name]) {
    document[name] = dispatchEvent;
  }
}

function dispatchEvent(event) {
  const { target, type } = event;
  const eventName = `on${type[0].toUpperCase()}${type.slice(1)}`;
  let node = target;
  // console.log('dispatchEvent 开始--------------');
  updateQueue.isUpdating = true;
  while (node) {
    // console.log('执行 ==> while', node.store, target);
    // TODO: event 没有传入
    node.store && node.store[eventName] && node.store[eventName]();
    node = node.parentNode;
  }
  updateQueue.isUpdating = false;
  updateQueue.batchUpdater();
  // console.log('dispatchEvent 结束--------------');
}
