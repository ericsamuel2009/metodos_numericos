import { mapActions, mapGetters } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
import { validarStatus } from '@/validators/shared.validator'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
import Pagination from '@/components/Pagination'
const CABECERA_PAGOS_EFECTUADOS = aCabeceraPagosEfectuados()
export default {
  name: 'ListarPagosRecibidos',
  components: { Pagination, TablaDinamica },
  data: () => ({
    tableData: [],
    listLoading: false,
    nTotalPaginas: 0,
    aTablaCabecera: Object.assign({}, CABECERA_PAGOS_EFECTUADOS)
  }),
  mixins: [dataMixins, methodsMixins],
  computed: {
    ...mapGetters('pagosEfectuados', ['gListPagosEfectuados'])
  },
  created() {
    this.consultarPagoEfectuado()
  },
  filters: {
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
    }
  },
  methods: {
    ...mapActions('pagosEfectuados', ['getListPagosEfectuados']),
    async consultarPagoEfectuado() {
      this.listLoading = true
      const { page, limit } = this.listQuery
      // const { referencia, cliente, monto, fechapago } = this.sizeForm
      const pageNumber = page - 1
      await this.getListPagosEfectuados({
        filter: { },
        pageNumber,
        pageSize: limit
      })
      const { response, status } = this.gListPagosEfectuados
      this.listLoading = false
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements
      console.log(this.gListPagosEfectuados)
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
      fixed: 'left'
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
      sortable: true
    },
    {
      titulo: 'Monto',
      valor: 'monto',
      align: 'center',
      width: '150',
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
      titulo: 'Mes Pago',
      valor: 'fechapago',
      align: 'center',
      width: '170',
      sortable: true
    },
    {
      titulo: 'Comentario',
      valor: 'comentario'
    }
  ]
}

