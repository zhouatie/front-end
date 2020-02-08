// const fs = require('fs')

// const st = fs.createReadStream('./a.txt', {
const ReadStream = require('./stream.js')
const st = new ReadStream('./a.txt', {
  flags: 'r',
  start: 0,
  end: 5, // 读取的总长度
  highWaterMark: 4 // 一次读取的长度，如果不填 默认读取64k
})

let arr = []
st.on('open', (fd) => {
  console.log('open----', fd)
})
st.on('data', (buffer) => {
  console.log(buffer.toString())
  arr.push(buffer)
})
st.on('end', () => {
  // arr.toString()
  console.log(Buffer.concat(arr).toString(), 'close----')
})
