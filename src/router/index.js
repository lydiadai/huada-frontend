import { createRouter, createWebHashHistory } from 'vue-router'
import errorRoutes from './routes/errorRoutes.js'

const routes = [
  {
    path: '/',
    name: 'Default',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@pages/login.vue'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@pages/home.vue'),
  },

  {
    path: '/literature',
    name: '文献馆',
    component: () => import('@pages/literature/index.vue'),
  },
  {
    path: '/literature/navigate',
    name: '索引',
    component: () => import('@pages/literature/navigate.vue'),
  },
  {
    path: '/literature/upload',
    name: '文献上传',
    component: () => import('@pages/literature/upload.vue'),
  },
  {
    path: '/literature/doi',
    name: 'DOI索引',
    component: () => import('@pages/literature/doi.vue'),
  },
  {
    path: '/literature/preview',
    name: '查阅文档',
    component: () => import('@pages/literature/view-pdf.vue'),
  },

  // Notice, Keep error routes at the end of routes array
  ...errorRoutes,
]

if (import.meta.env.MODE === 'development') {
  routes.splice(1, 0, {
    path: '/test-login',
    name: 'TestLogin',
    component: () => import('@pages/test/test-login.vue'),
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
