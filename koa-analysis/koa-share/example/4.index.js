const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const path = require('path')

app.use(static(path.resolve(__dirname, './public')))

app.use(bodyParser());

app.use(async (ctx, next) => {
  // console.log(ctx.path, 'path')
  if (ctx.method === 'POST' && ctx.path === '/login') {
    console.log(ctx.request.body)
    // await new Promise((resolve) => {

    //   const chunks = []
    //   ctx.req.on('data', (chunk) => {
    //     chunks.push(chunk)
    //   })
    //   ctx.req.on('end',function() {
    //     console.log(chunks.toString(), 'chunks')
    //     resolve()
    //   })
    // })
  }
  // next()
 
  ctx.body = 'hahah'
});

app.listen(5000)