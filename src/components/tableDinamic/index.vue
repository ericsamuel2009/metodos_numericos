<template>
  <div id="TableDinamic">
    <el-table v-loading="listLoading" :data="datos" border>
      <el-table-column
        v-for="(main,index) in tablacabecera"
        :key="index"
        :label="main.titulo"
        :align="main.align"
        :prop="main.valor"
        :width="main.width"
        :fixed="main.fixed"
        :sortable="main.sortable"
        empty-text="No"
      >
        <template slot-scope="{ row }">
          <slot :name="main.valor" :row="row">
            {{ row[main.valor] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <el-tooltip placement="top" content="subir">
      <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
    </el-tooltip>
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop'
export default {
  name: 'TableDinamic',
  components: { BackToTop },
  props: {
    datos: {
      type: [Array, Object],
      require: true,
      default: function() {
        return []
      }
    },
    tablacabecera: {
      type: [Array, Object],
      require: true,
      default: function() {
        return []
      }
    },
    isDelete: {
      type: [Boolean],
      default: false
    },
    isEditable: {
      type: [Boolean],
      default: false
    },
    textDeteleBtn: {
      type: String,
      default: 'Eliminar'
    },
    textEditarBtn: {
      type: String,
      default: 'Editar'
    },
    listLoading: {
      type: [Boolean],
      default: false
    },
    loadBtn: {
      type: [Boolean],
      default: false
    }
  },
  data: () => ({
    visible: false,
    // customizable button style, show/hide critical point, return position
    myBackToTopStyle: {
      right: '50px',
      bottom: '50px',
      width: '40px',
      height: '40px',
      'border-radius': '4px',
      'line-height': '45px',
      background: '#e7eaf1'
    }
  }),
  computed: {
    widthDinamic() {
      if (this.isEditable && this.isDelete) {
        return '200'
      }
      return '100'
    }
    // datosComputados() {
    //   this.datos.map(informationResponse => {
    //     informationResponse.tablacabecera = this.tablacabecera
    //   })
    //   return this.datos
    // }
  },
  methods: {
    eliminar(valor) {
      this.$emit('triggerDelete', valor)
    },
    editar(valor) {
      this.$emit('triggerEditable', valor)
    }
  }
}
</script>

<style></style>
