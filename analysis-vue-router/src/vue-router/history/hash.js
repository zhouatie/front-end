import History from './base';

class HashHistory extends History {
  constructor(router) {
    super(router);
  }

  getCurrentLocation() {
    return window.location.hash.slice(1); // 除了# 后面的就是路径
  }
  
  setupHashListener() {
    window.addEventListener('hashchange', (e) => {
      this.transitionTo(window.location.hash.slice(1));
    });
  }
}

export default HashHistory;
