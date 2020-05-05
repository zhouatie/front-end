export const createRoute = (record, opt) => {
  let parent = record;
  const matched = [];
  while (parent) {
    matched.unshift(parent);
    parent = parent.parent;
  }
  return {
    matched,
    ...opt,
  };
};
export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: window.location.hash.slice(1),
    });
  }

  transitionTo(location, callback) {
    const r = this.router.match(location);
    if (
      r.path === this.current.path &&
      this.current.matched.length === r.matched.length
    ) {
      return false;
    }
    this.current = r;
    callback && callback(r);
    this.cb && this.cb(r);
  }

  listen(cb) {
    this.cb = cb;
  }
}
