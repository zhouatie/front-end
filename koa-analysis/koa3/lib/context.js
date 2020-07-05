const proto = {};

function defineGetter(target, key) {
  proto.__defineGetter__(key, function () {
    return this[target][key];
  });
}

function defineSetter(target, key) {
  proto.__defineSetter__(key, function (val) {
    return (this[target][key] = val);
  });
}

defineGetter('request', 'url');
defineGetter('request', 'query');
defineGetter('request', 'path');

defineGetter('response', 'body');
defineSetter('response', 'body');

module.exports = proto;
