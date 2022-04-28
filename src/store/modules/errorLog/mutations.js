export function ADD_ERROR_LOG(state, log) {
  state.logs.push(log)
}

export function CLEAR_ERROR_LOG(state) {
  state.logs.splice(0)
}
