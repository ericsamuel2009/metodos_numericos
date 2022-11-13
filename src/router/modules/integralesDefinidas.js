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
      path: 'tSimpson13',
      component: () => import('@/views/integralesDefinidas/tSimpson13'),
      name: 'TSimpson13',
      meta: { title: 'metodo Simpson 1/3', icon: 'mdi-chart-bell-curve', titleDashboard: 'Simpson 1/3', color: 'icon-light-blue' }
    },
    {
      path: 'tSimpson38',
      component: () => import('@/views/integralesDefinidas/tSimpson38'),
      name: 'TSimpson38',
      meta: { title: 'metodo Simpson 3/8', icon: 'mdi-chart-sankey', titleDashboard: 'Simpson 3/8', color: 'icon-red' }
    },
    {
      path: 'boole',
      component: () => import('@/views/integralesDefinidas/jorgeBoole'),
      name: 'JeorgeBoole',
      meta: { title: 'metodo Boole', icon: 'mdi-chart-bell-curve-cumulative', titleDashboard: 'Boole', color: 'icon-green' }
    },
    {
      path: 'trapezoidal',
      component: () => import('@/views/integralesDefinidas/trapezoidal'),
      name: 'Trapezoidal',
      meta: { title: 'metodo trapezoidal', icon: 'mdi-chart-line-variant', titleDashboard: 'trapezoidal', color: 'icon-blue' }
    },
    {
      path: 'simpsonAbierto',
      component: () => import('@/views/integralesDefinidas/simpsonAbierto'),
      name: 'SimpsonAbierto',
      meta: { title: 'metodo simpson Abierto', icon: 'mdi-chart-ppf', titleDashboard: 'simpson Abierto', color: 'icon-red' }
    }
  ]
}

export default componentsRouter
