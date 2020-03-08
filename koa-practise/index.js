const Koa = require('koa');

const app = new Koa()

app.use((ctx, next) => {
  console.log(111)
  ctx.body = 'xixi'
  next()
})
app.use((ctx) => {
  console.log(22)
  ctx.body = 'jj'
})

app.listen(3000)