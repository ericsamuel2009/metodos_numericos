export default class DatosPagiosEfectuados {
  constructor(monto, estadoPago, estado, abono, referencia) {
    this.monto = monto
    this.estadoPago = estadoPago
    this.estado = estado
    this.abono = abono
    this.referencia = referencia
    this.pagoEfectuadoToSend = {}
  }
  get getPagosEfectuadosMandar() {
    this.pagoEfectuadoToSend.monto = parseFloat(this.monto)
    this.pagoEfectuadoToSend.estadoPago = (this.monto === this.abono) ? 1 : this.estadoPago
    this.pagoEfectuadoToSend.estado = this.estado
    this.pagoEfectuadoToSend.abono = parseFloat(this.abono)
    this.pagoEfectuadoToSend.referencia = this.referencia
    return this.pagoEfectuadoToSend
  }
}
