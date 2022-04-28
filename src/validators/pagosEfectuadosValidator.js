import { MONTO_MINIMO, ARREGLO_VACIO } from "@/utils/constantes";

export function validacionCamposVacios( egresosAValidar ) {

    const { grupo, concepto, monto, estadoPago, metodoPago,  } = egresosAValidar;
    console.log("validacionCamposVacios", egresosAValidar);
    if ( validarNullUndefineVacioNan( grupo )) {
        alert("EL CAMPO GRUPO ES OBLIGATORIO");
        return false;
    }
    if ( validarNullUndefineVacioNan( concepto )) {
        alert("EL CAMPO CONCEPTO ES OBLIGATORIO");
        return false;
    }
    if ( validarNullUndefineVacioNan( monto )) {
        alert("EL CAMPO MONTO ES OBLIGATORIO ");
        return false;
    }
    if (monto < MONTO_MINIMO) {
        alert(`EL MONTO MINIMO ES DE ${MONTO_MINIMO}`);
        return false;
    }
    if ( validarNullUndefineVacioNan( concepto )) {
        alert("EL CAMPO CONCEPTO ES OBLIGATORIO");
        return false;
    }
    if ( validarNullUndefineVacioNan( estadoPago )) {
        alert("EL CAMPO YA PAGADO ES OBLIGATORIO");
        return false;
    }
    if ( validarNullUndefineVacioNan( metodoPago )) {
        alert("EL CAMPO METODO DE PAGO ES OBLIGATORIO");
        return false;
    }

    return true;
}

export function validacionTablaVacia( validarFactura, fechaPago ) {
    console.log(validarFactura.length);
    if ( validarFactura.length == ARREGLO_VACIO ) {
        alert("DEBE AGREGAR EGRESOS");
        return false;
    }
    return true
}


export function validarFechaVacia( fechaPago ){
    if (validarNullUndefineVacioNan( fechaPago )) {
        alert("DEBE AGREGAR UNA FECHA DE PAGO");
        return false;
    }
    return true;
}
export function validarNullUndefineVacioNan( valor ) {
    return [NaN, undefined, null, ''].includes( valor );
}