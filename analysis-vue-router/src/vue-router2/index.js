import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes);

    this.history = new HashHistory(this);
  }

  match(location) {
    console.log(location, 'location');
    return this.matcher.match(location);
  }

  push(location) {
    this.history.transitionTo(location, () => {
      window.location.hash = location;
    });
  }

  init(app) {
    const history = this.history;
    const setupListener = () => {
      history.setupListener();
    };
    history.transitionTo(history.getCurrentLocation(), setupListener);
    history.listen((route) => {
      app._route = route;
    });
  }
}

VueRouter.install = install;

export default VueRouter;
