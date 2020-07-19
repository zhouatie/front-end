module.exports = function() {
  return async (ctx, next) => {
    if (ctx.method === 'POST') {
      const chunks = []
      await new Promise((resolve, reject) => {
        ctx.req.on('data', function(chunk) {
          chunks.push(chunk)
        })
        ctx.req.on('end', function() {
          console.log(Buffer.concat(chunks).toString(), 'tostring')
          ctx.request.body = Buffer.concat(chunks).toString()
          resolve()
        })
      })
    }
    await next()
  }
}