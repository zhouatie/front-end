import History from './base';

function ensureSlash() {
  if (!window.location.hash) {
    window.location.hash = '/';
  }
}
export default class HashHistory extends History {
  constructor(router) {
    super(router);
    ensureSlash();
  }

  getCurrentLocation() {
    return window.location.hash.slice(1);
  }

  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(this.getCurrentLocation());
    });
  }
}
