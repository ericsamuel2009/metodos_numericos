import router from './router'
import store from './store'
var boleano = false
router.beforeEach(async(to, from, next) => {
  if (boleano) {
    next()
  } else {
    try {
      const accessRoutes = await store.dispatch('permission/generateRoutes', [
        'admin'
      ])

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      // eslint-disable-next-line require-atomic-updates
      boleano = true
      next({ ...to, replace: true })
    } catch (error) {
      console.error('error en permission -> ' + error)
    }
  }
})
