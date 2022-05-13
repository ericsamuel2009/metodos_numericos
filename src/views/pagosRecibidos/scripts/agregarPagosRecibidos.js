import { mapActions, mapGetters } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
import Pagination from '@/components/Pagination'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
const formModels = oFormModels()
const rules = oReglas()
const aTablaCabecera = [
  {
    titulo: 'Cliente',
    valor: 'cliente',
    align: 'center',
    width: '120'
  },
  {
    titulo: 'Motivo Pago',
    valor: 'motivo',
    align: 'center',
    width: '150'
  },
  {
    titulo: 'Monto',
    valor: 'monto',
    align: 'center',
    width: '150'
  },
  {
    titulo: 'Comentario',
    valor: 'comentario'
  },
  {
    titulo: 'Pagos de Pago',
    valor: 'fechapago',
    align: 'center',
    width: '170'
  },
  {
    titulo: 'Accion',
    valor: 'accion',
    align: 'center',
    width: '150'
  }
]
export default {
  name: 'AgregarPagosRecibidos',
  mixins: [dataMixins, methodsMixins],
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
        }
  },
  data() {
    return {
      tableData: [],
      dataToAdd: Object.assign({}, formModels),
      rules: Object.assign({}, rules),
      dialogFormVisible: false,
      listLoading: false,
      nTotalPaginas: 0,
      aTablaCabecera: Object.assign({}, aTablaCabecera)
    }
  },
  components: { Pagination, TablaDinamica },
  methods: {
    ...mapActions('pagosRecibidos', ['getSavePagosRecibidos']),
    async agregarPagoRecibido() {
      this.dialogFormVisible = true
    },
    onSubmit(data) {
      this.$refs['dataToAdd'].validate((valid) => {
        if (valid) {
          this.tableData.push(data)
          this.close()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.dialogFormVisible = false
      this.resetTableData()
    },
    resetTableData() {
      this.dataToAdd = {
        cliente: '',
        motivo: '',
        monto: '',
        fechapago: '',
        comentario: ''
      }
    },
    async facturar() {
      await this.getSavePagosRecibidos(this.tableData)
      //   this.tableData.push({})
    },
    eliminar(valorSeleccionado) {
      this.tableData.splice(this.tableData.indexOf(valorSeleccionado), 1)
      this.tableData = [...this.tableData]
    }
  }
}

function oFormModels() {
  return {
    cliente: '',
    motivo: '',
    monto: '',
    fechapago: '',
    comentario: ''
  }
}

function oReglas() {
  return {
    cliente: [
      {
        required: true,
        message: 'El campo cliente es Requerido',
        trigger: 'blur'
      }
    ],
    motivo: [
      {
        required: true,
        message: 'El campo motivo es Requerido',
        trigger: 'blur'
      }
    ],
    monto: [
      {
        required: true,
        message: 'El campo Monto es Requerido',
        trigger: 'blur'
      },
      { type: 'number', message: 'monto Debe ser Numerico', trigger: 'blur' }
    ],
    fechapago: [
      {
        required: true,
        message: 'Porfavor Seleccione una fecha',
        trigger: 'blur'
      },
      { type: 'date', message: 'date Debe ser Fecha' }
    ]
  }
}
// var validateValorMonto = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('El campo Monto es Requerido'))
//   }

//   if (!Number.isInteger(value)) {
//     callback(new Error('monto Debe ser Numerico'))
//   } else {
//     if (value < 18) {
//       callback(new Error(`El valor del Monto debe ser Mayor a  $ ${value} Pesos`))
//     } else {
//       callback()
//     }
//   }
// }

// var validateValorMonto = (rule, value, callback) => {
//   if (Number.isInteger(value) < 50) {
//     callback(new Error(`El valor del Monto debe ser Mayor a  $ ${value} Pesos`))
//   }
//   callback()
// }
