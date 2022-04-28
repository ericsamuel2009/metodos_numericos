export const MONTO_MINIMO = 1000;
export const ARREGLO_VACIO = 0;
export const VALIDAR_ESTATUS = {
    STATUS_100 : /(1[0-9])\w+/g,
    STATUS_200 : /(2[0-9])\w+/g,
    STATUS_300 : /(3[0-9])\w+/g,
    STATUS_400 : /(4[0-9])\w+/g,
    STATUS_500 : /(5[0-9])\w+/g
}
export const METODO_PAGO_EFECTIVO = "EFECTIVO";
export const METODO_PAGO_CUENTA = "CUENTA";
export const VALOR_NEUTRAL = 0;
export const LIMITE_CARACTERES_COMENTARIOS = 40
export const INFORMACION_MENSAJE_NOTIFICACION = {
    MENSAJE_FLAT_ACTIVO: true,
    MENSAJE_PROGRESS_ACTIVO: true,
    MENSAJE_FLAT_INACTIVO: false,
    MENSAJE_PROGRESS_INACTIVO: false,
    COLOR_DE_MENSAJE_PRIMARIO: 'primary',
    COLOR_DE_MENSAJE_EXITOSO: 'success',
    COLOR_DE_MENSAJE_ERROR: 'danger',
    COLOR_DE_MENSAJE_ADVERTENCIA: 'warning',
    COLOR_DE_MENSAJE_OSCURO: 'dark',
    COLOR_DE_MENSAJE_PERSONALIZADO_RGB: colorRgb => colorRgb,
    ICONO_DEL_MENSAJE : icono => `<i class='mdi ${icono}' ></i>`,
    POSICION_ABAJO_DERECHA_DEL_MENSAJE: "bottom-right",
    POSICION_ARRIBA_DERECHA_DEL_MENSAJE: "top-right",
    POSICION_ABAJO_IZQUIERDA_DEL_MENSAJE: "bottom-left",
    POSICION_ARRIBA_IZQUIERDA_DEL_MENSAJE: "top-left",
    POSICION_ABAJO_CENTRADO_DEL_MENSAJE: "bottom-cente",
    POSICION_ARRIBA_CENTRADO_DEL_MENSAJE: "top-center",
    TITULO_ERROR_CONEXION: "Error De Conexion",
    DESCRIPCION_ERROR_CONEXION: "Ocurrio un Error al conectar porfavor Intenta mas tarde... 🤒",
    TITULO_BAD_REQUEST: "Error 404 Bad Request",
    DESCRIPCION_BAD_REQUEST: "Ocurrio un Error de peticion Comunicate con el administrador... ✋",
    TITULO_DEFAULT: "Mensaje Por Defecto",
    DESCRIPCION_DEFAULT: "Debes Agregar alguna descripcion... 🤯",
}
export const INTENTO_CONEXION = 5