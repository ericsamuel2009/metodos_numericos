<template>
  <div id="tablaParticiones">
    <div>

      <div v-show="isExport" class="fr">
        <BookTypeOption v-model="bookType" />
        <el-button :disabled="data.length == 0" :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
          Exportar Excel
        </el-button>
      </div>
      <el-table
        :data="data"
        border
        height="370"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label="X">
          <template #default="scope">
            {{ scope.row.x }}
          </template>
        </el-table-column>
        <el-table-column :label="nuevaEcuacionTabla">
          <template #default="scope">
            {{ scope.row.ecuacion | nuevaEcuacion }}
          </template>
        </el-table-column>
        <el-table-column prop="total" label="Total = Y" />
      </el-table>
    </div>
  </div>
</template>

<script>
import BookTypeOption from './excel/components/BookTypeOption'
import { parseTime } from '@/utils'
import { create, all } from 'mathjs'
const config = {
  number: 'Fraction'
}
const today = new Date()
const math = create(all, config)
export default {
  name: 'TablaParticiones',
  components: { BookTypeOption },
  filters: {
    convertirX(ecuacion) {
      const dimencionX = ecuacion.toString().split('.')[1]?.length
      const f = (dimencionX > 3) ? math.format((math.fraction(ecuacion)), { fraction: 'ratio' }) : math.evaluate(ecuacion.toString())
      return f
    },
    nuevaEcuacion(ecuacion) {
      return ecuacion.replaceAll('sqrt', `√`).replaceAll('()', '').replaceAll('log10', 'Log').replaceAll('log', 'Ln')
    }
  },
  props: {
    data: {
      type: [Object, Array],
      default: function() {
        return []
      }
    },
    ecuacionTabla: {
      type: String,
      default: ''
    },
    isExport: {
      type: Boolean,
      default: false
    },
    exportFileName: {
      type: [String, Number],
      default: 'informacion'
    }
  },
  data: function() {
    return {
      listLoading: true,
      downloadLoading: false,
      today: today,
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  computed: {
    nuevaEcuacionTabla() {
      return this.ecuacionTabla.replaceAll('sqrt', `√`).replaceAll('()', '').replaceAll('log10', 'Log').replaceAll('log', 'Ln')
    }
  },
  methods: {
    printRatio(value) {
      return math.format(value, { fraction: 'ratio' })
    },
    handleDownload() {
      this.downloadLoading = true
      try {
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['X', this.nuevaEcuacionTabla, 'Total = Y']
          const filterVal = ['x', 'ecuacion', 'total']
          const list = this.data
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: `${this.exportFileName}-${this.prefix()}`,
            autoWidth: this.autoWidth,
            bookType: this.bookType
          })
        })
      } catch (error) {
        console.log('Error -> ', error)
      } finally {
        this.downloadLoading = false
      }
    },
    prefix() {
      return `${this.$moment(this.today).format('DDMMYYYY')}${Math.floor(Math.random() * 999)}`
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style lang="scss" scoped></style>
