import { REACT_TEXT } from './constants';
import { isObject } from './utils';
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
  console.log(vdom, container, '函数执行 ============> mount');
  const { type, props } = vdom;
  let elem = null;
  if (type === REACT_TEXT) {
    container.appendChild(document.createTextNode(props.content));
  } else if (typeof type === 'function') {
    const renderVdom = type(props);
    console.log(renderVdom, 'renderVdom---------');
    mount(renderVdom, container);
  } else if (typeof type === 'string') {
    elem = document.createElement(type);
    container.appendChild(elem);
    updateProps(props, elem);
    if (isObject(props.children)) {
      mount(props.children, elem);
    } else if (Array.isArray(props.children)) {
      updateChild(props.children, elem);
    }
  }
  return elem;
}

/**
 *更新元素属性
 *
 * @param {*} props
 * @param {*} container
 */
function updateProps(props, container) {
  console.log(props, container, '函数执行 ====》 updateProps');
  for (let key in props) {
    console.log(key);
    if (key === 'children') continue;
    else if (key === 'style') {
      const style = props.style;
      for (let i in style) {
        container.style[i] = style[i];
      }
    } else if (key === 'className') {
      container.className = props[key];
    }
  }
}

function updateChild(children, container) {
  if (!children) return;
  console.log(children, container, '函数执行 ====》 updateChild');
  (children || []).forEach((child) => {
    mount(child, container);
  });
}

const obj = {
  render,
};

export default obj;
