const Koa = require('./lib/application.js');
const app = new Koa();

app.use(async (req, res) => {
  res.end('hello world');
});

app.listen(3000);
  