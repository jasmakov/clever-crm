import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/:areaId/storage/:strId',
    name: 'instorage',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Instorage.vue')
  },
  {
    path: '/enter/:areaId/:invId',
    name: 'enter',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Enter.vue')
  },
  {
    path: '/:areaId/move-table',
    name: 'move-table',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/MoveTable.vue')
  },
  {
    path: '/:areaId/storage',
    name: 'storage',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Storage.vue')
  },
  {
    path: '/:areaId/production',
    name: 'production',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Production.vue')
  },
  {
    path: '/:areaId/:catId',
    name: 'category',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Category.vue')
  },
  {
    path: '/:areaId',
    name: 'home',
    meta: { layout: 'main', auth: true },
    component: () => import('../views/Category.vue')
  },
  {
    path: '/',
    name: 'choose',
    meta: { layout: 'empty', auth: true },
    component: () => import('../views/Choose.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router
