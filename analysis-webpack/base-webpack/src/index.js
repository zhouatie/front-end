window.onload = function() {
  import('./main.js').then(a => {
    console.log(a, 'a')
    a.a()
  })
}