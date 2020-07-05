# 核心内容

就是封装了http的服务。调用events包

## 核心代码

```js
const Koa = require('./lib/application.js');
const app = new Koa();

app.use(async (req, res) => {
  res.end('hello world');
});

app.listen(3000);
```

## 介绍属性

```js
// ctx包括req、res（这两个是原生的）
// ctx.request/response 是koa自己封装的，（且request中有req，response总有res）

// 当读取url的时候 都可以访问
ctx.req.url
ctx.request.req.url

ctx.request.url
ctx.url //（ctx.url 实际上就是读取ctx.request.url)

// 也有一些是原生上面没有的属性，比如path
// 只能通过ctx.request.path 或者 ctx.path获取
```
