const EventEmitter = require('events');
const fs = require('fs');

class ReadStream extends EventEmitter {
  constructor(path, options) {
    super()
    this.path = path
    this.start = options.start || 0
    this.end = options.end || 0
    this.flags = options.flags || 'r'
    this.highWaterMark = options.highWaterMark || 2
    this.pos = this.start

    this.open()

    this.on('newListener', (type) => {
      if (type === 'data') {
        this.read()
      }
    })
  }

  open() {
    fs.open(this.path, this.flags, (err, fd) => {
      if (err) this.emit('error')
      this.fd = fd
      this.emit('open', fd)
    })
  }

  read() {
    if (!this.fd) {
      this.once('open', (fd) => {
        if (fd) this.read()
      })
      return
    }
    const buffer = Buffer.alloc(this.highWaterMark);
    fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos, (err, bytesRead) => {
      if (err) {
        this.emit('error', err)
      }
      if (bytesRead) {
        // console.log(bytesRead, 'bytesRead')
        this.pos += bytesRead
        this.emit('data', buffer)
        this.read()
      } else {
        this.emit('end', this.fd)
        this.close()
      }
    })
  }

  close() {
    fs.close(this.fd, () => {
      console.log('close this read')
    })
  }
}

module.exports = ReadStream