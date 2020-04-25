export function createRoute (record, location) {
  const res = []
  if (record) {
    while(record) {
      res.unshift(record)
      record = record.parent
    }
  }

  return {
    ...location,
    matched: res
  }
}

function ensureSlash() {
  if (window.location.hash) {
    return
  }
  window.location.hash = '/'
}

class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    })
    // 保证有hash
    ensureSlash()
  }


  transitionTo(location, callback) { //需要屏蔽多次相同的跳转
    console.log(this.router.match(location), 'www')
    this.current = this.router.match(location)
    callback && callback()
  }
}

export default History;
