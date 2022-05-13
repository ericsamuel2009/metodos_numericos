export function aTodosPagosRecibidos(state) {
  return state.todosPagosRecibidosResponseList
}

export function oUnPagoRecibido(state) {
  console.log('state', state.unPagoRecibido)
  return state.unPagoRecibido
}

export function sDeletePagosRecibidos(state) {
  return state.estadoDeletePagosRecibido
}
