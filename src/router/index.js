import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  // },
  {
    path: '/',
    name: 'solicitud',
    component: () => import('../views/SolicitudView.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: 'localhost',
  routes
})

export default router