function bind(fn, obj, ...rest) {
  obj.newFn = fn;
  obj.newFn =  function() {
    obj.newFn(...rest)
  }
}

var a = {
  b: 2
}
bind(function(c) {
  console.log(this.b, c)
}, a, 1);