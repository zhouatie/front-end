import Vue from 'vue'
import App from './App.vue'
import routes from './router'
import './public-path';
import VueRouter from 'vue-router';

Vue.config.productionTip = false


let router = null;
let instance = null;

export async function bootstrap() {
  console.log('vue app bootstraped');
}

export async function mount(props) {
  console.log('props from main framework', props);
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue2' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    render: h => h(App),
  }).$mount('#app');
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}

mount()