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

// fs.open('./dist.txt', 'w', (err, fd) => {
//   if (err) console.error(err)

//   fs.write(fd, buffer, 0, 3, 0, (err, written) => {
//     if (err) console.error(err)
//     console.log(written)
//   })
// })

// 拷贝
// 防止内存占用过高，读一点写一点
// function copy(source, target) {
//   fs.open(source, 'r', (err, rfd) => {
//     if (err) console.error(`打开文件source出错${err}`)
//     fs.open(target, 'w', (err, wfd) => {
//       if (err) console.error(`打开target文件错误${err}`)
//       const buffer = Buffer.alloc(5)
//       let roffset = 0
//       let woffset = 0
//       function next() {
//         fs.read(rfd, buffer, 0, buffer.length, roffset, (err, bytesRead) => {
//           if (err) console.log(`读取source出错${err}`)
//           if (bytesRead) {
//             fs.write(wfd, buffer, 0, bytesRead, woffset, (err, written) => {
//               if (err) console.log(`写入出错${err}`)
//               roffset += bytesRead
//               woffset += written
//               next()
//             })
//           } else {
//             fs.close(rfd, () => {})
//             fs.close(wfd, () => {})
//             console.log('写入成功')
//           }
//         })
//       }
//       next()
//     })
//   })
// }

// copy('./a.txt', './b.txt')

// fs.mkdir('a/b/', () => {

// })

// 递归创建文件
// function mkdir(dir, cb) {
//   const arr = dir.split('/')
//   let index = 0
//   function next() {
//     const current = arr.slice(0, ++index).join('/')

//     fs.stat(current, (err, statObj) => {
//       if (err) {
//         if (index > arr.length) {
//           cb()
//           console.log(index, arr.length)
//         } else {
//           fs.mkdir(current, () => {})
//           next()
//         }
//       } else {
//         next()
//       }
//     })
//   }
//   next()
// }

// mkdir('a/b/c/d', () => {
//   console.log('执行完成')
// })
const path = require('path')

function rmdirSync(dir) {
  const arr = dir.split('/')
  // let index = 0
  const dirs = fs.readdirSync(dir).map(o => path.join(dir, o))
  console.log(dirs, 'dirs')
  for (let i = 0; i < dirs.length; i++) {
    const current = dirs[i]
    const statObj = fs.statSync(current)

    if (statObj.isDirectory()) {
      rmdirSync(current)
    } else {
      fs.unlinkSync(current)
    }
  }
  fs.rmdirSync(dir)
}

rmdirSync('a')