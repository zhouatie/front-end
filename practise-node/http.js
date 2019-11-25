const http = require('http')

const server = http.createServer(function(req, res) {
  // console.log(Object.keys(req), Object.keys(res), 'server')
  // console.log(req.url)
  let arr = [];
    req.on('data',function (chunk) {
        arr.push(chunk);
    });
    req.on('end',function () {
        console.log(Buffer.concat(arr).toString());
        // 要让服务器和客户端说 当前发送完毕
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain;charset=utf-8')


        res.end('结束了'); // write + close
    })
})

server.listen(9000, () => {
  console.log('listening 9000')
})