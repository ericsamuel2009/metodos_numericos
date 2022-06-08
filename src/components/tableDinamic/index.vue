<template>
  <div id="TableDinamic">
    <el-table v-loading="listLoading" :show-summary="summary" :summary-method="getSummaries" :data="datos" border>
      <el-table-column
        v-for="(main,index) in tablacabecera"
        :key="index"
        :label="main.titulo"
        :align="main.align"
        :prop="main.valor"
        :width="main.width"
        :fixed="main.fixed"
        :sortable="main.sortable"
        empty-text="Sin Datos"
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
import { number } from 'echarts/lib/export'
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
    },
    summary: {
      type: [Boolean],
      default: false
    },
    height: {
      type: [String, number],
      default: ''
    }
  },
  data: () => ({
    visible: false,
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
  },
  methods: {
    eliminar(valor) {
      this.$emit('triggerDelete', valor)
    },
    editar(valor) {
      this.$emit('triggerEditable', valor)
    },
    toCurrency(valorACurrency) {
      const currency = parseInt(valorACurrency)
      if ([NaN, undefined, null, ''].includes(currency)) return '$ ' + 0
      var formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      })
      return formatter.format(currency)
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total Costo'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value) || !value) && values.every(value => value > 1000) && values.every(value => value < 10000 * 100)) {
          sums[index] = this.toCurrency(values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0))
        } else {
          sums[index] = '---'
        }
      })

      return sums
    }
  }
}
</script>

<style></style>
