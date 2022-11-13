import {
  VALIDAR_ESTATUS,
  INFORMACION_MENSAJE_NOTIFICACION
} from '@/utils/constantes'
import methodsMixins from '@/mixins/methodsMixins'
export function validarStatus(status) {
  const errorConeccion = [0].includes(status)
  const statusResponse500 = status?.toString()?.match(VALIDAR_ESTATUS.STATUS_500)
  const statusResponse400 = status?.toString()?.match(VALIDAR_ESTATUS.STATUS_400)
  if (errorConeccion) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_CONEXION_LOST,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.error(`ERROR DE CONEXION.... (ノಠ益ಠ) ┻━┻`)
    return true
  }
  if (statusResponse500) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_ERROR_CONEXION_500,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.error(`ERROR DE SERVIDOR.... (╯ ͠° ͟ʖ ͡°)╯┻━┻`)
    return true
  }
  if (statusResponse400) {
    notificacion(
      INFORMACION_MENSAJE_NOTIFICACION.ES_MENSAJE_CLOSE_TRUE,
      INFORMACION_MENSAJE_NOTIFICACION.DESCRIPCION_BAD_REQUEST_400,
      INFORMACION_MENSAJE_NOTIFICACION.TIPO_DE_MENSAJE_ERROR
    )
    console.error(`ERROR DE BAD REQUEST.... ಠ益ಠ`)
    return true
  }
  console.info(`SIN ERRORES DE PETICIÓN (ง ͠° ͟ل͜ ͡°)ง`)
  return false
}

export function notificacion(showClose, message, type) {
  methodsMixins.methods.messageToast(showClose, message, type)
}
