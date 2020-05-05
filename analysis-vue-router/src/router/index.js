import Vue from 'vue';
import VueRouter from '../vue-router3';
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'a',
        name: 'about.a',
        component: {
          render: (h) => <div>this is a</div>,
        },
      },
      {
        path: 'b',
        name: 'about.b',
        component: {
          render: (h) => <div>this is b</div>,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
