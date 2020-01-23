console.log(parseInt('111', 2))
console.log(0b11) // 二进制
console.log(011) // 八进制
console.log(0x11) // 十六进制

// 中文 gbk是占用2个字节，utf8是三个字节 node默认只支持utf8

// utf8包括了世界上的所有语言

const buffer = Buffer.from('珠')
console.log(buffer)

const buf1 = Buffer.from('珠峰前端课程')
const buf2 = Buffer.from('前端')

// buf1.write('后端', 3, 9, 'utf8')

console.log(buf1.toString())

console.log(buf1.indexOf(buf2))