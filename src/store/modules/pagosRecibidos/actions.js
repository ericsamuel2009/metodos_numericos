// eslint-disable-next-line
import { pipe, retry, of, finalize, lastValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { INTENTO_CONEXION, PREFIX_PAGOS_RECIBIDOS } from '@/utils/constantes'
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

// FUNCIONES REQUERIDAS
export function metodoParaConsultar(url, method, headers = null, body = null) {
  return ajax({ url, method, headers, body }).pipe(
    retry(INTENTO_CONEXION),
    catchError((err) => of(err)),
    finalize(() => console.log(`✨ PETICION ${method} FINALIZADA ✨`))
  )
}

export function convertUrl(valor) {
  let urlConcat = ''
  for (const resultnew in valor) {
    if (
      valor[resultnew] &&
      valor[resultnew] !== '' &&
      Object.entries(valor[resultnew]).length > 0
    ) {
      urlConcat += `${resultnew}=${valor[resultnew]}&`
    }
  }
  return urlConcat
}
