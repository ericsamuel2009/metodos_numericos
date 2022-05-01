import Layout from '@/layout'

const componentsRouter = {
  path: '/recursos',
  component: Layout,
  redirect: '/categorias/list',
  alwaysShow: true,
  name: 'recursos',
  meta: {
    title: 'Recursos',
    icon: 'mdi-alpha-r-circle-outline'
  },
  children: [
    {
      path: 'categorias',
      component: () => import('@/views/categorias/templates/listarCategorias'),
      name: 'ListarCategorias',
      meta: { title: 'Categorias' }
    },
    {
      path: 'conceptos',
      component: () => import('@/views/conceptos/templates/listarConceptos'),
      name: 'ListarConceptos',
      meta: { title: 'Conceptos' }
    }
  ]
}

export default componentsRouter
