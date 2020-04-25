import HashHistory from './history/hash';
import install from './install.js';
import createMatcher from './create-match';

class VueRouter {
  constructor(options) {
    this.history = new HashHistory(this);
    this.match = createMatcher(options.routes);
  }

  init(app) {
    console.log(app);
    // const history = this.history;
    // history.transitionTo(
    //   history.getCurrentLocation(),
    //   history.setupHashListener()
    // );
  }
}

VueRouter.install = install;

export default VueRouter;
