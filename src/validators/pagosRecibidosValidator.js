import {
  MONTO_MINIMO,
  ARREGLO_VACIO
} from '@/utils/constantes'
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
