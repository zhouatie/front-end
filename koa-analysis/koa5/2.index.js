// const Koa = require('koa');
const Koa = require('./lib/application.js');
const app = new Koa();
const fs = require('fs')
// 洋葱模型
app.use(async (ctx, next) => {
  // ctx.body = {name: 'atie'}
  // ctx.body = Buffer.from('zhouatie')
  ctx.body = fs.ReadStream('./1.txt')
});

app.listen(3000);
