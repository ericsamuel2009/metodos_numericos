import { mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import TablaDinamica from '@/components/tableDinamic'
// import FilterDinamic  from '@/components/filterDinamic'
import { validarStatus } from '@/validators/shared.validator'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
export default {
  name: 'ListarPagosRecibidos',
  data() {
    return {
      tableData: [],
      nTotalPaginas: 0,
      listLoading: true,
      total: 0,
      sizeForm: {
        referencia: null,
        cliente: null,
        monto: null,
        fechapago: null
      },
      aTablaCabecera: [
        {
          titulo: 'Referencia',
          valor: 'referencia',
          align: 'center',
          width: '120',
          sortable: true
        },
        {
          titulo: 'Cliente',
          valor: 'cliente',
          align: 'center',
          width: '120',
          sortable: true
        },
        {
          titulo: 'Motivo Pago',
          valor: 'motivo',
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
        { titulo: 'Comentario', valor: 'comentario' },
        {
          titulo: 'Pagos de Pago',
          valor: 'fechapago',
          align: 'center',
          width: '170',
          sortable: true
        }
      ]
    }
  },
  components: { Pagination, TablaDinamica },
  mixins: [dataMixins, methodsMixins],
  computed: {
    ...mapGetters('pagosRecibidos', ['aTodosPagosRecibidos', 'sDeletePagosRecibidos'])
  },
  methods: {
    ...mapActions('pagosRecibidos', ['getTodosPagosRecibidos', 'deleteUnPagoRecibido']),
    async eliminarPagoRecibido(valorEliminar) {
      const { cliente } = valorEliminar
      await this.deleteUnPagoRecibido(valorEliminar.referencia)
      this.notification('Ok', `El Cliente ${cliente} fue Eliminado`, 'success')
      this.consultarPagosRecibidos()
      console.log(this.sDeletePagosRecibidos)
    },
    editarPagoRecibido(valorEditar) {
      this.$router.push(`/pagosRecibidos/editar/${valorEditar.referencia}`)
    },
    async consultarPagosRecibidos() {
      this.listLoading = true
      const { page, limit } = this.listQuery
      const { referencia, cliente, monto, fechapago } = this.sizeForm
      const pageNumber = page - 1
      await this.getTodosPagosRecibidos({
        filter: {
          referencia,
          cliente,
          monto,
          fechapago: fechapago && this.$moment(fechapago).format('YYYY-MM-DD')
        },
        pageNumber,
        pageSize: limit
      })
      const { response, status } = this.aTodosPagosRecibidos
      this.listLoading = false
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements

      // const { response, status } = this.todosPagosRecibidosResponseList
      // if (validarStatus(status,this.$vs)) {
      //     this.aPagosRecibidos = response
      // }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  },
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
    separarAPuntoYComa(valorASeparaPorComa) {
      if (!valorASeparaPorComa) return
      return valorASeparaPorComa.split(' ; ').join(',')
    },
    quitarPunto(valor) {
      if (!valor) return
      return valor.split('.').join('')
    },
    camelCase(valor) {
      if (!valor) return
      return valor
        .split(' ')
        .map((palabra) => {
          return (
            palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
          )
        })
        .join(' ')
    },
    uppercase(valorlowerToUpper) {
      return valorlowerToUpper.toUpperCase()
    },
    limiteCaracteresFiltro(valorProveedor) {
      if (!valorProveedor) return
      return valorProveedor.length <= 150
        ? valorProveedor
        : valorProveedor.substr(0, 150) + '...'
    }
  },
  created() {
    this.consultarPagosRecibidos()
  }
}
