const Koa = require('./lib/application.js');
const app = new Koa();

app.use(async (ctx) => {
  console.log(ctx.request.url);
  console.log(ctx.request.path);
  console.log(ctx.request.query);
  ctx.res.end('hellow')
  // ctx.res.send('hello world');
});

app.listen(3000);
