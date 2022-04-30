export function setListConceptos(state, payload) {
    state.conceptosList = payload;
}

export function setSaveConceptos(state, payload) {
    state.conceptoResponse = payload;
}

export function setDeleteConcepto(state, payload) {
    state.deleteConceptoResponse = payload;
}