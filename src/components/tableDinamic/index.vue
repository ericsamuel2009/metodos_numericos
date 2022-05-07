<template>
  <div id="TableDinamic">
    <el-table v-loading="listLoading" :data="datosComputados" border>
      <el-table-column
        v-for="(main,index) in tablacabecera"
        :key="index"
        :label="main.titulo"
        :align="main.align"
        :prop="main.valor"
        :width="main.width"
        :sortable="main.sortable"
      >
        <template slot-scope="{ row }">
          <slot :name="main.valor" :row="row">
            {{ row[main.valor] }}
          </slot>
        </template>
      </el-table-column>

      <el-table-column v-if="isEditable || isDelete" label="Acciones" align="center" :width="widthDinamic" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-if="isEditable" type="primary" size="mini" @click="editar(row)">{{ textEditarBtn }}</el-button>
          <el-popconfirm
            confirm-button-text="Si"
            cancel-button-text="No, Gracias"
            icon="el-icon-info"
            icon-color="red"
            title="Seguro De Eliminarlo?"
            @onConfirm="eliminar(row)"
          >
            <el-button v-if="isDelete" slot="reference" type="text" size="mini">{{ textDeteleBtn }}</el-button>
          </el-popconfirm>
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
    to: {
      type: [String],
      default: ''
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
    },
    datosComputados() {
      this.datos.map(informationResponse => {
        informationResponse.tablacabecera = this.tablacabecera
      })
      return this.datos
    }
  },
  methods: {
    eliminar(valor) {
      console.log('valor')
      this.$emit('triggerDelete', valor)
    },
    editar(valor) {
      this.$router.push(`${this.to}/${valor.referencia}`)
    }
  }
}
</script>

<style></style>
