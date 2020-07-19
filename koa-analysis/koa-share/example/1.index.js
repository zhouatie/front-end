const Koa = require('../lib/application.js');
const app = new Koa();

app.use(async (req, res) => {
  res.end('hello wrold')
});

app.listen(5000);