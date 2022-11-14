import { loginUser, logoutUser, getInfoUser } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

// eslint-disable-next-line
import { lastValueFrom } from 'rxjs'
// import { PREFIX_USUARIO } from '@/utils/constantes'
// import { metodoParaConsultar } from '@/shared'

export async function login({ commit }, userInfo) {
  const { username, password } = userInfo
  // const responseObservavleToPromise$ = await lastValueFrom(
  //   metodoParaConsultar(
  //     `${process.env.VUE_APP_URL}/${PREFIX_USUARIO}/usuario/${username}/${password}`,
  //     `GET`,
  //     { 'Content-Type': 'application/json' }
  //   )
  // )
  // const { response } = responseObservavleToPromise$
  // commit('SET_TOKEN', response.token)
  // setToken(response.token)

  return new Promise((resolve, reject) => {
    loginUser({ username: username.trim(), password: password })
      .then((response) => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// get user info
export function getInfo({ commit, state }) {
  return new Promise((resolve, reject) => {
    getInfoUser(state.token)
      .then((response) => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// user logout
export function logout({ commit, state, dispatch }) {
  return new Promise((resolve, reject) => {
    logoutUser(state.token)
      .then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// remove token
export function resetToken({ commit }) {
  return new Promise((resolve) => {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    removeToken()
    resolve()
  })
}

// dynamically modify permissions
export async function changeRoles({ commit, dispatch }, role) {
  const token = role + '-token'

  commit('SET_TOKEN', token)
  setToken(token)

  const { roles } = await dispatch('getInfo')

  resetRouter()

  // generate accessible routes map based on roles
  const accessRoutes = await dispatch('permission/generateRoutes', roles, {
    root: true
  })
  // dynamically add accessible routes
  router.addRoutes(accessRoutes)

  // reset visited views and cached views
  dispatch('tagsView/delAllViews', null, { root: true })
}
