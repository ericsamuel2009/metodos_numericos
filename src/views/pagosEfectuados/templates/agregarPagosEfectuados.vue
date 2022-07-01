<template>
  <div>
    <div class="app-container">
      <div class="app-container">
        <el-row :gutter="10">
          <el-col :xs="10" :sm="2" :md="2" :lg="2" :xl="2">
            <el-button
              type="primary"
              size="mini"
              @click="agregarPagoEfectuado"
            >Agregar</el-button>
          </el-col>
          <el-col :xs="10" :sm="2" :md="2" :lg="2" :xl="2">
            <el-popconfirm
              confirm-button-text="Si"
              cancel-button-text="No, Gracias"
              icon="el-icon-info"
              icon-color="red"
              :title="`Facturar ${registreCount} Registros?`"
              @confirm="facturar"
            >
              <slot name="delete">
                <el-button
                  slot="reference"
                  :disabled="registreCount == 0"
                  type="info"
                  size="mini"
                  plain
                >Facturar pagos Efectuados</el-button>
              </slot>
            </el-popconfirm>
          </el-col>
        </el-row>
      </div>
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
        summary
      >
        <template #accion="{ row }">
          <el-button type="text" @click="editar(row)">editar</el-button>
          <el-button type="text" @click="eliminar(row)">Eliminar</el-button>
        </template>
        <template #concepto="{row}">
          {{ row.concepto.titulo }}
        </template>
        <template #categoria="{row}">
          {{ row.categoria.titulo }}
        </template>
        <template #fechapago="{row}">
          {{ row.fechapago | moment("YYYY/MM/DD") }}
        </template>
        <template #estadopago="{row}">
          {{ row.estadopago | converEstadoPago }}
        </template>
        <template #monto="{row}">
          {{row.monto | toCurrency}}
        </template>
      </tabla-dinamica>
      <el-dialog
        title="Agregar"
        :visible.sync="dialogFormVisible"
        width="45%"
        center
      >
        <div class="createPost-container">
          <el-form
            ref="dataToAdd"
            :model="dataToAdd"
            status-icon
            label-width="120px"
            label-position="top"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-row :gutter="10">
              <el-col :xs="26" :sm="7" :md="7" :lg="7" :xl="7">
                <div class="grid-content">
                  <el-form-item label="Concepto" prop="concepto">
                    <el-cascader v-model="dataToAdd.concepto" :props="props" />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Monto" prop="monto">
                    <el-input v-model.number="dataToAdd.monto" />
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Estado del Pago" prop="estadopago">
                    <el-select v-model="dataToAdd.estadopago" placeholder="Seleccionar opcion" :disabled="true">
                      <el-option label="no Pagado" value="0" />
                      <el-option label="Pagado" value="1" />
                      <el-option label="Abono" value="2" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Metodo de Pago" prop="metodopago">
                    <el-select v-model="dataToAdd.metodopago" placeholder="Seleccionar opcion">
                      <el-option label="Efectivo" value="CASH" />
                      <el-option label="Targeta" value="CARD" />
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :xs="26" :sm="4" :md="4" :lg="4" :xl="4">
                <div class="grid-content">
                  <el-form-item label="Fecha Pago" prop="fechapago">
                    <el-date-picker
                      v-model="dataToAdd.fechapago"
                      type="date"
                      placeholder="Fecha Pago"
                      format="yyyy/MM/dd"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Comentario">
              <el-input
                v-model="dataToAdd.comentario"
                type="textarea"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.prevent="onSubmit(dataToAdd)">
            Agregar
          </el-button>
          <el-button @click.prevent="close"> Cancelar </el-button>
        </div>
      </el-dialog>

    </div>
    <!-- <pagination
      :total="nTotalPaginas"
    /> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TablaDinamica from '@/components/tableDinamic'
