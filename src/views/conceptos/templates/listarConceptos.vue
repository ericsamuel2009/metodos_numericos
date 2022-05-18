<template>
  <div id="ListarConceptos">
    <div class="app-container">
      <div class="filter-container">
        <el-form ref="sizeForm" :inline="true" :model="sizeForm" size="mini">
          <el-form-item label="Titulo">
            <el-input v-model="sizeForm.titulo" clearable />
          </el-form-item>
          <el-form-item label="Categorias" prop="categoria">
            <el-select v-model="sizeForm.categoria" clearable placeholder="Seleccione una Opcion">
              <el-option v-for="main of aCategorias" :key="main.idc" :label="main.titulo" :value="main.idc" />
            </el-select>
          </el-form-item>
          <el-form-item label="Estado">
            <el-select v-model="sizeForm.estado" clearable placeholder="Seleccione una Opcion">
              <el-option label="Activo" value="1" />
              <el-option label="Inactivo" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" round @click="consultaConceptos">Consultar</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" round @click="agregarConcepto">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
      >
        <template #categorias="{row}">
          {{ row.categorias.titulo }}
        </template>
        <template #estado="{ row }">
          <el-tag :type="colorStatusHandler(row)" effect="dark">
            {{ row.estado | statusHandler }}
          </el-tag>
        </template>
        <template #fecha="{ row }">
          {{ row.fecha | moment("YYYY-MM-DD") }}
        </template>
        <template #accion="{row}">
          <el-popconfirm
            confirm-button-text="Si"
            cancel-button-text="No, Gracias"
            icon="el-icon-info"
            icon-color="red"
            title="Seguro De Eliminarlo?"
            @onConfirm="eliminarConcepto(row)"
          >
            <slot name="delete">
              <el-button slot="reference" type="text" size="mini">Eliminar</el-button>
            </slot>
          </el-popconfirm>
        </template>
      </tabla-dinamica>
    </div>
    <pagination
      :total="nTotalPaginas"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="consultaConceptos"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import TablaDinamica from '@/components/tableDinamic'
// import FilterDinamic  from '@/components/filterDinamic'
import { validarStatus } from '@/validators/shared.validator'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
const CABECERA_CATEGORIAS = aCategoriasReturn()
export default {
  name: 'ListarConceptos',
  components: { TablaDinamica, Pagination },
  filters: {
    statusHandler(status) {
      const ESTADO_CATEGORIA = {
        0: 'Inactivo',
        1: 'Activo'
      }
      return ESTADO_CATEGORIA[status] || status
    }
  },
  mixins: [dataMixins, methodsMixins],
  data() {
    return {
      listLoading: false,
      tableData: [],
      aCategorias: [],
      sizeForm: {
        titulo: null,
        categoria: null,
        estado: null
      },
      nTotalPaginas: 0,
      aTablaCabecera: CABECERA_CATEGORIAS
    }
  },
  computed: {
    ...mapGetters('conceptos', ['gConceptos']),
    ...mapGetters('categorias', ['gCategoriasList'])
  },
  created() {
    this.consultaConceptos()
    this.consultaCategorias()
  },
  methods: {
    ...mapActions('conceptos', ['getListConceptos']),
    ...mapActions('categorias', ['getCategorias']),
    async consultaConceptos() {
      this.listLoading = true
      const { page, limit } = this.listQuery
      const { titulo, categoria, estado } = this.sizeForm
      const pageNumber = page - 1
      await this.getListConceptos({
        filter: { titulo, categoria, estado },
        pageNumber,
        pageSize: limit
      })
      this.listLoading = false
      const { response, status } = this.gConceptos
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements
    },
    async consultaCategorias() {
      await this.getCategorias({
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gCategoriasList
      if (validarStatus(status)) return false
      this.aCategorias = response?.content
    },
    eliminarConcepto(valor) {

    },
    agregarConcepto() {
      this.$router.push(`/recursos/conceptos/crear`)
    }
  }
}

function aCategoriasReturn() {
  return [
    {
      titulo: 'Titulo',
      valor: 'titulo',
      align: 'center'
    },
    {
      titulo: 'Categoria',
      valor: 'categorias',
      align: 'center'
    },
    {
      titulo: 'Estado',
      valor: 'estado',
      align: 'center'
    },
    {
      titulo: 'Fecha Creacion',
      valor: 'fecha',
      align: 'center'
    },
    {
      titulo: 'Accion',
      valor: 'accion',
      align: 'center',
      width: '150'
    }
  ]
}
</script>

<style>

</style>
