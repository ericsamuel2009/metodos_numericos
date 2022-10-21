import Layout from '@/layout'

const componentsRouter = {
  path: '/integralesDefinidas',
  component: Layout,
  redirect: '/integralesDefinidas/trapezoidal',
  alwaysShow: true,
  name: 'integralesDefinidas',
  meta: {
    title: 'Integrales Definidas',
    icon: 'mdi-math-integral'
  },
  children: [
    {
      path: 'trapezoidal',
      component: () => import('@/views/integralesDefinidas/trapezoidal'),
      name: 'trapezoidal',
      meta: { title: 'metodo trapezoidal' }
    },
    {
      path: 'jorgeBoole',
      component: () => import('@/views/integralesDefinidas/jorgeBoole'),
      name: 'jorgeBoole',
      meta: { title: 'metodo jorgeBoole' }
    }
  ]
}

export default componentsRouter
