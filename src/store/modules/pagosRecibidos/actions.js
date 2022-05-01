// eslint-disable-next-line
import { pipe, retry, of, finalize, lastValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { INTENTO_CONEXION } from '@/utils/constantes'

export async function getTodosPagosRecibidosList({ commit }) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/pagosrecibidos/listarAll`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('SetTodosPagosRecibidosList', responseObservavleToPromise$)
}

export function metodoParaConsultar(url, method, headers = null, body = null) {
  return ajax({ url, method, headers, body }).pipe(
    retry(INTENTO_CONEXION),
    catchError((err) => of(err)),
    finalize(() => console.log('✨ PETICION FINALIZADA ✨'))
  )
}
