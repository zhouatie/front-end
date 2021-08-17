import { REACT_TEXT } from './constants';
import { isObject, isArray } from './utils';
import { addEvent } from './event';
/**
 *
 *
 * @param {*} vdom
 * @param {*} root
 */
function render(vdom, root) {
  console.log(vdom, 'vdom');
  mount(vdom, root);
}

/**
 *
 * @param {*} vdom
 */
function mount(vdom, container) {
  const newDom = creatDom(vdom);
  console.log(newDom, 'newDom');
  container.appendChild(newDom);
}

/**
 *
 *
 * @param {*} vdom
 * @returns
 */
function creatDom(vdom) {
  console.log(vdom, '函数执行 ============> creatDom');
  const { type, props } = vdom;
  let elem = null;

  if (type === REACT_TEXT) {
    // 文本渲染
    elem = document.createTextNode(props.content);
  } else if (typeof type === 'string') {
    // 原生元素
    elem = document.createElement(type);
    vdom.dom = elem;
    updateProps(elem, props);
    if (isObject(props.children)) {
      mount(props.children, elem);
    } else if (Array.isArray(props.children)) {
      updateChild(elem, props.children);
    }
  } else if (typeof type === 'function' && type.isReactComponent) {
    // 类组件
    const instance = new type(props);
    const renderVdom = instance.render();
    instance.oldRenderVdom = renderVdom;
    console.log(renderVdom, 'renderVdom---------');
    elem = creatDom(renderVdom);
    instance.oldRenderVdom.dom = elem;
    elem.instance = instance;
  } else if (typeof type === 'function') {
    // 函数式组件
    const renderVdom = type(props);
    elem = creatDom(renderVdom);
  }
  return elem;
}

/**
 *更新元素属性
 *
 * @param {*} container
 * @param {*} newProps
 * @param {*} oldProps
 */
function updateProps(container, newProps, oldProps) {
  console.log(container, newProps, oldProps, '函数执行 ====》 updateProps');
  // 如果老的属性不不存在了，就将他移除
  if (oldProps) {
    for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) container.removeAttribute(key);
    }
  }
  for (let key in newProps) {
    console.log(key);
    if (key === 'children') continue;
    else if (key === 'style') {
      const style = newProps.style;
      for (let i in style) {
        container.style[i] = style[i];
      }
    } else if (key === 'className') {
      container.className = newProps[key];
    } else if (key.startsWith('on')) {
      addEvent(container, key, newProps[key]);
    }
  }
}

function updateChild(container, newChildren, oldChildren) {
  console.log(
    container,
    newChildren,
    oldChildren,
    '函数执行 ====》 updateChild'
  );
  if (isObject(newChildren)) newChildren = [newChildren];
  if (isObject(oldChildren)) oldChildren = [oldChildren];
  if (
    (!isArray(newChildren) && !isArray(oldChildren)) ||
    (!newChildren.length && !oldChildren.length)
  ) {
    return;
  } else if (
    isArray(newChildren) &&
    (!isArray(oldChildren) || oldChildren.length === 0)
  ) {
    (newChildren || []).forEach((child) => {
      mount(child, container);
    });
  } else if (isArray(newChildren) && newChildren.length === 0) {
    container.children.forEach((child) => {
      child.remove();
    });
  } else if (newChildren.length && oldChildren.length) {
    // const isAllText = newChildren.find((item) => item.type === REACT_TEXT);
    // debugger
    const maxLength = Math.max(newChildren.length, oldChildren.length);
    for (let i = 0; i < maxLength; i++) {
      const nextDom = oldChildren.find(
        (item, index) => index > i && item && item.dom
      );
      compareVdom(container, oldChildren[i], newChildren[i], nextDom);
    }
  }
}

export function compareVdom(container, oldVdom, newVdom) {
  console.log(container, oldVdom, newVdom, 'compareVdom 函数执行 ===========');
  if (!oldVdom && !newVdom) {
    return;
  } else if (!oldVdom && newVdom) {
    mount(newVdom, container);
  } else if (oldVdom && !newVdom) {
    oldVdom.dom.remove();
  } else if (oldVdom.type !== newVdom.type) {
    const newDom = creatDom(newVdom);
    const oldDom = oldVdom.dom;
    container.replaceChild(newDom, oldDom);
  } else {
    updateElement(container, oldVdom, newVdom);
  }
}

function updateElement(container, oldVdom, newVdom) {
  console.log(container, oldVdom, newVdom, 'updateElement 函数执行===========');
  if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    // debugger;
    container.innerText = newVdom.props.content;
  } else if (typeof oldVdom.type === 'string') {
    updateProps(newVdom.dom, newVdom.props, oldVdom.props);
    updateChild(newVdom.dom, oldVdom.props.children, newVdom.props.children);
  }
}
const obj = {
  render,
};

export default obj;
