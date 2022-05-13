<template>
  <div id="CrearCategoria">
    <div class="app-container">
      <div class="createPost-container">
        <el-form ref="sizeForm" :inline="true" :model="sizeForm" size="mini" status-icon label-width="120px" :rules="rules">
          <el-form-item ref="titulo" label="Titulo" prop="titulo">
            <el-input v-model="sizeForm.titulo" clearable />
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
  },
  computed: {
    ...mapGetters('categorias', ['gSaveCategorias'])
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

</script>

<style></style>
