import Axios from 'axios';

export async function getListConceptos({commit}, grupo) {
    let conceptosList = await Axios.get(`${process.env.VUE_APP_URL}/concepto/listall`)
    .catch(error=> error.response)
    commit('setListConceptos',conceptosList)
}

export async function saveConcepto({commit}, informacionConcepto ) {
    console.log(informacionConcepto);
    let conceptosResponse = await Axios.post(`${process.env.VUE_APP_URL}/concepto/save`, informacionConcepto)
    .catch(error=> error.response)
    commit('setSaveConceptos',conceptosResponse)
}

export async function deleteConcepto({commit}, conceptoID) {
    let conceptoResponse = await Axios.delete(`${process.env.VUE_APP_URL}/concepto/delete?id=${conceptoID}`)
    .catch(error => error.response)
    commit("setDeleteConcepto",conceptoResponse)
}