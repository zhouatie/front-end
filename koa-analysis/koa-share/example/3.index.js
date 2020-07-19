const Koa = require('../lib/application.js');
const app = new Koa();

const logger = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('logger');
      resolve()
    }, 3000);
  });
};
// 洋葱模型
app.use(async (ctx, next) => {
  console.log(1)
  await next();
  console.log(2)
  ctx.body = 'hello1';
});

app.use(async (ctx, next) => {
  console.log(3);
  await logger();
  next();
  console.log(4);
  ctx.body = 'hello2';
});

app.use((ctx, next) => {
  console.log(5);
  next();
  console.log(6);
  ctx.body = 'hello3';
});

app.listen(5000);


