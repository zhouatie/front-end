export function createRoute(record, location) {
  const matched = [];
  while (record) {
    matched.unshift(record);
    record = record.parent;
  }

  return {
    matched,
    ...location,
  };
}

export default class History {
  constructor(router) {
    this.router = router;
    this.current = createRoute(null, {
      path: '/',
    });
    console.log(this.current, 'current')
  }

  transitionTo(location, callback) {
    const r = this.router.match(location);
    this.current = r;
    callback && callback();
    this.cb && this.cb(r)
    console.log(r);
  }

  listen(cb) {
    this.cb
  }
}
