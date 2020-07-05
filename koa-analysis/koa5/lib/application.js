const EventEmitter = require('events');
const http = require('http');
const request = require('./request.js');
const response = require('./response.js');
const context = require('./context.js');
const Stream = require('stream')

class Application extends EventEmitter {
  constructor() {
    super();
    // 这里Object.create是为了防止每个koa实例都公用一个request/responce/context等
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
    this.middlewares = [];
  }
  use(callback) {
    this.middlewares.push(callback);
  }
  createContext(req, res) {
    // 这里Object.create是防止每次请求都复用这三个对象】
    // 因为每次请求都是独立的
    let request = Object.create(this.request);
    let response = Object.create(this.response);
    let context = Object.create(this.context);

    context.request = request;
    context.response = response;
    context.request.req = context.req = req;
    context.response.res = context.res = res;
    return context;
  }

  compose(ctx) {
    const dispatch = (i) => {
      if (i === this.middlewares.length) return Promise.resolve();
      return Promise.resolve(this.middlewares[i](ctx, () => dispatch(i + 1)));
    };

    return dispatch(0);
  }

  handleRequrest(req, res) {
    let ctx = this.createContext(req, res);
    this.compose(ctx).then(() => {
      if (typeof ctx.body === 'string') {
        res.end(ctx.body);
      } else if (ctx.body instanceof Stream) {
        ctx.body.pipe(res);
      } else if (typeof ctx.body === 'object') {
        res.end(JSON.stringify(ctx.body));
      }
    });
  }

  listen(...args) {
    let server = http.createServer(this.handleRequrest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
