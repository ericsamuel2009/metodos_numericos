export function addErrorLog({ commit }, log) {
  commit('ADD_ERROR_LOG', log)
}

export function clearErrorLog({ commit }) {
  commit('CLEAR_ERROR_LOG')
}
