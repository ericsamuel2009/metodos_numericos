import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

import PagosRecibidos from './modules/pagosRecibidos'
import PagosEfectuados from './modules/pagosEfectuados'
import Recursos from './modules/recursos'
// import tableRouter from './modules/table'
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'mdi-view-dashboard-outline', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  }
]

export const asyncRoutes = [
  // tableRouter,
  PagosRecibidos,
  PagosEfectuados,
  Recursos,
  {
    path: '/informes',
    component: Layout,
    redirect: '/Informes',
    children: [
      {
        path: 'list',
        component: () => import('@/views/informes/templates/index'),
        name: 'Informes',
        meta: { title: 'Reporte de Informe', icon: 'mdi-chart-arc' }
      }
    ]
  },
  {
    path: '/calendario',
    component: Layout,
    redirect: '/calendario',
    children: [
      {
        path: 'list',
        component: () => import('@/views/calendario/templates/index'),
        name: 'calendario',
        meta: { title: 'Calendario', icon: 'mdi-calendar-blank-multiple' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
