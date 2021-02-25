const Promise = require('./promise.js')

const promise = new Promise((resolve, reject) => {
  console.log(1)
  setTimeout(() => {
    resolve(4)
  }, 2000)
  console.log(2)
})

promise.then(res => {
  console.log('promise 响应 => ', res)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(6)
    }, 0)
  })
}).then(res => {
  console.log(res)
  console.log(7)
}).then(res => {
  console.log(9)
  // throw Error;
}).catch(() => {
  console.log('错误')
  return Promise.reject()
}).catch(() => {
  console.log('错误2')
})