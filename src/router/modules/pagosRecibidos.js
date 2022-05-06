import Layout from '@/layout'

const componentsRouter = {
  path: '/pagosRecibidos',
  component: Layout,
  redirect: '/pagosRecibidos/list',
  alwaysShow: true,
  name: 'PagosRecibidos',
  meta: {
    title: 'Ingresos',
    icon: 'mdi-cash-plus'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/pagosRecibidos/templates/listarPagosRecibidos'),
      name: 'ListarPagosRecibidos',
      meta: { title: 'Listar Ingresos' }
    },
    {
      path: 'editar/:referencia',
      component: () => import('@/views/pagosRecibidos/templates/editarPagosRecibidos'),
      name: 'EditarrPagosRecibidos',
      meta: { title: 'Editar Ingreso', noCache: true, activeMenu: '/pagosRecibidos/list' },
      hidden: true
    },
    {
      path: 'agregar',
      component: () => import('@/views/pagosRecibidos/templates/agregarPagosRecibidos'),
      name: 'AgregarPagosRecibidos',
      meta: { title: 'Agregar Ingreso' }
    }
  ]
}

export default componentsRouter
