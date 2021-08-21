import { wrapToVdom, isArray } from './utils';
import { Component } from './Components';

/**
 *创建vdom
 *
 * @param {*} type
 * @param {*} config
 * @param {*} children
 * @returns
 */
function createElement(type, config, children) {
  // console.log(Array.from(arguments), ' -----------aurguments----------------');
  let ref;
  let key;
  if (config) {
    delete config.__source;
    delete config.__self;
    ref = config.ref;
    delete config.ref;
    key = config.key;
    delete config.key;
  }
  // console.log(ref, 'reff')
  const props = { ...config };
  if (arguments.length > 3) {
    const arr = [];
    Array.prototype.slice.call(arguments, 2).forEach((o) => {
      isArray(o) ? arr.push(...o) : arr.push(o);
    });

    props.children = arr.map(wrapToVdom);
  } else {
    props.children = wrapToVdom(children);
  }

  const vdom = {
    type,
    props,
    ref,
    key,
  };
  // console.log(vdom, '---------------- aurgumentr callback ---------------');
  return vdom;
}

function createRef() {
  return {
    current: null,
  };
}

const React = {
  createElement,
  Component,
  createRef,
};

export default React;
