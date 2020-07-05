window.addEventListener('load', function () {
  // 页面加载完成后 注册serviceWorker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((registeration) => {
      console.log(registeration.scope);
    });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('change');
    });
  }
  if (!navigator.onLine) {
    window.addEventListener('online', () => {
      console.log('更新');
    });
  }
});
