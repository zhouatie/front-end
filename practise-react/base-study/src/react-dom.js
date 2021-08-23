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
    vdom.oldRenderVdom = renderVdom;
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
    if (isArray(child)) {
      reconcileChildren(container, child);
    } else {
      mount(child, container);
    }
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
    domDiff(container, oldChildren, newChildren);
  }
}

function domDiff(container, oldChildren, newChildren) {
  let lastPlaceIndex = -1;
  for (let i = 0; i < newChildren.length; i++) {
    let newKey;
    const newVdom = newChildren[i];
    if (newVdom) {
      newKey = newVdom.key;
    }
    const hadSameKeyElemIndex = oldChildren.findIndex(
      (o) => o.key && o.key === newKey
    );

    if (
      newKey &&
      hadSameKeyElemIndex >= lastPlaceIndex &&
      oldChildren[hadSameKeyElemIndex].type === newVdom.type
    ) {
      lastPlaceIndex = hadSameKeyElemIndex;
      compareVdom(container, oldChildren[hadSameKeyElemIndex], newVdom);
    } else if (
      hadSameKeyElemIndex >= 0 &&
      hadSameKeyElemIndex < lastPlaceIndex
    ) {
      const newDom = findDom(oldChildren[hadSameKeyElemIndex]);
      const oldDom = findDom(oldChildren[lastPlaceIndex + 1]);
      container.insertBefore(newDom, oldDom);
      compareVdom(container, oldChildren[hadSameKeyElemIndex], newVdom);
    } else if (newKey && hadSameKeyElemIndex < 0) {
      const newDom = creatDom(newVdom);
      const oldDom = findDom(oldChildren[lastPlaceIndex + 1]);
      container.insertBefore(newDom, oldDom);
    } else if (!newKey) {
      compareVdom(container, oldChildren[++lastPlaceIndex], newVdom);
    }
  }
  container.children.forEach((child) => {
    const item = newChildren.find((o) => findDom(o) === child);
    if (!item) {
      child.remove();
    }
  });
}

export function compareVdom(container, oldVdom, newVdom, nextDom) {
  // console.log(container, oldVdom, newVdom, 'compareVdom 函数执行 ===========');

  if (!oldVdom && !newVdom) {
    return;
  } else if (!oldVdom && newVdom && nextDom) {
    console.log(nextDom, 'nextDom');
    const newDom = creatDom(newVdom);
    container.insertBefore(newDom, nextDom);
  } else if (!oldVdom && newVdom) {
    mount(newVdom, container);
  } else if (oldVdom && !newVdom) {
    if (oldVdom.instance && oldVdom.instance.componentWillUnmount)
      oldVdom.instance.componentWillUnmount();
    const dom = findDom(oldVdom);
    dom.remove();
  } else if (oldVdom.type === REACT_TEXT && newVdom.type === REACT_TEXT) {
    if (oldVdom.props.content !== newVdom.props.content)
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
function updateFunctionComponent(container, oldVdom, newVdom) {
  console.log(oldVdom, newVdom);
  const newRenderVdom = newVdom.type(newVdom.props);
  compareVdom(container, oldVdom.oldRenderVdom, newRenderVdom);
  newVdom.oldRenderVdom = newRenderVdom;
}

function updateElement(container, oldVdom, newVdom) {
  // console.log(container, oldVdom, newVdom, 'updateElement 函数执行===========');
  if (typeof oldVdom.type === 'string') {
    const dom = (newVdom.dom = findDom(oldVdom));
    updateProps(dom, newVdom.props, oldVdom.props);
    updateChild(dom, newVdom.props.children, oldVdom.props.children);
  } else if (
    typeof oldVdom.type === 'function' &&
    oldVdom.type.isReactComponent
  ) {
    updateClassComponent(oldVdom, newVdom);
  } else if (typeof oldVdom.type === 'function') {
    updateFunctionComponent(container, oldVdom, newVdom);
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
