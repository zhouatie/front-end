const fs = require('fs')

const st = fs.createReadStream('./a.txt', {
  flags: 'r',
  start: 0,
  end: 5, // 读取的总长度
  highWaterMark: 2 // 一次读取的长度
})

let arr = []
st.on('open', () => {
  console.log('open----')
})
st.on('data', (buffer) => {
  console.log(buffer.toString())
  arr.push(buffer)
})
st.on('close', () => {
  // arr.toString()
  console.log(Buffer.concat(arr).toString(), 'close----')
})