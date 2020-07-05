const Koa = require('./lib/application.js');
const app = new Koa();

app.use(async (ctx) => {
  console.log(ctx.url, 'wuwwuwu');
  ctx.body = 'hello world'
  console.log(ctx.body, 'ctx.body')
  console.log(ctx.response.body, 'response.body')
  ctx.body = 'hello zhou atie'
  
  // ctx.res.send('hello world');
});

app.listen(3000);
