const EventsEmitter = require('events');
const http = require('http');
const context = require('./context.js');
const request = require('./request.js');
const response = require('./response.js');
class Application extends EventsEmitter {
  constructor() {
    super();
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.context = Object.create(context);
    this.middlewares = [];
  }
  use(callback) {
    this.middlewares.push(callback);
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    context.req = request.req = req
    context.res = response.res = res
    context.request = request
    context.response = response
    return context
  }
  compose(ctx) {
    const dispatch = (index) => {
      if (this.middlewares.length === index) return Promise.resolve()
      console.log(this.middlewares.length, index, 'length')
      return Promise.resolve(this.middlewares[index](ctx, () => dispatch(index + 1)))
    }
    return dispatch(0)
  }
  handleRequest(req, res) {
    const ctx = this.createContext(req, res);
    this.compose(ctx).then(() => {
      console.log(ctx.body)
      res.end(ctx.body)
    })
  }

  listen(arg) {
    http.createServer(this.handleRequest.bind(this)).listen(arg);
  }
}

module.exports = Application;
