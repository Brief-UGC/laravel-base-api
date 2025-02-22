import type { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/Auth/LoginPage.vue')
  },
  {
    path: '/forget-password',
    name: 'forgetPassword',
    component: () => import('@/pages/Auth/ForgetPasswordPage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue')
  }
]

export default routes
