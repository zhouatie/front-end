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