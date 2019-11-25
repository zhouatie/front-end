const fs = require('fs')
const path = require('path')
const obj = fs.stat(path.resolve(__dirname, 'http.js'), (err, statObj) => {
  if (err) {
    return console.log(err)
  }
  console.log(Object.keys(statObj))
  for (var i in statObj) {
    console.log(i)
  }
  console.log(statObj.isFile(), 'isFile')
  console.log(statObj.isDirectory(), 'isDirectory')
  console.log(statObj.isBlockDevice(), 'isBlockDevice')
})
