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
  // console.log(vdom, 'vdom');
  mount(vdom, root);
}

/**
 *
 * @param {*} vdom
 */
function mount(vdom, container) {
  const newDom = creatDom(vdom);
  container.appendChild(newDom);
}

/**
 *
 *
 * @param {*} vdom
 * @returns
 */
function creatDom(vdom) {
  // console.log(vdom, '函数执行 ============> creatDom');
  const { type, props, ref } = vdom;
  let elem = null;
  let instance;
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
      reconcileChildren(elem, props.children);
    }
  } else if (typeof type === 'function' && type.isReactComponent) {
    // 类组件
    instance = new type(props);
    vdom.instance = instance;
    if (instance.componentWillMount) {
      instance.componentWillMount();
    }

    const renderVdom = instance.render();
    instance.oldRenderVdom = renderVdom;
    elem = creatDom(renderVdom);
    instance.dom = elem;

    if (instance.componentDidMount) {
      instance.componentDidMount();
    }
  } else if (typeof type === 'function') {
    // 函数式组件
    const renderVdom = type(props);
    elem = creatDom(renderVdom);
  }
  if (ref) ref.current = type.isReactComponent ? instance : elem;

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
  // console.log(container, newProps, oldProps, '函数执行 ====》 updateProps');
  // 如果老的属性不不存在了，就将他移除
  if (oldProps) {
    for (let key in oldProps) {
      if (!newProps.hasOwnProperty(key)) container.removeAttribute(key);
    }
  }
  for (let key in newProps) {
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

function reconcileChildren(container, children) {
  if (isObject(children)) children = [children];
  children.forEach((child) => {
    mount(child, container);
  });
}

function updateChild(container, newChildren, oldChildren) {
  // console.log(
  //   container,
  //   newChildren,
  //   oldChildren,
  //   '函数执行 ====》 updateChild'
  // );
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
  // console.log(container, oldVdom, newVdom, 'compareVdom 函数执行 ===========');

  if (!oldVdom && !newVdom) {
    return;
  } else if (!oldVdom && newVdom) {
    mount(newVdom, container);
  } else if (oldVdom && !newVdom) {
    if (oldVdom.instance.componentWillUnmount)
      oldVdom.instance.componentWillUnmount();
    const dom = findDom(oldVdom);
    dom.remove();
  } else if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    // debugger;
    container.innerText = newVdom.props.content;
  } else if (oldVdom.type !== newVdom.type) {
    const newDom = creatDom(newVdom);
    const oldDom = oldVdom.dom;
    container.replaceChild(newDom, oldDom);
  } else {
    updateElement(container, oldVdom, newVdom);
  }
}

function updateClassComponent(oldVdom, newVdom) {
  const instance = (newVdom.instance = oldVdom.instance);
  console.log(newVdom.props, 'newVdom.props');
  instance.updater.EmitUpdate(newVdom.props);
}

function updateElement(container, oldVdom, newVdom) {
  // console.log(container, oldVdom, newVdom, 'updateElement 函数执行===========');
  if (typeof oldVdom.type === 'string') {
    const dom = (newVdom.dom = findDom(oldVdom));
    updateProps(dom, newVdom.props, oldVdom.props);
    updateChild(dom, newVdom.props.children, oldVdom.props.children);
  } else if (typeof oldVdom.type === 'function') {
    updateClassComponent(oldVdom, newVdom);
  }
}

function findDom(vdom) {
  if (vdom.dom) {
    return vdom.dom;
  } else if (vdom.instance) return vdom.instance.dom;
}
const obj = {
  render,
};

export default obj;
