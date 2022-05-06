export function SetTodosPagosRecibidosList(state, payload) {
  state.todosPagosRecibidosResponseList = payload
}

export function setUnPagosRecibido(state, payload) {
  state.unPagoRecibido = payload
}

export function setDeleteUnPagosRecibido(state, payload) {
  state.estadoDeletePagosRecibido = payload
}
