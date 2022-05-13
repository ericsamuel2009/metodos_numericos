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
      path: 'categorias/crear',
      component: () => import('@/views/categorias/templates/agregarCategoria'),
      name: 'CrearCategorias',
      meta: { title: 'Crear Categorias' },
      hidden: true
    },
    {
      path: 'conceptos',
      component: () => import('@/views/conceptos/templates/listarConceptos'),
      name: 'ListarConceptos',
      meta: { title: 'Conceptos' }
    },
    {
      path: 'conceptos/crear',
      component: () => import('@/views/conceptos/templates/agregarConceptos'),
      name: 'AgregarConceptos',
      meta: { title: 'Crear Conceptos' },
      hidden: true
    }
  ]
}

export default componentsRouter
