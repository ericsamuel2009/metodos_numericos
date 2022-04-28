export function toggleSideBar({ commit }) {
  commit('TOGGLE_SIDEBAR')
}

export function closeSideBar({ commit }, { withoutAnimation }) {
  commit('CLOSE_SIDEBAR', withoutAnimation)
}

export function toggleDevice({ commit }, device) {
  commit('TOGGLE_DEVICE', device)
}

export function setSize({ commit }, size) {
  commit('SET_SIZE', size)
}
