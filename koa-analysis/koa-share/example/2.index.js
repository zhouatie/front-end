const Koa = require('../lib/application.js')
const app = new Koa()

app.use(async(ctx) => {
  console.log(ctx.req.path, 1)
  console.log(ctx.request.req.path, 2)
  console.log(ctx.request.path, 3)
  console.log(ctx.path, 4)
  ctx.body = 'hello'
  // ctx.res.end('hello world')
})

app.listen(5000)