import Pagination from '@/components/Pagination'
import dataMixins from '@/mixins/dataMixins'
import methodsMixins from '@/mixins/methodsMixins'
import { validarStatus } from '@/validators/shared.validator'
// import DatosPagiosEfectuados from "@/models/PagosEfectuadosModel"
const formModels = oFormModels()
const aTablaCabecera = pagosRecibidosCabecera()
const rules = oReglas()
export default {
  name: 'AgregarPagosEfectuados',
  components: { Pagination, TablaDinamica },
  filters: {
    statusHandler(status) {
      const OBJ_ESTADO = {
        0: 'Inactivo',
        1: 'Activo'
      }
      return OBJ_ESTADO[status] || status
    },
    converEstadoPago(estado) {
      const ESTADO_PAGO = {
        '0': 'NO PAGADO',
        '1': 'PAGADO',
        '2': 'ABONANDO'
      }
      return ESTADO_PAGO[estado] || estado
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
  },
  mixins: [dataMixins, methodsMixins],
  data() {
    var self = this
    return {
      tableData: [],
      aCategorias: [],
      aConceptos: [],
      dataToAdd: Object.assign({}, formModels),
      rules: Object.assign({}, rules),
      aTablaCabecera: Object.assign({}, aTablaCabecera),
      dialogFormVisible: false,
      listLoading: false,
      nTotalPaginas: 0,
      props: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, data } = node
          if (level === 0) {
            const res = await self.consultaCategorias()
            const response = res.map(item => {
              return {
                value: item.idc,
                label: item.titulo,
                leaf: level > 0
              }
            })
            resolve(response)
          } else if (level === 1) {
            const res = await self.consultaConceptos(data.value)
            const response = res.map(item => {
              return {
                value: item.idSC,
                label: item.titulo,
                leaf: true
              }
            })
            resolve(response)
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('categorias', ['gCategoriasList']),
    ...mapGetters('conceptos', ['gConceptos']),
    registreCount() {
      return this.tableData.length
    }
  },
  methods: {
    ...mapActions('categorias', ['getCategorias']),
    ...mapActions('conceptos', ['getListConceptos']),
    ...mapActions('pagosEfectuados', ['savePagosEfectuados']),
    async consultaCategorias() {
      await this.getCategorias({
        filter: {},
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gCategoriasList
      if (validarStatus(status)) return false
      this.aCategorias = response?.content.filter(c => c.estado === '1')
      return this.aCategorias
    },
    async consultaConceptos(categoria) {
      await this.getListConceptos({
        filter: { categoria },
        pageNumber: 0,
        pageSize: 50
      })
      const { response, status } = this.gConceptos
      if (validarStatus(status)) return false
      this.aConceptos = response?.content.filter(c => c.estado === '1')
      return this.aConceptos
    },
    async agregarPagoEfectuado() {
      this.dialogFormVisible = true
    },
    async facturar() {
      for (const filePush of this.tableData) {
        filePush.concepto = filePush.concepto.idSC
        filePush.categoria = filePush.categoria.idc
        filePush.abono = 0
      }
      console.log(this.tableData)
      await this.savePagosEfectuados(this.tableData)
      this.tableData = []
      this.notification('Ok', `Se Facturo El Pago Recibido`, 'success')
    },
    eliminar(valorSeleccionado) {
      this.tableData.splice(this.tableData.indexOf(valorSeleccionado), 1)
      this.tableData = [...this.tableData]
    },
    onSubmit(data) {
      this.$refs['dataToAdd'].validate((valid) => {
        const datos = {
          categoria: this.aCategorias.find(x => x.idc === data.concepto[0]),
          concepto: this.aConceptos.find(x => x.idSC === data.concepto[1]),
          monto: data.monto,
          metodopago: data.metodopago,
          estadopago: data.estadopago,
          fechapago: data.fechapago,
          comentario: data.comentario
        }
        if (valid) {
          console.log({ datos })
          this.tableData.push(datos)
          this.nTotalPaginas = this.tableData.length
          this.close()
          this.dataToAdd = Object.assign({}, formModels)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {
      this.dialogFormVisible = false
      // this.resetTableData()
    }
  }
}

function pagosRecibidosCabecera() {
  return [
    {
      titulo: 'Categoria',
      valor: 'categoria',
      align: 'center',
      width: '120'
    },
    {
      titulo: 'Concepto',
      valor: 'concepto',
      align: 'center',
      width: '150'
    },
    {
      titulo: 'Monto',
      valor: 'monto',
      align: 'center',
      width: '150'
    },
    {
      titulo: 'Metodo Pago',
      valor: 'metodopago',
      align: 'center',
      width: '150'
    },
    {
      titulo: 'Estado Pago',
      valor: 'estadopago',
      align: 'center',
      width: '150'
    },
    {
      titulo: 'Comentario',
      valor: 'comentario'
    },
    {
      titulo: 'Fecha de Pago',
      valor: 'fechapago',
      align: 'center',
      width: '150'
    },
    {
      titulo: 'Accion',
      valor: 'accion',
      align: 'center',
      width: '150'
    }
  ]
}

function oFormModels() {
  return {
    concepto: '',
    monto: '',
    metodopago: 'CASH',
    estadopago: '0',
    fechapago: new Date(),
    comentario: ''
  }
}

function oReglas() {
  return {
    concepto: [
      {
        required: true,
        message: 'El campo concepto es Requerido',
        trigger: 'blur'
      }
    ],
    metodopago: [
      {
        required: true,
        message: 'El campo metodo de pago es Requerido',
        trigger: 'blur'
      }
    ],
    estadopago: [
      {
        required: true,
        message: 'El campo estado de pago es Requerido',
        trigger: 'blur'
      }
    ],
    monto: [
      {
        required: true,
        message: 'El campo Monto es Requerido',
        trigger: 'blur'
      },
      { type: 'number', message: 'monto Debe ser Numerico', trigger: ['blur', 'change'] }
    ],
    fechapago: [
      {
        required: true,
        message: 'Porfavor Seleccione una fecha',
        trigger: 'blur'
      }
    ]
  }
}

// var validateValorMonto = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('El campo Monto es Requerido'))
//   }

//   if (!Number.isInteger(value)) {
//     callback(new Error('monto Debe ser Numerico'))
//   } else {
//     if (value < 18) {
//       callback(new Error(`El valor del Monto debe ser Mayor a  $ ${value} Pesos`))
//     } else {
//       callback()
//     }
//   }
// }

// var validateValorMonto = (rule, value, callback) => {
//   if (Number.isInteger(value) < 50) {
//     callback(new Error(`El valor del Monto debe ser Mayor a  $ ${value} Pesos`))
//   }
//   callback()
// }
</script>

<style>

</style>
