const proto = {}

function defineGetter(target, key) {
  return proto.__defineGetter__(key, function() {
    return this[target][key]
  })
}

function defineSetter(target, key) {
  return proto.__defineSetter__(key, function(value) {
    return this[target][key] = value
  })
}

defineGetter('request', 'url')
defineGetter('request', 'path')

defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = proto