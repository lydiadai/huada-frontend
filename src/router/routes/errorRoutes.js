export default [
  {
    path: '/error/:code',
    name: 'Error',
    component: () => import('@pages/error/index.vue'),
  },
  {
    path: '/:pathMath(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
  },
]
