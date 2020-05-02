import RouterView from './components/router-view';
import RouterLink from './components/router-link';

const install = (Vue) => {
  Vue.mixin({
    beforeCreate() {
      // 判断是否根组件
      if (this.$options.router) {
        // 保存根实例
        this._routerRoot = this;
        this._router = this.$options.router;

        // 给当前根实例增加了一个_route属性 他取自当前的history中的current
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
    }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route;
    },
  });
  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router;
    },
  });

  Vue.component('router-view', RouterView);
  Vue.component('router-link', RouterLink);
};

export default install;
