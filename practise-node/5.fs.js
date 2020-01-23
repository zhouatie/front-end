const fs = require('fs')

// console.log(fs, 'fs')

// 分配三个内存
// const buffer = Buffer.alloc(3)

// fs.open('./dist.txt', 'r', (err, fd) => {
//   if (err) console.error(err)

//   fs.read(fd, buffer, 0, 3, 2, (err, bytesRead) => {
//     if (err) console.error(err)
//     console.log(bytesRead, 'bytesRead')
//     console.log(buffer.toString())
//     fs.close(fd)
//   })
// })

// const buffer = Buffer.from('珠峰')
fs.open('./dist.txt', 'w', (err, fd) => {
  if (err) console.error(err)

  fs.write(fd, buffer, 0, 3, 0, (err, written) => {
    if (err) console.error(err)
    console.log(written)
  })
})