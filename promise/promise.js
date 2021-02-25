class Promise {
  static RESOLVED = 'resolved';
  static REJECTED = 'rejected';
  static PENDING = 'pending';

  constructor(task) {
    this.state = Promise.PENDING;
    this.resolveQueue = [];
    this.rejectQueue = [];
    this.value = undefined;
    try {
      task(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      task(this.reject.bind(this));
    }
  }

  resolve(val) {
    setTimeout(() => {
      this.value = val;
      if (this.state === Promise.RESOLVED) return;
      this.state = Promise.RESOLVED;
      while (this.resolveQueue.length) {
        this.resolveQueue.shift().call(this, val);
      }
    });
  }
  reject(val) {
    setTimeout(() => {
      this.value = val;
      if (this.state === Promise.REJECTED) return;
      this.state = Promise.REJECTED;
      while (this.rejectQueue.length) {
        this.rejectQueue.shift().call(this, val);
      }
    });
  }

  then(onResolve, onReject) {
    return new Promise((resolve, reject) => {
      if (typeof onResolve === 'function') {
        const fn = (val) => {
          const result = onResolve(val);
          if (result instanceof Promise) {
            result.then(resolve, reject);
          } else {
            resolve(result);
          }
        };
        this.resolveQueue.push(fn);
      } else {
        reject();
        this.resolveQueue.push(reject);
      }
    });
  }

  catch(onReject) {
    return new Promise(undefined, onReject);
  }

  static race(arr) {
    return new Promise((resolve, reject) => {
      arr.forEach((o) => {
        if (o instanceof Promise) {
          o.then(resolve, reject);
        } else {
          resolve();
        }
      });
    });
  }

  static all(arr) {
    let length = 0;
    const values = [];
    return new Promise((resolve, reject) => {
      arr.forEach((o) => {
        o.then((res) => {
          values.push(res);
          if (values.length === values.length) {
            resolve(values)
          }
        }).catch(() => {
          reject();
        });
      });
    });
  }
}

module.exports = Promise;
