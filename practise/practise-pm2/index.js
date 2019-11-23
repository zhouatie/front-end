const app = require('express')()

app.get('*', (req, res) => {
  console.log(req.query)
  console.log(req.header)
  console.log(Object.keys(req))
  res.json({
    code: 0,
    message: 'success'
  })
})
app
  .post('*', (req, res) => {
    console.log(req.body)
    console.log(req.params, 'params')
    res.json({
      code: 0,
      message: 'success'
    })
  })

app.listen(9000, () => {
  console.log('启动成功！')
})