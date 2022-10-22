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
    },
    {
      path: 'simpsonAbierto',
      component: () => import('@/views/integralesDefinidas/simpsonAbierto'),
      name: 'simpson Abierto',
      meta: { title: 'metodo simpson Abierto' }
    },
    {
      path: 'tSimpson13',
      component: () => import('@/views/integralesDefinidas/tSimpson13'),
      name: 't. Simpson 1/3',
      meta: { title: 'metodo Simpson 1/3', icon: 'mdi-chart-bell-curve' }
    },
    {
      path: 'tSimpson38',
      component: () => import('@/views/integralesDefinidas/tSimpson38'),
      name: 't. Simpson 3/8',
      meta: { title: 'metodo t. Simpson 3/8' }
    }
  ]
}

export default componentsRouter
