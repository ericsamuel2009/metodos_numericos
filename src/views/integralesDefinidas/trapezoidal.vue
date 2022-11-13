<template>
  <div id="trapezoidal">
    <div class="app-container">
      <el-row :gutter="24">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 20 }"
          :xl="{ span: 20 }"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><b>Trapezoidal</b></span> <i class="el-icon-arrow-right" /> <MostrarNuevaEcuacion :nueva-ecuacion="ecuacion" :valor-superior="valorSuperior" :valor-inferior="valorInferior" />
              <el-button
                style="float: right"
                type="danger"
                size="small"
                round
                @click="ecuacion = ''; loopTabla = []; valorSuperior = 0; valorInferior = 0; deltaInfo = 0; lineChartData = {}"
              >Limpiar Ecuacion</el-button>
              <el-button
                style="float: right"
                type="primary"
                :disabled="!ecuacion"
                size="small"
                round
                @click="calcular"
              >Calcular</el-button>
            </div>
            <div>
              <Ecuaciones @symbolTriggerEvent:add="agregarSimbol" />
              <el-input
                v-model.number="valorSuperior"
                placeholder="b"
                size="mini"
                class="inputIntegral"
              />
              <div>
                <h1 style="margin-top: auto; margin-bottom: -40px">
                  ∫
                  <el-input
                    id="ecuacion"
                    ref="ecuacion"
                    v-model="ecuacion"
                    style="top: -42px; margin-left: 10px"
                    placeholder="Ingrese Ecuacion"
                  />
                </h1>
              </div>
              <el-input
                v-model.number="valorInferior"
                placeholder="a"
                size="mini"
                class="inputIntegral"
              />
            </div>
          </el-card>
        </el-col>
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 4 }"
          :xl="{ span: 4 }"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><b>Formula</b></span>
            </div>
            <div>
              n = <el-input v-model.number="deltaInfo" style="width: 60px;" size="mini" />
              <!-- <el-input v-model.number="deltaInfo" style="width: 48px;" size="mini" /> -->
            </div>
            <div>
              <i class="mdi mdi-delta" /> =
              <div class="fraction">
                <span>{{ valorSuperior }} - {{ valorInferior }}</span>
                <span class="bar" />
                <span>{{ deltaInfo }}</span>
              </div>  = {{ resultadoDelta }}
              <!-- <el-input v-model.number="deltaInfo" style="width: 48px;" size="mini" /> -->
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top:8px">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><b>Las Particiones</b></span>
            </div>
            <!-- <div>
              <el-table
                :data="loopTabla"
                border
                height="270"
                :summary-method="getSummaries"
                show-summary
                style="width: 100%; margin-top: 20px"
              >
                <el-table-column prop="x" label="X" width="180" />
                <el-table-column prop="ecuacion" :label="ecuacionTabla" />
                <el-table-column prop="total" label="Total" />
              </el-table>
            </div> -->
            <tablaParticiones is-export :export-file-name="`metodoTrapezoidal`" :data="loopTabla" :ecuacion-tabla="ecuacionTabla" />
            <el-card class="box-card">
              <i class="mdi mdi-sigma" /> = {{ sumatoriaEcuacion }} <i class="mdi mdi-tilde" /> I = {{ resultadoDeLaFormula }}
            </el-card>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top:8px">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><b>Grafica 1</b></span>
            </div>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <function-plot :chart-data="lineChartData" opc="opc1" />
            </el-row>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="24" style="margin-top:8px">
        <el-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><b>Grafica 2</b></span>
            </div>
            <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
              <function-plot :chart-data="lineChartData" opc="opc2" />
            </el-row>
          </el-card>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
