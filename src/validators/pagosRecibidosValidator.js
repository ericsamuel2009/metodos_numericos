import {
  MONTO_MINIMO,
  ARREGLO_VACIO,
  VALIDAR_ESTATUS,
  INFORMACION_MENSAJE_NOTIFICACION
} from '@/utils/constantes'
// import methodsMixins from '@/mixins/methodsMixins'
export function validacionCamposVacios(ingresosAValidar) {
  const { cliente, motivo, monto } = ingresosAValidar
  console.log(cliente)
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

export function validarStatus(status, vs) {
  const statusResponse500 =
    status?.toString()?.match(VALIDAR_ESTATUS.STATUS_500) ||
    [0].includes(status)
  const statusResponse400 = status
    ?.toString()
    ?.match(VALIDAR_ESTATUS.STATUS_400)
  if (statusResponse500) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.MENSAJE_FLAT_ACTIVO,
      null,
      INFORMACION_MENSAJE_NOTIFICACION.COLOR_DE_MENSAJE_ERROR,
      INFORMACION_MENSAJE_NOTIFICACION.ICONO_DEL_MENSAJE('mdi-progress-close'),
      INFORMACION_MENSAJE_NOTIFICACION.POSICION_ARRIBA_IZQUIERDA_DEL_MENSAJE,
      INFORMACION_MENSAJE_NOTIFICACION.TITULO_ERROR_CONEXION,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_ERROR_CONEXION,
      vs
    )
    console.log(`ERROR DE CONEXION.... (╯ ͠° ͟ʖ ͡°)╯┻━┻`)
    return false
  }
  if (statusResponse400) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.MENSAJE_FLAT_ACTIVO,
      undefined,
      INFORMACION_MENSAJE_NOTIFICACION.COLOR_DE_MENSAJE_ERROR,
      INFORMACION_MENSAJE_NOTIFICACION.ICONO_DEL_MENSAJE('mdi-progress-close'),
      INFORMACION_MENSAJE_NOTIFICACION.POSICION_ARRIBA_IZQUIERDA_DEL_MENSAJE,
      INFORMACION_MENSAJE_NOTIFICACION.TITULO_BAD_REQUEST,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_BAD_REQUEST,
      vs
    )
    console.log(`ERROR DE BAD REQUEST.... ಠ益ಠ`)
    return false
  }
  return true
}

export function notificacion(
  flat = null,
  progress = null,
  color = INFORMACION_MENSAJE_NOTIFICACION.COLOR_DE_MENSAJE_PRIMARIO,
  icono = null,
  posicion = null,
  titulo = INFORMACION_MENSAJE_NOTIFICACION.TITULO_DEFAULT,
  descripcion = INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_DEFAULT,
  vs
) {
  // methodsMixins.methods.mesajeDeRespuestas( flat, progress, color, icono, posicion, titulo, descripcion, vs)
}
