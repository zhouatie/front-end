class TPromise {
  static PENDING = 'PENDING';
  static RESOLVED = 'RESOLVED';
  static REJECTED = 'REJECTED';

  constructor (handler) {
    this.resolveQueues = []
    this.state = TPromise.PENDING
    handler(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve (val) {
    let observer = new MutationObserver(() => {
      if (this.state !== TPromise.PENDING) return;
      this.state = TPromise.RESOLVED
      if (val instanceof TPromise) {
        val.then((res) => {
          this.value = res;
          let handler;
          while ( handler = this.resolveQueues.shift()) {
            handler(this.value)
          }
        })
      } else {
        this.value = val
        let handler;
        while ( handler = this.resolveQueues.shift()) {
          handler(this.value)
        }
      }
    })

    observer.observe(document.body, {
      attributes: true
    })
    document.body.setAttribute('_promise', Date.now())
  }

  _reject () {
    if (this.state !== TPromise.PENDING) return;
    this.state = TPromise.REJECTED
  }

  then (resolveHandler) {
    return new TPromise((resolve, reject) => {
      
      if (typeof resolveHandler === 'function') {
        const newResolveHandler = (val) => {
          let result = resolveHandler(val)
          resolve(result)
        }
        this.resolveQueues.push(newResolveHandler)
      } else {
        resolve(this.value)
      }
    })
  }
}

// export default TPromise