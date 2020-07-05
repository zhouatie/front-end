# 核心内容

koa 不会跟原生或者 express 一样。在 callback 中返回 req, res 了。而是将 req,res 与自身创建的 request, response 组合在一起创建一个新的 context 返回给 callback

## context

扩展属性,在 request 中扩展 url/path/query 等属性
