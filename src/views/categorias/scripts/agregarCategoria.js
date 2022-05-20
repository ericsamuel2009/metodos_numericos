import { mapGetters, mapActions } from 'vuex'
const formModels = oFormModels()
const rules = oReglas()
export default {
  name: 'CrearCategorias',
  data() {
    return {
      sizeForm: Object.assign({}, formModels),
      rules: Object.assign({}, rules)
    }
  },
  computed: {
    ...mapGetters('categorias', ['gSaveCategorias'])
  },
  methods: {
    ...mapActions('categorias', ['saveCategoria']),
    async agregarCategoria(sizeForm) {
      await this.$refs['sizeForm'].validate(async(valid) => {
        if (valid) {
          await this.saveCategoria(sizeForm)
          this.sizeForm = Object.assign({}, formModels)
          this.$refs.titulo.$el.focus()
        } else {
          console.log('error submit!!')
          return false
        }
      })
      console.log(this.gSaveCategorias)
    }
  }
}

function oFormModels() {
  return {
    titulo: '',
    estado: '1'
  }
}

function oReglas() {
  return {
    titulo: [
      {
        required: true,
        message: 'El campo Titulo es Requerido',
        trigger: 'blur'
      }
    ],
    estado: [
      {
        required: true,
        message: 'El campo Estado es Requerido',
        trigger: 'blur'
      }
    ]
  }
}
