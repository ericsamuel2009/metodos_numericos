<template>
  <div id="informe">
    <div class="app-container">
      <el-descriptions class="margin-top" title="Resumen de Gastos" :column="3" border>
        <template slot="extra">

          <filterDinamic :datos="aTablaCabecera">
            <template #btn-accion="{ row }">
              <el-form-item size="mini">
                <el-button
                  type="primary"
                  round
                  :loading="listLoading"
                  @click="consultaPagosEfectuados(row)"
                >{{ textLoad }}</el-button>
              </el-form-item>
            </template>
          </filterDinamic>

        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user" />
            Total General
          </template>
          <el-tag size="small" type="success">{{ valorTotal | toCurrency }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone" />
            Total a Pagar
          </template>
          {{ totalDeuda | toCurrency }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline" />
            Total Pagado
          </template>
          {{ totalPagado | toCurrency }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets" />
            Total Pagados en Efectivo
          </template>
          {{ totalPagadoEfectivo | toCurrency }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets" />
            Total Pagados en Cuenta
          </template>
          {{ totalPagadoCuenta | toCurrency }}
        </el-descriptions-item>
        <!-- <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            Address
          </template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item> -->
      </el-descriptions>

    </div>

    <div class="app-container">

      <el-col v-for="(main, index) of tableData" :key="index" :xs="26" :sm="4" :md="4" :lg="4" :xl="4" style="padding:2px" >
        <div class="grid-content">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>Referencia: {{ main.referencia }}</span>
                <el-button icon="el-icon-delete" circle />
              </div>
            </template>
            <div class="details">
              <p><el-tag effect="plain" type="info">{{ main.conceptos.categorias.titulo }}</el-tag> > <el-tag effect="plain">{{ main.conceptos.titulo }}</el-tag></p>
              <p>Valor total: {{main.monto | toCurrency}}</p>
              <p>Valor Abonado: {{ main.abono | toCurrency}}</p>
              <p>Valor pendiente: {{ (main.monto - main.abono) | toCurrency}}</p>
              <p>Metodo Pago: {{ main.metodopago | camelCase }}</p>
              <p :title="main.comentario">Comentario: {{ main.comentario | isEmpty | limiteCaracteresFiltro }}</p>
            </div>
            <el-button v-show="!mostrarPagoParcial[main.referencia]" class="button" plain type="success" size="mini">Pago Total</el-button>
            <el-button v-show="!mostrarPagoParcial[main.referencia]" class="button" plain type="info" size="mini" @click.prevent="estadoPagoParcial(main)">Pago Parcial</el-button>
            <span v-show="mostrarPagoParcial[main.referencia]" style="display: flex;">
              <input v-model="abonoPago[main.referencia]" class="input-abono" placeholder="Please input" size="mini">
              <el-button size="mini" type="success" plain @click.prevent="abonarPago( main, 2)">Abonar</el-button>
              <el-button size="mini" type="danger" style="margin-left: 0px;" @click.prevent="cerrarAbrirPagoParcial(main)"><i class="mdi mdi-close" /></el-button>
            </span>
            <div class="bottom">
              <time class="time">{{ main.fechapago | moment('LLLL') }}</time>
            </div>
          </el-card>
        </div>
      </el-col>
    </div>

  </div>
</template>
<script>
import FilterDinamic from '@/components/filterDinamic'
import { mapActions, mapGetters } from 'vuex'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
import { validarStatus } from '@/validators/shared.validator'
import { METODO_PAGO_EFECTIVO, METODO_PAGO_CUENTA } from '@/utils/constantes'
import DatosPagiosEfectuados from '@/models/PagosEfectuadosModel'
const CABECERA_PAGOS_EFECTUADOS = aCabeceraPagosEfectuados()
export default {
  name: 'Informes',
  filters: {
    toCurrency(valorACurrency) {
      const currency = parseInt(valorACurrency)
      if ([NaN, undefined, null, ''].includes(currency)) return '$ ' + 0
      var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })
      return formatter.format(currency)
    },
    camelCase(valor) {
      if (!valor) return
      return valor.split(' ').map(palabra => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
      }).join(' ')
    },
    isEmpty(valor) {
      return ([NaN, undefined, null, '', ' '].includes(valor)) ? 'No' : valor
    },
    limiteCaracteresFiltro(valor) {
      if (!valor) return
      return valor.length <= 20
        ? valor
        : valor.substr(0, 20) + '...'
    }
  },
  components: { FilterDinamic },
  mixins: [dataMixins, methodsMixins],
  data() {
    return {
      aTablaCabecera: CABECERA_PAGOS_EFECTUADOS,
      listLoading: false,
      textLoad: 'Consultar',
      tableData: [],
      valorTotal: 0,
      totalDeuda: 0,
      totalPagado: 0,
      totalPagadoEfectivo: 0,
      abonoPago: {},
      mostrarPagoParcial: {},
      totalPagadoCuenta: 0,
      currentDate: new Date()
    }
  },
  computed: {
    ...mapGetters('pagosEfectuados', ['gListPagosEfectuados', 'gEfectuarPago'])
  },
  methods: {
    ...mapActions('pagosEfectuados', ['getListPagosEfectuados', 'getEfectuarPago']),
    validarNullVacioUndefinedNaN(valorEvaluar) {
      return ['', null, NaN, undefined, ' '].includes(valorEvaluar)
    },
    abonarPago(pagoAbonar) {
      if (!this.abonoPago[pagoAbonar.referencia]) return
      const datosPagosEfectuados = new DatosPagiosEfectuados(pagoAbonar.monto, 2, pagoAbonar.estado, parseFloat(this.abonoPago[pagoAbonar.referencia]) + parseFloat(pagoAbonar.abono), pagoAbonar.referencia)
      console.log(datosPagosEfectuados.getPagosEfectuados)
      this.pagar(datosPagosEfectuados.getPagosEfectuados)
    },
    async pagar(datosPagos) {
      if (this.validarNullVacioUndefinedNaN(datosPagos)) return
      await this.getEfectuarPago(datosPagos)
      console.log(this.gEfectuarPago)
      // this.consultaPagosEfectuados()
      this.abonoPago[datosPagos.referencia] = null
      this.mostrarPagoParcial[datosPagos.referencia] = false
      // this.respuestaSucess(null,"success",'Pago Efectuado', `Se ah Realizado el pago de la referencia 🤑 ${datosPagos.referencia}`);
      this.$forceUpdate()
    },
    estadoPagoParcial(item) {
      this.cerrarAbrirPagoParcial(item)
    },
    cerrarAbrirPagoParcial(item) {
      this.mostrarPagoParcial[item.referencia] = !this.mostrarPagoParcial[item.referencia]
      this.abonoPago[item.referencia] = null
      this.$forceUpdate()
    },
    async consultaPagosEfectuados(formularioInfo) {
      console.log({ formularioInfo })
      const { page } = this.listQuery
      const { fechapago } = formularioInfo
      const pageNumber = page - 1
      this.listLoading = true
      this.textLoad = 'Consultando'
      await this.getListPagosEfectuados({
        filter: {
          fechapagoinicial: fechapago && this.$moment(fechapago[0]).startOf('month').format('YYYY-MM-DD 00:00:00'),
          fechapagofinal: fechapago && this.$moment(fechapago[1]).endOf('month').format('YYYY-MM-DD 00:00:00')
        },
        pageNumber,
        pageSize: 50
      })
      const { response, status } = this.gListPagosEfectuados
      this.listLoading = false
      this.textLoad = 'Consultar'
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements
      this.valorTotal = this.calcularTotalEgresos(response?.content).sumaGeneral
      this.totalDeuda = this.calcularTotalEgresos(response?.content).deudas
      this.totalPagado = this.calcularTotalEgresos(response?.content).pagado
      this.totalPagadoEfectivo = this.calcularTotalEgresos(response?.content).pagadoEnEfectivo
      this.totalPagadoCuenta = this.calcularTotalEgresos(response?.content).pagadoEnCuenta
      console.log(this.totalPagado)
    },
    calcularTotalEgresos(aPagosEfectuados) {
      return {
        sumaGeneral: this.fSumaGeneral(aPagosEfectuados),
        deudas: this.fDeudas(aPagosEfectuados),
        pagado: this.fPagado(aPagosEfectuados),
        pagadoEnEfectivo: this.fPagoEnEfectivo(aPagosEfectuados),
        pagadoEnCuenta: this.fPagadoEnCuenta(aPagosEfectuados)
      }
    },
    fSumaGeneral: aPagosEfectuados => aPagosEfectuados.reduce((curr, prev) => (curr + prev.monto), 0),
    fDeudas: aPagosEfectuados => aPagosEfectuados.reduce((curr, prev) => ((prev.estadopago === '0') ? (curr + prev.monto) : curr), 0),
    fPagado: aPagosEfectuados => aPagosEfectuados.reduce((curr, prev) => ((prev.estadopago !== '0') ? (curr + prev.abono) : curr), 0),
    fPagoEnEfectivo: aPagosEfectuados => aPagosEfectuados.reduce((curr, prev) => ((prev.metodopago === METODO_PAGO_EFECTIVO && (prev.estadopago !== '0')) ? (curr + prev.abono) : curr), 0),
    fPagadoEnCuenta: aPagosEfectuados => aPagosEfectuados.reduce((curr, prev) => ((prev.metodopago === METODO_PAGO_CUENTA && (prev.estadopago !== '0')) ? (curr + prev.abono) : curr), 0)
  }
}
function aCabeceraPagosEfectuados() {
  return [
    {
      titulo: 'Fecha de Pago',
      valor: 'fechapago',
      align: 'center',
      width: '170',
      isSearch: true,
      type: 'monthrange',
      sortable: true
    }
  ]
}

</script>

<style lang="scss">
.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /* width: 480px; */
}
.details {
  font-size: 0.8em;
  font-family: Lexend_Exa;
  p {
    margin: 3px;
  }
}
.input-abono {
  width: 100%;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #dcdfe6;
  font-size: 12px;
  color: #606266;
  outline: none;
  box-sizing: border-box;
  display: inline-block;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.input-abono::placeholder {
  color: #dcdfe6bf;
  font-size: 13px;
}
</style>
