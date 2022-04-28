/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/PagosRecibidos',
  component: Layout,
  redirect: '/PagosRecibidos/list',
  alwaysShow: true,
  name: 'ComponentDemo',
  meta: {
    title: 'PagosRecibidos',
    icon: 'mdi-cash-plus'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/pagosRecibidos/templates/listarPagosRecibidos'),
      name: 'ListarPagosRecibidos',
      meta: { title: 'Listar PagosRecibidos' }
    },
    {
      path: 'agregar',
      component: () => import('@/views/pagosRecibidos/templates/agregarPagosRecibidos'),
      name: 'AgregarPagosRecibidos',
      meta: { title: 'Agregar PagosRecibido' }
    }
  ]
}

export default componentsRouter
