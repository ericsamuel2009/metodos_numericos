// eslint-disable-next-line
import { lastValueFrom } from 'rxjs'
import { PREFIX_CATEGORIAS } from '@/utils/constantes'
import { metodoParaConsultar, convertUrl } from '@/shared'

export async function getCategorias({ commit }, queryFilter) {
  const nuevoPath = convertUrl(queryFilter.filter)
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_CATEGORIAS}/listar?${nuevoPath}pageNumber=${queryFilter.pageNumber}&pageSize=${queryFilter.pageSize}`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('setCategorias', responseObservavleToPromise$)
}

export async function saveCategoria({ commit }, oGrupos) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_CATEGORIAS}/save`,
      `POST`,
      { 'Content-Type': 'application/json' },
      oGrupos
    )
  )
  commit('setSaveGrupos', responseObservavleToPromise$)
}

export async function deleteCategorias({ commit }, grupoID) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_CATEGORIAS}/delete?id=${grupoID}`,
      `DELETE`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('setDeleteGrupos', responseObservavleToPromise$)
}
