<template>
  <div id="t-simpson-13">
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
              <span><b>Metodo Simpson 1/3</b></span> <i class="el-icon-arrow-right" /> <MostrarNuevaEcuacion :nueva-ecuacion="ecuacion" :valor-superior="valorSuperior" :valor-inferior="valorInferior" />
              <el-button
                style="float: right"
                type="danger"
                size="small"
                round
                @click="ecuacion = ''; loopTabla = []; valorSuperior = 0; valorInferior = 0; lineChartData = {}"
              >Nueva Ecuacion</el-button>
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
            <tablaParticiones is-export :export-file-name="`motodoTSimpson13`" :data="loopTabla" :ecuacion-tabla="ecuacionTabla" />

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
import BackToTop from '@/components/BackToTop'
import MethodsMixins from '@/mixins/methodsMixins'
import { create, all } from 'mathjs'
const math = create(all)
export default {
  name: 'TSimpson13',
  components: { Ecuaciones, tablaParticiones, MostrarNuevaEcuacion, FunctionPlot, BackToTop },
  mixins: [MethodsMixins],
  data() {
    return {
      valorSuperior: 0,
      valorInferior: 0,
      ecuacion: '',
      deltaInfo: 2,
      delta: null,
      dialogTableVisible: false,
      loopTabla: [],
      tmp: [],
      grafica: {},
      lineChartData: { },
      ecuacionInputElement: null,
      myBackToTopStyle: {
        right: '50px',
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
      return (this.resultadoDelta * this.sumatoriaEcuacion) / 3
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
      if (this.valorInferior > this.valorSuperior) {
        this.messageToast(true, 'El valor inicial no puede ser mayor al valor superior', 'error', 'top-left')
        return false
      }
      this.lineChartData = { }
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
        const newX = this.returnNewFunctionX(dimencionDecimalX, formulaRes)
        const nuevaEcuacion = this.reemplazarEcuacion(ecua, newX)
        this.tmp.push({ x: newX, ecu: nuevaEcuacion, decimal: dimencionDecimalX })
      }
      const v = ['1', '4', '1']
      const dimencionArray = this.tmp.length
      for (let i = 0; i < dimencionArray; i++) {
        if (i !== 0 && i !== dimencionArray - 1) {
          this.tmp[i].ecu = v[i] + '*' + this.tmp[i].ecu
        }
      }
      this.loopTabla = this.tmp.map(element => {
        return {
          x: element.x,
          ecuacion: this.mostrarEcuacion(element.ecu),
          total: (isNaN(math.evaluate(element.ecu))) ? 'Dato Incalculabre' : math.evaluate(element.ecu)
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
