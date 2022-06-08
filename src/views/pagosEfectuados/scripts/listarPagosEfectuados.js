import { mapActions, mapGetters } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
import { validarStatus } from '@/validators/shared.validator'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
import Pagination from '@/components/Pagination'
import FilterDinamic from '@/components/filterDinamic'
const CABECERA_PAGOS_EFECTUADOS = aCabeceraPagosEfectuados()
export default {
  name: 'ListarPagosRecibidos',
  components: { Pagination, TablaDinamica, FilterDinamic },
  data: () => ({
    tableData: [],
    listLoading: false,
    nTotalPaginas: 0,
    aConceptos: [],
    concepto: '',
    aTablaCabecera: CABECERA_PAGOS_EFECTUADOS
  }),
  mixins: [dataMixins, methodsMixins],
  computed: {
    ...mapGetters('pagosEfectuados', ['gListPagosEfectuados']),
    ...mapGetters('conceptos', ['gConceptos'])
  },
  created() {
    this.consultarPagoEfectuado(Object.assign({}, null))
  },
  filters: {
    convertEstadoPago(estado) {
      const ESTADO_PAGO = {
        '0': 'NO PAGADO',
        '1': 'PAGADO',
        '2': 'ABONANDO'
      }
      return ESTADO_PAGO[estado] || estado
    },
    limiteCaracteresFiltro(valorProveedor) {
      if (!valorProveedor) return
      return valorProveedor.length <= 150
        ? valorProveedor
        : valorProveedor.substr(0, 150) + '...'
    },
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
    statusHandler(status) {
      const ESTADO_CATEGORIA = {
        0: 'Inactivo',
        1: 'Activo'
      }
      return ESTADO_CATEGORIA[status] || status
    }
  },
  methods: {
    ...mapActions('pagosEfectuados', ['getListPagosEfectuados']),
    ...mapActions('conceptos', ['getListConceptos']),
    eliminarPagoEfectuados() {

    },
    fechaInicial(fechaInicial) {
      return fechaInicial && this.$moment(fechaInicial[0]).format('YYYY-MM-DD')
    },
    fechaFinal(fechaFinal) {
      return fechaFinal && this.$moment(fechaFinal[1]).format('YYYY-MM-DD')
    },
    async consultarPagoEfectuado(form) {
      form.concepto = this.concepto
      console.log({ form })
      this.listLoading = true
      const { page, limit } = this.listQuery
      const { referencia, concepto, monto, fechapago } = form
      const pageNumber = page - 1
      await this.getListPagosEfectuados({
        filter: {
          referencia,
          concepto,
          monto,
          fechapagoinicial: fechapago && this.$moment(fechapago[0]).startOf('month').format('YYYY-MM-DD'),
          fechapagofinal: fechapago && this.$moment(fechapago[1]).endOf('month').format('YYYY-MM-DD')
        },
        pageNumber,
        pageSize: limit
      })
      const { response, status } = this.gListPagosEfectuados
      this.listLoading = false
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements
      await this.getListConceptos({
        filter: { },
        pageNumber: 0,
        pageSize: 50
      })
      const { response: responseConcepto, status: statusPeticion } = this.gConceptos
      validarStatus(statusPeticion)
      this.aConceptos = responseConcepto?.content
      console.log(this.gListPagosEfectuados)
    },
    agregarPagoEfectuado() {
      this.$router.push(`/pagosEfectuados/agregar`)
    }
  }
}
function aCabeceraPagosEfectuados() {
  return [
    {
      titulo: 'Referencia',
      valor: 'referencia',
      align: 'center',
      width: '120',
      sortable: true,
      isSearch: true,
      fixed: 'left',
      type: 'text'
    },
    {
      titulo: 'Categoria',
      valor: 'categoria',
      align: 'center',
      width: '120',
      sortable: true
    },
    {
      titulo: 'Concepto',
      valor: 'conceptos',
      align: 'center',
      width: '150',
      isSearch: true,
      type: 'select',
      sortable: true
    },
    {
      titulo: 'Monto',
      valor: 'monto',
      align: 'center',
      width: '150',
      isSearch: true,
      sortable: true
    },
    {
      titulo: 'Estado Pago',
      valor: 'estadopago',
      align: 'center',
      width: '170',
      sortable: true
    },
    {
      titulo: 'Metodo Pago',
      valor: 'metodopago',
      align: 'center',
      width: '170',
      sortable: true
    },
    {
      titulo: 'Fecha de Pago',
      valor: 'fechapago',
      align: 'center',
      width: '170',
      isSearch: true,
      type: 'monthrange',
      sortable: true
    },
    {
      titulo: 'Comentario',
      valor: 'comentario'
    },
    {
      titulo: 'Accion',
      valor: 'accion',
      align: 'center',
      width: '150'
    }
  ]
}

