import Vue from 'vue'
import VueRouter from '../vue-router'
// import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

console.log(VueRouter, 'VueRouter')
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children: [
      {
        path: 'a',
        name: 'about.a',
        component: {
          template: '<div>a</div>'
        }
      },
      {
        path: 'b',
        name: 'about.b',
        component: {
          template: '<div>b</div>'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
