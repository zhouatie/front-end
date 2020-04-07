let Vue;
const install = _Vue => {
  if (Vue) {
    return console.log('请勿重复安装');
  }
  Vue = _Vue;
  _Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    }
  });
};

function normalizeMap(map) {
  return Array.isArray(map) ? map.map(key => ({ key, val: key })) : Object.keys(map).map(key => ({ key, val: map[key] }));
}

function isObject(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}
class Store {
  constructor(options) {
    this.getters = options.getters || {};
    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    this.vm = new Vue({
      data: {
        state: options.state
      }
    });

    Object.keys(this.getters).forEach(key => {
      this.getters[key] = this.getters[key].call(this, this.vm.state);
    });
  }

  get state() {
    return this.vm.state;
  }

  commit(event, payload) {
    this.mutations[event].call(this, this.state, payload);
  }

  dispatch(event, payload) {
    console.log(event, 'event')
    if (isObject(event)) {
      const { type, ...res } = event;
      event = type;
      payload = res;
    }
    this.actions[event].call(this, this, payload);
  }
}

export const mapState = options => {
  if (typeof options !== 'object') {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    return;
  }

  const res = {};
  normalizeMap(options).forEach(o => {
    if (typeof o.val === 'function') {
      res[o.key] = function() {
        return o.val.call(this.$store, this.$store.state);
      };
    } else {
      res[o.key] = function() {
        return this.$store.state[o.val];
      };
    }
  });
  return res;
};

export const mapGetters = options => {
  if (typeof options !== 'object') {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
    return;
  }

  const res = {};
  normalizeMap(options).forEach(o => {
    if (typeof o.val === 'function') {
      res[o.key] = function() {
        return o.val.call(this.$store, this.$store.state, this.$store.getters);
      };
    } else {
      res[o.key] = function() {
        console.log(this.$store.state, o.value, '$sotre');
        return this.$store.getters[o.val];
      };
    }
  });
  return res;
};

export const mapMutations = options => {
  if (typeof options !== 'object') {
    console.log('本实例暂不支持module');
    return {};
  }
  const res = {};
  normalizeMap(options).forEach(o => {
    res[o.key] = function(option) {
      return this.$store.commit(o.val, option);
    };
  });
  return res;
};

export const mapActions = options => {
  if (typeof options !== 'object') {
    console.log('本实例暂不支持module');
    return {};
  }
  const res = {};
  normalizeMap(options).forEach(o => {
    res[o.key] = function(option) {
      return this.$store.dispatch(o.val, option);
    };
  });
  return res;
};

export default {
  install,
  Store
};
