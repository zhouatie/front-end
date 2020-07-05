const EventEmitter = require('events');
const http = require('http');
const request = require('./request.js');
const response = require('./response.js');
const context = require('./context.js');

class Application extends EventEmitter {
  constructor() {
    super();
    // 这里Object.create是为了防止每个koa实例都公用一个request/responce/context等
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
  }
  use(callback) {
    this.callback = callback;
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
  handleRequrest(req, res) {
    let ctx = this.createContext(req, res);
    this.callback(ctx);
  }

  listen(...args) {
    let server = http.createServer(this.handleRequrest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
