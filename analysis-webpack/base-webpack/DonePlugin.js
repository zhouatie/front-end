class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', function (stat) {
      console.log(stat, '编译完成')
    })
  }
}

module.exports = DonePlugin