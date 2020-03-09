const btn = document.createElement('button')
btn.innerHTML = 'button'

btn.addEventListener('click', () => {
  import(/*webpackChunkName: 'title'*/'./title.js').then((res) => {
    console.log(res, 'loaded title')
  })
})
document.body.appendChild(btn)