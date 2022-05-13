<template>
  <div id="CrearConceptos">
    <div class="app-container">
      <div class="createPost-container">
        <el-form ref="sizeForm" :inline="true" :model="sizeForm" size="mini" status-icon label-width="120px" :rules="rules">
          <el-form-item ref="titulo" label="Titulo" prop="titulo">
            <el-input v-model="sizeForm.titulo" clearable />
          </el-form-item>
          <el-form-item label="Categorias" prop="grupoid">
            <el-select v-model="sizeForm.grupoid" placeholder="Seleccione una Opcion">
              <el-option v-for="main of aCategorias" :key="main.idc" :label="main.titulo" :value="main.idc" />
            </el-select>
          </el-form-item>
          <el-form-item label="Estado" prop="estado">
            <el-select v-model="sizeForm.estado" placeholder="Seleccione una Opcion">
              <el-option label="Activo" value="1" />
              <el-option label="Inactivo" value="0" />
            </el-select>
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" round @click="agregarCategoria(sizeForm)">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validarStatus } from '@/validators/shared.validator'
const rules = oReglas()
const formModels = oFormModels()
export default {
  name: 'AgregarConceptos',
  data: () => ({
    sizeForm: Object.assign({}, formModels),
    rules: Object.assign({}, rules),
    aCategorias: []
  }),
  methods: {
    ...mapActions('categorias', ['getCategorias', 'saveConcepto']),
    ...mapActions('conceptos', ['saveConcepto']),
    async agregarCategoria(form) {
      await this.$refs['sizeForm'].validate(async(valid) => {
        if (valid) {
          await this.saveConcepto(form)
          this.sizeForm = Object.assign({}, formModels)
          this.$refs.titulo.$el.focus()
          console.log(this.gSaveConcepto)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async consultarCategorias() {
      await this.getCategorias({
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gCategoriasList
      if (validarStatus(status)) return false
      this.aCategorias = response?.content
    }
  },
  computed: {
    ...mapGetters('categorias', ['gCategoriasList']),
    ...mapGetters('conceptos', ['gSaveConcepto'])
  },
  created() {
    this.consultarCategorias()
  }
}

function oFormModels() {
  return {
    titulo: '',
    estado: '1',
    grupoid: ''
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
    ],
    grupoid: [
      {
        required: true,
        message: 'El campo categoria es Requerido',
        trigger: 'blur'
      }
    ]
  }
}
</script>

<style>

</style>