import Ecuaciones from '@/components/metodosNumericos/ecuacionoes.vue'
import tablaParticiones from '@/components/metodosNumericos/tablaParticiones.vue'
import MostrarNuevaEcuacion from '@/components/metodosNumericos/mostrarNuevaEcuacion.vue'
import FunctionPlot from '@/views/dashboard/admin/components/FunctionPlot.vue'
import MethodsMixins from '@/mixins/methodsMixins'
import { create, all } from 'mathjs'
const math = create(all)
export default {
  name: 'Trapezoidal',
  components: { Ecuaciones, tablaParticiones, MostrarNuevaEcuacion, FunctionPlot },
  mixins: [MethodsMixins],
  data() {
    return {
      valorSuperior: 0,
      valorInferior: 0,
      deltaInfo: 0,
      ecuacion: '',
      delta: null,
      dialogTableVisible: false,
      loopTabla: [],
      tmp: [],
      lineChartData: { },
      ecuacionInputElement: null
    }
  },
  computed: {
    resultadoDelta() {
      // debugger
      const total = (this.valorSuperior - this.valorInferior) / this.deltaInfo
      if (total.toString().split('.')[1] && total.toString().split('.')[1]?.length > 1) {
        return `${this.valorSuperior - this.valorInferior} / ${this.deltaInfo}`
      }
      return (isNaN(total)) ? 0 : total
    },
    sumatoriaEcuacion() {
      return this.loopTabla.reduce((prev, curr) => prev + curr.total, 0)
    },
    ecuacionTabla() {
      if (!this.ecuacion || this.ecuacion === '') { return 'Esperando Ecuacion' }
      return this.ecuacion
    },
    resultadoDeLaFormula() {
      // eslint-disable-next-line no-eval
      return ((eval(this.resultadoDelta)) * (this.sumatoriaEcuacion)) / 2
    }
  },
  // watch: {
  //   deltaInfo() {
  //     console.log("ddd");
  //   }
  // },
  mounted() {
    this.ecuacionInputElement = document.querySelector('#ecuacion')
  },
  methods: {
    agregarSimbol(simbolo) {
      this.ecuacion = this.ecuacionConcatenado(simbolo, this.ecuacion, this.ecuacionInputElement)
      this.$refs.ecuacion.$el.children[0].focus()
    },
    calcular() {
      if (!this.deltaInfo || this.deltaInfo === 0) {
        this.messageToast(true, 'debe agregar valor en "n" ', 'error', 'top-left')
        return false
      }
      if (!this.ecuacion) {
        this.messageToast(true, 'debe agregar una formular', 'error', 'top-left')
        return false
      }
      if (this.valorInferior > this.valorSuperior) {
        this.messageToast(true, 'El valor inicial no puede ser mayor al valor superior', 'error', 'top-left')
        // this.$notify({
        //   title: 'Error',
        //   message: 'El valor inicial no puede ser mayor al valor superior',
        //   type: 'error',
        //   position: 'top-left'
        // })
        return false
      }
      // debugger
      this.lineChartData = {}
      this.tmp = []
      this.loopTabla = []
      let x = this.valorInferior
      const ecua = '(' + this.ecuacion + ')'
      this.rellenarValorInicialaTabla(x, this.reemplazarEcuacion(ecua, x))
      // this.rellenarValorInicialaTabla(x, ecua.replace(/[x]+/g, x).replace(nue.val1, nue.val2Replae))

      while (x !== this.valorSuperior) {
        // debugger
        if (x > this.valorSuperior) {
          console.log('no alcanzo el loop ultimo valor:', x, 'valor al que debia alcanzar: ', this.valorSuperior)
          break
        }
        const ecuacion = `${x}+${this.resultadoDelta}`
        const formulaRes = math.format(math.simplify(ecuacion), { fraction: 'ratio' })
        x = math.evaluate(formulaRes)
        const dimencionDecimalX = x.toString().split('.')[1]?.length
        const newX = this.returnNewFunctionX(dimencionDecimalX, formulaRes) // (dimencionX > 3) ? formulaRes : math.evaluate(formulaRes)
        const nuevaEcuacion = this.reemplazarEcuacion(ecua, newX)
        this.tmp.push({ x: newX, ecu: nuevaEcuacion, decimal: dimencionDecimalX })
      }
      // // // console.log(this.tmp) Math.sqrt(84 / 34 / 34 / 34 / 3-5)
      // debugger
      const dimencionArray = this.tmp.length
      for (let i = 0; i < dimencionArray; i++) {
        if (i !== 0 && i !== dimencionArray - 1) {
          this.tmp[i].ecu = '2' + '*' + this.tmp[i].ecu
        }
      }
      // this.tmp[0].ecu = '1*' + this.tmp[0].ecu
      // this.tmp[dimencionArray - 1].ecu = '1*' + this.tmp[1].ecu
      // // this.tmp[2].ecu = '12*' + this.tmp[2].ecu
      // // this.tmp[3].ecu = '32*' + this.tmp[3].ecu
      // // this.tmp[4].ecu = '7*' + this.tmp[4].ecu

      this.loopTabla = this.tmp.map(element => {
        // debugger
        return {
          x: element.x,
          ecuacion: this.mostrarEcuacion(element.ecu),
          total: (isNaN(math.evaluate(element.ecu))) ? 'Dato Incalculabre' : math.evaluate(element.ecu)
        }
      })
      this.lineChartData = this.newArrayChart(this.loopTabla)
    },
    // reemplazarEcuacion(ecuacion, valorReemplazar) {
    //   return ecuacion.replace(/[xX]+/g, valorReemplazar)// .replace('sqrt', 'Math.sqrt').replace('pow', 'Math.pow').replace('cbrt', 'Math.cbrt').replace('cos', 'Math.cos').replace('exp', 'Math.exp')
    // },
    mostrarEcuacion(ecuacion) {
      const isMathSqrt = ecuacion.includes('sqrt')
      // const isMathLog = ecuacion.includes('log10')
      // const isMathPow = ecuacion.includes('pow')
      if (isMathSqrt) {
        return ecuacion.replace('Math.sqrt', 'sqrt')
      }
      // if (isMathLog) {
      //   return ecuacion.replace('log10', 'log')
      // }
      // if (isMathPow) {
      //   return ecuacion.replace('Math.pow', 'pow')
      // }
      return ecuacion
    },
    rellenarValorInicialaTabla(valInferior, ecu) {
      this.tmp.push({ x: valInferior, ecu: ecu })
    },
    mostrar() {
      return
    },
    getSummaries() {
      return null
    },
    calcularEcuacion() {
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>

.inputIntegral {
  width: 16px;

  ::v-deep .el-input__inner {
    padding: 0;
  }
}
.fraction {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0.2em 0.4ex;
    text-align: center;
}
.fraction > span {
    display: block;
    padding-top: 0.15em;
}
.fraction span.fdn {border-top: thin solid black;}
.fraction span.bar {
  height: 0px;
    width: 43px;
    background: black;}
</style>
