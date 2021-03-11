var VueReactivity = (function () {
  function isObject(obj) {
    return typeof obj === 'object';
  }
  function hasProperty(obj, key) {
    return obj.hasOwnProperty(key);
  }
  // 存储effect队列;
  const effectStack = [];
  const effectMap = new WeakMap();
  // 创建响应式对象
  function reactive(target) {
    return (observer = createReactive(target));
  }

  /**
   * 创建响应式
   *
   * @param {*} target
   * @returns
   */
  function createReactive(target) {
    const handler = {
      get(target, key, receiver) {
        const value = Reflect.get(target, key, receiver);
        track(target, key);
        return isObject(value) ? reactive(value) : value;
      },
      set(target, key, value, receiver) {
        // console.log(key, value, target[key], '==== 设置 ====');
        const oldValue = target[key];
        const res = Reflect.set(target, key, value, receiver);
        if (!hasProperty(target, key)) {
          console.log('新增');
          trigger(target, 'add', key);
        } else if (value !== oldValue) {
          console.log(target, key, value, '修改');
          trigger(target, 'set', key);
        }
        return res;
      },
      deleteProperty(target, key, receiver) {
        return Reflect.deleteProperty(target, key, receiver);
      },
    };
    const observer = new Proxy(target, handler);
    return observer;
  }

  /**
   *
   * 创建副作用函数
   * @param {*} fn
   */
  function effect(fn) {
    const effectFn = createEffectReactive(fn);
    effectFn();
  }

  function createEffectReactive(fn) {
    const effect = () => {
      return run(effect, fn);
    };
    return effect;
  }

  function run(effect, fn) {
    try {
      effectStack.push(effect);
      fn();
    } finally {
      effectStack.pop();
    }
  }

  function track(target, key) {
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      let depsMap = effectMap.get(target);
      if (!depsMap) {
        effectMap.set(target, (depsMap = new Map()));
      }
      let deps = depsMap.get(key);
      if (!deps) {
        depsMap.set(key, (deps = new Set()));
      }
      if (!deps.has(effect)) {
        deps.add(effect);
      }
    }
  }

  function trigger(target, operate, key) {
    const depsMap = effectMap.get(target);
    if (depsMap) {
      const deps = depsMap.get(key);
      if (deps) {
        deps.forEach((effect) => {
          effect();
        });
      }
    }
  }
  return { effect, reactive };
})();
