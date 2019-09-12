class TPromise {
  static PENDING = 'PENDING';
  static RESOLVED = 'RESOLVED';
  static REJECTED = 'REJECTED';

  constructor (handler) {
    this.resolveQueues = []
    this.rejectQueues = []
    this.finallyQueues = []
    this.state = TPromise.PENDING
    handler(this._resolve.bind(this), this._reject.bind(this))
  }

  _resolve (val) {
    let observer = new MutationObserver(() => {
      if (this.state !== TPromise.PENDING) return;
      this.state = TPromise.RESOLVED
      this.value = val
      let handler;
      while ( handler = this.resolveQueues.shift()) {
        handler(this.value)
      }
      while ( handler = this.finallyQueues.shift()) {
        handler()
      }
    })

    observer.observe(document.body, {
      attributes: true
    })
    document.body.setAttribute('_promise', Date.now())
  }

  _reject (val) {
    let observer = new MutationObserver(() => {
      if (this.state !== TPromise.PENDING) return;
      this.state = TPromise.REJECTED
      this.value = val
      let handler;
      while ( handler = this.rejectQueues.shift()) {
        handler(this.value)
      }
      while ( handler = this.finallyQueues.shift()) {
        handler()
      }
    })

    observer.observe(document.body, {
      attributes: true
    })
    document.body.setAttribute('_promise', Date.now())
  }

  then (resolveHandler, rejectHandler) {
    return new TPromise((resolve, reject) => {
      
      if (typeof resolveHandler === 'function') {
        const newResolveHandler = (val) => {
          let result = resolveHandler(val)
          if (result instanceof TPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        }
        this.resolveQueues.push(newResolveHandler)
      } else {
        this.resolveQueues.push(resolve)
      }

      if (typeof rejectHandler === 'function') {
        const newRejectHandler = (val) => {
          let result = rejectHandler(val)
          if (result instanceof TPromise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        }
        this.rejectQueues.push(newRejectHandler)
      } else {
        this.rejectQueues.push(reject)
      }
    })
  }

  catch (rejectHandler) {
    return this.then(undefined, rejectHandler)
  }

  finally (finallyHandler) {
    return new TPromise((resolve, reject) => {
      if (typeof finallyHandler === 'function') {
        const newFinallyHandler = () => {
          const result = finallyHandler()
          if (result instanceof TPromise) {
            result.finally(() => {
              if (this.state === TPromise.RESOLVED) resolve(this.value)
              else if (this.state === TPromise.REJECTED) reject(this.value)
            })
          } else {
            if (this.state === TPromise.RESOLVED) resolve(this.value)
            else if (this.state === TPromise.REJECTED) reject(this.value)
          }
        }
        this.finallyQueues.push(newFinallyHandler)
      }
    })
  }

  static all (arr) {
    let i = 0
    const resArr = []
    return new TPromise((resolve, reject) => {
      arr.forEach((it, index) => {
        it.then(res => {
          i++
          resArr[index] = res
          if (i >= arr.length) {
            resolve(resArr)
          }
        }).catch(err => {
          reject(err)
        })
      });
    })
  }

  static race (arr) {
    return new TPromise((resolve, reject) => {
      arr.forEach((it, index) => {
        it.then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      });
    })
  }

  static resolve (val) {
    return new TPromise((resolve, reject) => {
      if (val instanceof TPromise) {
        val.then(resolve, reject)
      } else {
        resolve(val)
      }
    })
  }

  // 注意reject 会原封不动的将参数返回
  static reject (val) {
    return new TPromise((resolve, reject) => {
      reject(val)
    })
  }
}
