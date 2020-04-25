import History from './base';

// base表示的是基类 我们所有实现的路由功能公共方法都可以放在History里
class HashHistory extends History {
  constructor(router) {
    super(router);
    this.router = router
  }

  getCurrentLocation() {
    return window.location.hash.slice(1); // 除了# 后面的就是路径
  }
  
  setupHashListener() {
    window.addEventListener('hashchange', (e) => {
      console.log('hashchange')
      this.transitionTo(window.location.hash.slice(1));
    });
  }
}

export default HashHistory;
