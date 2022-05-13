// eslint-disable-next-line
import { lastValueFrom } from 'rxjs'
import { PREFIX_CONCEPTO } from '@/utils/constantes'
import { metodoParaConsultar, convertUrl } from '@/shared'

export async function getListConceptos({ commit }, queryFilter) {
  const nuevoPath = convertUrl(queryFilter.filter)
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_CONCEPTO}/listar?${nuevoPath}pageNumber=${queryFilter.pageNumber}&pageSize=${queryFilter.pageSize}`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('setConceptos', responseObservavleToPromise$)
}

export async function saveConcepto({ commit }, informacionConcepto) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_CONCEPTO}/save`,
      `POST`,
      { 'Content-Type': 'application/json' },
      informacionConcepto
    )
  )
  commit('setSaveConceptos', responseObservavleToPromise$)
}

// import Axios from 'axios';

// export async function getListConceptos({commit}, grupo) {
//     let conceptosList = await Axios.get(`${process.env.VUE_APP_URL}/concepto/listall`)
//     .catch(error=> error.response)
//     commit('setListConceptos',conceptosList)
// }

// export async function saveConcepto({commit}, informacionConcepto ) {
//     console.log(informacionConcepto);
//     let conceptosResponse = await Axios.post(`${process.env.VUE_APP_URL}/concepto/save`, informacionConcepto)
//     .catch(error=> error.response)
//     commit('setSaveConceptos',conceptosResponse)
// }

// export async function deleteConcepto({commit}, conceptoID) {
//     let conceptoResponse = await Axios.delete(`${process.env.VUE_APP_URL}/concepto/delete?id=${conceptoID}`)
//     .catch(error => error.response)
//     commit("setDeleteConcepto",conceptoResponse)
// }
