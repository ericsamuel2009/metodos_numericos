export function addView({ dispatch }, view) {
  dispatch('addVisitedView', view)
  dispatch('addCachedView', view)
}

export function addVisitedView({ commit }, view) {
  commit('ADD_VISITED_VIEW', view)
}

export function addCachedView({ commit }, view) {
  commit('ADD_CACHED_VIEW', view)
}

export function delView({ dispatch, state }, view) {
  return new Promise(resolve => {
    dispatch('delVisitedView', view)
    dispatch('delCachedView', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}

export function delVisitedView({ commit, state }, view) {
  return new Promise(resolve => {
    commit('DEL_VISITED_VIEW', view)
    resolve([...state.visitedViews])
  })
}

export function delCachedView({ commit, state }, view) {
  return new Promise(resolve => {
    commit('DEL_CACHED_VIEW', view)
    resolve([...state.cachedViews])
  })
}

export function delOthersViews({ dispatch, state }, view) {
  return new Promise(resolve => {
    dispatch('delOthersVisitedViews', view)
    dispatch('delOthersCachedViews', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}

export function delOthersVisitedViews({ commit, state }, view) {
  return new Promise(resolve => {
    commit('DEL_OTHERS_VISITED_VIEWS', view)
    resolve([...state.visitedViews])
  })
}

export function delOthersCachedViews({ commit, state }, view) {
  return new Promise(resolve => {
    commit('DEL_OTHERS_CACHED_VIEWS', view)
    resolve([...state.cachedViews])
  })
}

export function delAllViews({ dispatch, state }, view) {
  console.log('ENTRO')
  return new Promise(resolve => {
    dispatch('delAllVisitedViews', view)
    dispatch('delAllCachedViews', view)
    resolve({
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    })
  })
}

export function delAllVisitedViews({ commit, state }) {
  return new Promise(resolve => {
    commit('DEL_ALL_VISITED_VIEWS')
    resolve([...state.visitedViews])
  })
}

export function delAllCachedViews({ commit, state }) {
  return new Promise(resolve => {
    commit('DEL_ALL_CACHED_VIEWS')
    resolve([...state.cachedViews])
  })
}

export function updateVisitedView({ commit }, view) {
  commit('UPDATE_VISITED_VIEW', view)
}
