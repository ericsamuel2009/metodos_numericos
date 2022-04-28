import { constantRoutes } from '@/router'
export function SET_ROUTES(state, routes) {
  state.addRoutes = routes
  state.routes = constantRoutes.concat(routes)
}
