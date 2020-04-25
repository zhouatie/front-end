const install = (Vue) => {
  Vue.mixin({
    beforeCreate() {
      // 判断是否根组件
      if (this.$options.router) {
        // 保存根实例
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init();
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot;
      }
      Object.defineProperty(this, '$router', {
        get() {
          console.log('historyrrr', this.history);
          return this._routerRoot._router;
        },
      });
      Object.defineProperty(this, '$route', {
        get() {
          return this.history.current;
        },
      });
    },
  });

  Vue.component('router-view', {
    render() {
      console.log(this, 'ttt');
      return <a>router</a>;
    },
  });
  Vue.component('router-link', {
    render() {
      return <div>link</div>;
    },
  });
};

export default install;
