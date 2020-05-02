import HashHistory from './history/hash';
import install from './install.js';
import createMatcher from './create-matcher';
import { createRoute } from './history/base';

class VueRouter {
  constructor(options) {
    // matcher 匹配器 处理树形结构 将他扁平化
    // 这里会返回2个方法 addRoute match 匹配对应的结果
    this.matcher = createMatcher(options.routes || []);
    // 内部需要使用hash history 这里要进行路由初始化工作
    // vue 的内部路由分为三种
    this.history = new HashHistory(this);
  }

  match(location) {
    return this.matcher.match(location);
  }
  init(app) {
    // 初始化方法
    // app 是最顶层的vue 实例

    // 需要获取到路由的路径 进行跳转 匹配到对应的组件进行渲染
    // 当第一次匹配完成后 需要监听路由的变化 之后完成后续的更新操作
    const history = this.history;
    const setupHashListener = () => {
      // 跳转成功后的回调
      history.setupHashListener();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener);
    // 监听路由变化
    history.listen((route) => {
      // 订阅好，等会路径属性一变化就执行此方法
      app._route = route;
    });
  }
  push(location) {
    this.history.transitionTo(location, () => {
      window.location.hash = location;
    });
  }
}

VueRouter.install = install;

export default VueRouter;
