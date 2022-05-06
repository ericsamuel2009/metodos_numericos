import {
  MONTO_MINIMO,
  ARREGLO_VACIO,
  VALIDAR_ESTATUS,
  INFORMACION_MENSAJE_NOTIFICACION
} from '@/utils/constantes'
import methodsMixins from '@/mixins/methodsMixins'
export function validacionCamposVacios(ingresosAValidar) {
  const { cliente, motivo, monto } = ingresosAValidar
  if (validarNullUndefineVacioNan(cliente)) {
    alert('DEBE AGREGAR UN CLIENTE')
    return
  }
  if (validarNullUndefineVacioNan(motivo)) {
    alert('DEBE AGREGAR UN MOTIVO')
    return
  }
  if (validarNullUndefineVacioNan(monto)) {
    alert('DEBE AGREGAR UN MONTO')
    return
  }
  if (monto < MONTO_MINIMO) {
    alert(`EL MONTO MINIMO ES DE ${MONTO_MINIMO}`)
    return false
  }
  return true
}

export function validacionTablaVacia(validarFactura) {
  if (validarFactura.length === ARREGLO_VACIO) {
    alert('DEBE AGREGAR INGRESOS')
    return false
  }
  return true
}

export function validarFechaVacia(fechaPago) {
  if (validarNullUndefineVacioNan(fechaPago)) {
    alert('DEBE AGREGAR UNA FECHA DE PAGO')
    return false
  }
  return true
}
export function validarNullUndefineVacioNan(valor) {
  return [NaN, undefined, null, ''].includes(valor)
}

export function validarStatus(status) {
  console.log(status)
  const errorConeccion = [0].includes(status)
  const statusResponse500 = status?.toString()?.match(VALIDAR_ESTATUS.STATUS_500)
  const statusResponse400 = status?.toString()?.match(VALIDAR_ESTATUS.STATUS_400)
  if (errorConeccion) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_CONEXION_LOST,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.log(`ERROR DE CONEXION.... (ノಠ益ಠ) ┻━┻`)
    return true
  }
  if (statusResponse500) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_ERROR_CONEXION_500,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.log(`ERROR DE CONEXION.... (╯ ͠° ͟ʖ ͡°)╯┻━┻`)
    return true
  }
  if (statusResponse400) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_BAD_REQUEST_400,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.log(`ERROR DE BAD REQUEST.... ಠ益ಠ`)
    return true
  }
  return false
}

export function notificacion(showClose, message, type) {
  methodsMixins.methods.message(showClose, message, type)
}
