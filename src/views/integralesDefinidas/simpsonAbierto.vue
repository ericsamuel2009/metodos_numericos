<template>
  <div id="simpsonAbierto">
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
              <span><b id="titulo-sa">Simpson Abierto</b></span> <i class="el-icon-arrow-right" /> <MostrarNuevaEcuacion id="mostrarNuevaEcuacion" :nueva-ecuacion="ecuacion" :valor-superior="valorSuperior" :valor-inferior="valorInferior" />
              <el-button
                id="limpiarBtn"
                style="float: right"
                type="danger"
                size="small"
                round
                @click="ecuacion = ''; loopTabla = []; valorSuperior = 0; valorInferior = 0; deltaInfo = 0; lineChartData = {}"
              >Limpiar Ecuacion</el-button>
              <el-button
                id="calcularBtn"
                style="float: right"
                type="primary"
                :disabled="!ecuacion"
                size="small"
                round
                @click="calcular"
              >Calcular</el-button>
            </div>
            <div>
              <Ecuaciones id="ecuacionesBtn" @symbolTriggerEvent:add="agregarSimbol" />
              <div id="tipearFormula">
                <el-input
                  v-model.number="valorSuperior"
                  placeholder="b"
                  size="mini"
                  class="inputIntegral"
                />
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
                <el-input
                  v-model.number="valorInferior"
                  placeholder="a"
                  size="mini"
                  class="inputIntegral"
                />
              </div>
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
            <div id="valorN">
              n = <el-input v-model.number="deltaInfo" style="width: 60px;" size="mini" />
            </div>
            <div id="deltaResultado">
              <i class="mdi mdi-delta" /> =
              <div class="fraction">
                <span>{{ valorSuperior }} - {{ valorInferior }}</span>
                <span class="bar" />
                <span>{{ deltaInfo }}</span>
              </div>  = {{ resultadoDelta }}
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
            <tablaParticiones is-export :export-file-name="`metodoSimpsonAbierto`" :data="loopTabla" :ecuacion-tabla="ecuacionTabla" />
            <el-card id="totalesSigma" class="box-card">
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
              <function-plot id="grafica1" :chart-data="lineChartData" opc="opc1" />
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
              <function-plot id="grafica1" :chart-data="lineChartData" opc="opc2" />
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-tooltip placement="top" content="subir">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="200" :back-position="1" transition-name="fade" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import Ecuaciones from '@/components/metodosNumericos/ecuacionoes.vue'
import tablaParticiones from '@/components/metodosNumericos/tablaParticiones.vue'
import MostrarNuevaEcuacion from '@/components/metodosNumericos/mostrarNuevaEcuacion.vue'
import FunctionPlot from '@/views/dashboard/admin/components/FunctionPlot.vue'
import MethodsMixins from '@/mixins/methodsMixins'
import BackToTop from '@/components/BackToTop'
import { create, all } from 'mathjs'
const math = create(all)
export default {
  name: 'SimpsonAbierto',
  components: { Ecuaciones, tablaParticiones, MostrarNuevaEcuacion, FunctionPlot, BackToTop },
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
      ecuacionInputElement: null,
      myBackToTopStyle: {
        right: '10px',
        bottom: '50px',
        width: '40px',
        height: '40px',
        'border-radius': '4px',
        'line-height': '45px',
        background: '#e7eaf1'
      }
    }
  },
  computed: {
    resultadoDelta() {
      const total = (this.valorSuperior - this.valorInferior) / this.deltaInfo
      if (total.toString().split('.')[1] && total.toString().split('.')[1]?.length > 3) {
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
  mounted() {
    this.ecuacionInputElement = document.querySelector('#ecuacion')
  },
  methods: {
    agregarSimbol(simbolo) {
      this.ecuacion = this.ecuacionConcatenado(simbolo, this.ecuacion, this.ecuacionInputElement)
      this.$refs.ecuacion.$el.children[0].focus()
    },
    calcular() {
      if (!this.ecuacion) {
        this.messageToast(true, 'debe agregar una formular', 'error', 'top-left')
        return false
      }
      if (!this.deltaInfo || this.deltaInfo === 0) {
        this.messageToast(true, 'debe agregar valor en "n"', 'error', 'top-left')
        return false
      }
      if (Math.abs(this.deltaInfo % 2) !== 0) {
        this.messageToast(true, 'El valor "n" debe ser Par', 'error', 'top-left')
        return false
      }
      if (this.valorInferior > this.valorSuperior) {
        this.messageToast(true, 'El valor inicial no puede ser mayor al valor superior', 'error', 'top-left')
        return false
      }
      this.lineChartData = {}
      this.tmp = []
      this.loopTabla = []
      let x = this.valorInferior
      const ecua = '(' + this.ecuacion + ')'
      const esFormulaCalculable = this.reemplazarEcuacion(ecua, x)
      if (isNaN(math.evaluate(esFormulaCalculable))) {
        this.messageToast(true, 'La Formula  "' + esFormulaCalculable + ' ", es incalculable', 'error', 'top-left')
        return false
      }
      this.rellenarValorInicialaTabla(x, this.reemplazarEcuacion(ecua, x))
      while (x !== this.valorSuperior) {
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
      const dimencionArray = this.tmp.length
      for (let i = 0; i < dimencionArray; i++) {
        let adicionImparPar = '4'
        if (i % 2 === 0) {
          adicionImparPar = '2'
        }
        if (i !== 0 && i !== dimencionArray - 1) {
          this.tmp[i].ecu = adicionImparPar + '*' + this.tmp[i].ecu
        }
      }
      this.loopTabla = this.tmp.map(element => {
        return {
          x: element.x,
          ecuacion: this.mostrarEcuacion(element.ecu),
          total: (isNaN(math.evaluate(element.ecu))) ? 'Dato Incalculabre' : math.round(math.evaluate(element.ecu), 9),
          decimal: element.decimal
        }
      })

      this.lineChartData = this.newArrayChart(this.loopTabla)
    },
    mostrarEcuacion(ecuacion) {
      const isMathSqrt = ecuacion.includes('sqrt')
      if (isMathSqrt) {
        return ecuacion.replace('Math.sqrt', 'sqrt')
      }
      return ecuacion
    },
    rellenarValorInicialaTabla(valInferior, ecu) {
      this.tmp.push({ x: valInferior, ecu: ecu })
    }
  }
}
</script>

<style lang="scss" scoped>

.inputIntegral {
  width: 20px;

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
