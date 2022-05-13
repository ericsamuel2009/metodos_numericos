
import { mapActions, mapGetters } from 'vuex'
import { validarStatus } from '@/validators/shared.validator'
const formModels = oFormModels()
const rules = oReglas()

export default {
  name: 'EditarrPagosRecibidos',
  data: () => ({
    dataToEdit: Object.assign({}, formModels),
    tempRoute: {},
    loading: false,
    rules: Object.assign({}, rules)
  }),
  computed: {
    ...mapGetters('pagosRecibidos', ['oUnPagoRecibido']),
    cFechaPago: {
      get: function() {
        return this.$moment(this.dataToEdit.fechapago).format()
      },
      set: function(nuevaFecha) {
        this.dataToEdit.fechapago = nuevaFecha
      }
    }
  },
  created() {
    const referencia = this.$route.params && this.$route.params.referencia
    this.buscarPagoReciibido(referencia)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    ...mapActions('pagosRecibidos', ['getUnPagosRecibido']),
    update(value) {
      this.$refs['dataToEdit'].validate((valid) => {
        if (valid) {
          console.log(value)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitForm() {
      console.log(this.postForm)
    },
    async buscarPagoReciibido(referencia) {
      this.loading = true
      await this.getUnPagosRecibido(referencia)
      this.loading = false
      const { response, status } = this.oUnPagoRecibido
      if (validarStatus(status)) return false
      this.dataToEdit = response
      this.setTagsViewTitle()
      this.setPageTitle()
    },
    getRemoteUserList(query) {},
    setTagsViewTitle() {
      const title = 'Editar Ingreso'
      const route = Object.assign({}, this.tempRoute, {
        title: `${title} ${this.dataToEdit.referencia}`
      })
      console.log(route)
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = 'Editar Ingreso'
      document.title = `${title} - ${this.dataToEdit.referencia}`
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
        type: 'number',
        required: true,
        message: 'El campo Monto es Requerido',
        trigger: 'blur'
      }
    ],
    fechapago: [
      {
        type: 'date',
        required: true,
        message: 'Porfavor Seleccione una fecha',
        trigger: 'blur'
      }
    ]
  }
}
