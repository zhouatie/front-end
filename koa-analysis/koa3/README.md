# 核心内容

ctx 上下文获取属性 + ctx.body

核心用到了 `__defineGetter__`/ `__defineSetter__`

koa 源码中是用的 delegates 包，delegates 包就是用了这两个方法来获取与设置的
