// eslint-disable-next-line
import { pipe, retry, of, finalize, lastValueFrom } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { INTENTO_CONEXION } from '@/utils/constantes'

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
