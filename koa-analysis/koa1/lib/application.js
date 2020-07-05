const EventEmitter = require('events');
const http = require('http');

class Application extends EventEmitter {
  use(callback) {
    this.callback = callback;
  }

  handleRequrest(req, res) {
    this.callback(req, res);
  }

  listen(...args) {
    let server = http.createServer(this.handleRequrest.bind(this));
    server.listen(...args);
  }
}

module.exports = Application;
