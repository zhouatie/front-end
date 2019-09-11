import TPromise from './TPromise.js'

new TPromise((resolve, reject) => {
  // resolve()
  console.log(1)
  resolve()
})