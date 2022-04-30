import Layout from '@/layout'

const componentsRouter = {
  path: '/pagosEfectuados',
  component: Layout,
  redirect: '/pagosEfectuados/list',
  alwaysShow: true,
  name: 'pagosEfectuados',
  meta: {
    title: 'Egresos',
    icon: 'mdi-cash-plus'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/pagosEfectuados/templates/listarPagosEfectuados'),
      name: 'ListarPagosEfectuados',
      meta: { title: 'Listar Egresos' }
    },
    {
      path: 'agregar',
      component: () => import('@/views/pagosEfectuados/templates/agregarPagosEfectuados'),
      name: 'AgregarPagosEfectuados',
      meta: { title: 'Agregar Egreso' }
    }
  ]
}

export default componentsRouter
