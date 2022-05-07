<template>
  <div id="ListarCategorias">
    <div class="app-container">
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
      />
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
// import AgregarGrupo from "@/components/grupos/agregarGrupo.vue"
const CABECERA_CATEGORIAS = aCategoriasReturn()
export default {
  name: 'ListarCategorias',
  components: { TablaDinamica },
  data() {
    return {
      tableData: [],
      aTablaCabecera: CABECERA_CATEGORIAS
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
    }
  ]
}
</script>

<style></style>
