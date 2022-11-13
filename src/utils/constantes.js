export const MONTO_MINIMO = 1000
export const ARREGLO_VACIO = 0
export const VALIDAR_ESTATUS = {
  STATUS_100: /(1[0-9])\w+/g,
  STATUS_200: /(2[0-9])\w+/g,
  STATUS_300: /(3[0-9])\w+/g,
  STATUS_400: /(4[0-9])\w+/g,
  STATUS_500: /(5[0-9])\w+/g
}
export const METODO_PAGO_EFECTIVO = 'CASH'
export const METODO_PAGO_CUENTA = 'CARD'
export const VALOR_NEUTRAL = 0
export const LIMITE_CARACTERES_COMENTARIOS = 40
export const INFORMACION_MENSAJE_NOTIFICACION = {
  ES_MENSAJE_CLOSE_TRUE: true,
  ES_MENSAJE_CLOSE_FALSE: true,
  TIPO_DE_MENSAJE_EXITOSO: 'success',
  TIPO_DE_MENSAJE_ERROR: 'error',
  TIPO_DE_MENSAJE_ADVERTENCIA: 'warning',
  COLOR_DE_MENSAJE_PERSONALIZADO_RGB: (colorRgb) => colorRgb,
  ICONO_DEL_MENSAJE: (icono) => `<i class='mdi ${icono}' ></i>`,
  TITULO_ERROR_CONEXION: 'Error De Conexion',
  DESCRIPCION_ERROR_CONEXION_500: 'Ocurrio un Error al conectar porfavor Intenta mas tarde... 🤒',
  TITULO_BAD_REQUEST: 'Error 404 Bad Request',
  DESCRIPCION_BAD_REQUEST_400: 'Ocurrio un Error de peticion Comunicate con el administrador... ✋',
  TITULO_CONEXION_LOST: 'Caida De Servidor',
  DESCRIPCION_CONEXION_LOST: 'Ocurrio un Error de conexion Porfavor Contacta al Administrador 😡',
  TITULO_DEFAULT: 'Mensaje Por Defecto',
  DESCRIPCION_DEFAULT: 'Debes Agregar alguna descripcion... 🤯'
}
export const INTENTO_CONEXION = 5
export const PREFIX_PAGOS_RECIBIDOS = 'pagosrecibidos'
export const PREFIX_PAGOS_EFECTUADOS = 'pagosefectuados'
export const PREFIX_CATEGORIAS = 'categorias'
export const PREFIX_CONCEPTO = 'concepto'
export const PREFIX_USUARIO = 'usuarios'
