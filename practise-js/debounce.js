function debounce(fn, wait, immediate) {
  let timer = null;

  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      const callnow = !timer;
      timer = setTimeout(() => {
        timer = null;
      })
      if (callnow) fn.apply(this, arguments)
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

function debounce(fn, wait, immediate) {
  let timer,context,arg;
  let later = () => setTimeout(() => {
    timer = null;
    if (!immediate) {
      fn.apply(context, arg);
    }
  }, wait)
  
  return function(...params) {
    if (!timer) {
      timer = later();
      if (immediate) {
        fn.apply(this, params)
      } else {
        arg = params;
        context = this;
      }
    } else {
      clearTimeout(timer)
      timer = later();
    }
  }
}

console.log(lodash, 'lodash')