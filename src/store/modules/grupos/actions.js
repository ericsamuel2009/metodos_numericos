import Axios from 'axios';

export async function getListGrupos({commit}) {
    let gruposList = await Axios.get(`${process.env.VUE_APP_URL}/categorias/All`)
    .catch(error=> error.response)
    commit('setListGrupos',gruposList)
}

export async function saveGrupos({commit}, oGrupos) {
    let gruposResponse = await Axios.post(`${process.env.VUE_APP_URL}/categorias/save`, oGrupos)
    .catch(error=> error.response)
    commit('setSaveGrupos',gruposResponse)
}

export async function deleteGrupos({commit}, grupoID) {
    let gruposResponse = await Axios.delete(`${process.env.VUE_APP_URL}/categorias/delete?id=${grupoID}`)
    .catch(error => error.response)
    commit("setDeleteGrupos",gruposResponse)
}