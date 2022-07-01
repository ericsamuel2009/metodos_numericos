export default class DatosPagiosEfectuados {
  constructor(monto, estadopago, estado, abono, referencia) {
    this.monto = monto
    this.estadopago = estadopago
    this.estado = estado
    this.abono = abono
    this.referencia = referencia
    this.pagoEfectuadoToSend = {}
  }
  get getPagosEfectuados() {
    this.pagoEfectuadoToSend.monto = parseFloat(this.monto)
    this.pagoEfectuadoToSend.estadopago = (this.monto === this.abono) ? 1 : this.estadopago
    this.pagoEfectuadoToSend.estado = this.estado
    this.pagoEfectuadoToSend.abono = parseFloat(this.abono)
    this.pagoEfectuadoToSend.referencia = this.referencia
    return this.pagoEfectuadoToSend
  }
}
