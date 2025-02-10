import type { RouteRecordRaw } from 'vue-router'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/Auth/LoginPage.vue')
  },
  {
    path: '/sign-up',
    name: 'signUp',
    component: () => import('@/pages/Auth/SignUpPage.vue')
  },
  {
    path: '/forget-password',
    name: 'forgetPassword',
    component: () => import('@/pages/Auth/ForgetPasswordPage.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/Shared/DashboardPage.vue')
  }
]

export default routes
