// koa的核心功能就是创建一个服务，没了

const Koa = require('koa')
const app = new Koa()

app.use(async(ctx) => {
  ctx.status = 403
  ctx.body = 'hello world'
})

app.listen(3000)
