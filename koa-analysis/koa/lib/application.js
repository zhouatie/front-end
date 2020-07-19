const EventsEmitter = require('events');
const http = require('http');
const context = require('./context.js');
const request = require('./request.js');
const response = require('./response.js');
// 为什么要继承error，比如实例会调用app.on('error')，这个时候就可以调用实例的$emit进行触发

class Koa extends EventsEmitter {
  constructor() {
    super();
    // TODO: 暂时假设use只添加一个中间件
    this.middlewares = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  use(callback) {
    this.middlewares.push(callback);
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    context.req = request.req = req;
    context.res = response.res = res;
    context.request = request;
    context.response = response;
    return context;
  }

  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.compose(ctx).then(_ => {
      res.end(ctx.body)
    });
  }

  compose(ctx) {
    const dispatch = (index) => {
      if (index === this.middlewares.length) return Promise.resolve();

      return Promise.resolve(this.middlewares[index](ctx, () => dispatch(index + 1)));
    }
    return dispatch(0);
  }

  listen(...params) {
    http.createServer(this.handleRequest.bind(this)).listen(...params);
  }
}

module.exports = Koa;
