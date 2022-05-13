// eslint-disable-next-line
import { lastValueFrom } from 'rxjs'
import { PREFIX_PAGOS_RECIBIDOS } from '@/utils/constantes'
import { metodoParaConsultar, convertUrl } from '@/shared'

export async function getSavePagosRecibidos({ commit }, informacionToSave) {
  /* const responseObservavleToPromise$ = */ await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/pagosrecibidos/save`,
      `POST`,
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      informacionToSave
    )
  )
  // commit('setSavePagosRecibidos', responseObservavleToPromise$)
}

export async function getTodosPagosRecibidos({ commit }, queryFilter) {
  const nuevoPath = convertUrl(queryFilter.filter)
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_PAGOS_RECIBIDOS}/listar?${nuevoPath}pageNumber=${queryFilter.pageNumber}&pageSize=${queryFilter.pageSize}`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  console.log(responseObservavleToPromise$)
  commit('SetTodosPagosRecibidosList', responseObservavleToPromise$)
}

export async function getUnPagosRecibido({ commit }, referencia) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_PAGOS_RECIBIDOS}/buscarPagoRecibido/${referencia}`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  console.log(responseObservavleToPromise$)
  commit('setUnPagosRecibido', responseObservavleToPromise$)
}

export async function deleteUnPagoRecibido({ commit }, referencia) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_PAGOS_RECIBIDOS}/delete/${referencia}`,
      `DELETE`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('setDeleteUnPagosRecibido', responseObservavleToPromise$)
}
