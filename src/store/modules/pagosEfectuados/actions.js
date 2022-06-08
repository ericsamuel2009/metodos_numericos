// eslint-disable-next-line
import { lastValueFrom } from 'rxjs'
import { PREFIX_PAGOS_EFECTUADOS } from '@/utils/constantes'
import { metodoParaConsultar, convertUrl } from '@/shared'

export async function getListPagosEfectuados({ commit }, queryFilter) {
  const nuevoPath = convertUrl(queryFilter.filter)
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_PAGOS_EFECTUADOS}/listar?${nuevoPath}pageNumber=${queryFilter.pageNumber}&pageSize=${queryFilter.pageSize}`,
      `GET`,
      { 'Content-Type': 'application/json' }
    )
  )
  commit('setListPagosEfectuados', responseObservavleToPromise$)
}

export async function savePagosEfectuados({ commit }, informacion) {
  const responseObservavleToPromise$ = await lastValueFrom(
    metodoParaConsultar(
      `${process.env.VUE_APP_URL}/${PREFIX_PAGOS_EFECTUADOS}/save`,
      `POST`,
      {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      informacion
    )
  )
  commit('setSavePagosEfectuados', responseObservavleToPromise$)
}
