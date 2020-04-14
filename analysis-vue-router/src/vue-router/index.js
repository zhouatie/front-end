class VueRouter {
  constructor() {}
}

VueRouter.install = (Vue) => {
  Vue.mixin({
    beforeCreate () {
      if (this.$options.router) {
        this._routerRroot = this;
        this._rooter = this.router;
      } else {
        this._routerRroot = this.$parent
      }
    }
  })
}