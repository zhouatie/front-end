const url = require('url')

const request = {
  get url() {
    return this.req.url
  },
  get path() {
    // console.log(this.req, 'req')
    return url.parse(this.req.url).pathname
  },
  get query() {
    return url.parse(this.req.url, true).query
  }
}
module.exports = request