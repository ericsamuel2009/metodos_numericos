export function setListPagosEfectuados(state, payload) {
  state.aPagosEfectuadosList = payload
}

export function setSavePagosEfectuados(state, payload) {
  state.oPagosEfectuadosResponse = payload
}

export function setEfectuarPago(state, payload) {
  state.efectuarPagpResponse = payload
}
