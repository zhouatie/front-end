const fs = require('fs')
const path = require('path')

// fs.stat(path.resolve(__dirname, 'http.js'), (err, statObj) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(Object.keys(statObj))
//   for (var i in statObj) {
//     console.log(i)
//   }
//   console.log(statObj.isFile(), 'isFile')
//   console.log(statObj.isDirectory(), 'isDirectory')
//   console.log(statObj.isBlockDevice(), 'isBlockDevice')
// })

// fs.readFile(path.resolve(__dirname, './test.json'), 'utf-8', (err, buffer) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(Buffer.from(buffer).toString())
//   fs.writeFile(path.resolve(__dirname, './data.txt'), buffer, (a, b) => {
//     console.log(a, b, 'ab')
//   })
// })

// fs.mkdir('./b/c', { recursive: true }, (err) => {
//   console.log(err, 'err')
// })

// fs.rmdir('./a', { recursive: true }, (err) => {
//   console.log(err, 'err')
// })