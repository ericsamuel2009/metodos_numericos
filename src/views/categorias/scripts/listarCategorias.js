import { mapGetters, mapActions } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
import Pagination from '@/components/Pagination'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
import { validarStatus } from '@/validators/shared.validator'
const CABECERA_CATEGORIAS = aCategoriasReturn()
export default {
  name: 'ListarCategorias',
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
      tableData: [],
      aTablaCabecera: CABECERA_CATEGORIAS,
      loadingCategoriaBtn: {},
      listLoading: true,
      sizeForm: {
        titulo: null,
        estado: null
      }
    }
  },
  computed: {
    ...mapGetters('categorias', ['gCategoriasList', 'gDeleteCategorias'])
  },
  created() {
    this.consultaCategorias()
    // this.loadingCategoriaBtn['b80a3601-1c66-42a4-b1ec-ccfdf7006a7e'] = true
  },
  methods: {
    ...mapActions('categorias', ['getCategorias', 'deleteCategorias']),
    async consultaCategorias() {
      this.listLoading = true
      const { page, limit } = this.listQuery
      const { titulo, estado } = this.sizeForm
      const pageNumber = page - 1
      await this.getCategorias({
        filter: { titulo, estado },
        pageNumber,
        pageSize: limit
      })
      this.listLoading = false
      const { response, status } = this.gCategoriasList
      if (validarStatus(status)) return false
      this.tableData = response?.content
      this.nTotalPaginas = response?.totalElements
    },
    async eliminarCategoria(valorEliminar) {
      const { idc, titulo } = valorEliminar
      this.loadingCategoriaBtn[idc] = true
      await this.deleteCategorias(idc)
      this.loadingCategoriaBtn[idc] = false
      const { status } = this.gDeleteCategorias
      if (validarStatus(status)) return false
      this.consultaCategorias()
      this.notification('Ok', `La Categoria ${titulo} fue Eliminado`, 'success')
      console.log(this.gDeleteCategorias)
    },
    nuevaCategoria() {
      this.$router.push(`/recursos/categorias/crear`)
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
