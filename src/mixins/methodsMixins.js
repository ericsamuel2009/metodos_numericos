import { Message } from 'element-ui'
import { create, all } from 'mathjs'
const math = create(all)
export default {
  methods: {
    messageToast(showClose = true, message, type) {
      Message({
        showClose,
        message,
        type
      })
    },
    notification(title = 'Default', message = 'falta una descripcion del mensaje', type = null) {
      this.$notify({ title, message, type })
    },
    colorStatusHandler(estado) {
      const ESTADO_CATEGORIA = {
        0: 'danger',
        1: 'success'
      }
      return ESTADO_CATEGORIA[estado] || estado
    },
    reemplazarEcuacion(ecuacion, valorReemplazar) {
      return ecuacion.replace(/[xX]+/g, valorReemplazar)
    },
    ecuacionConcatenado(simbolo, ecuacion, ecuacionInputElement) {
      let simboloResult = `${simbolo}(${ecuacion})`
      if (simbolo === '^' || simbolo === '(' || simbolo === ')') {
        simboloResult = ecuacion.substring(0, ecuacionInputElement.selectionStart) + simbolo + ecuacion.substring(ecuacionInputElement.selectionStart, ecuacion.length)
      }
      return simboloResult
    },
    newArrayChart(loopTabla) {
      var arrayX = []
      var arrayY = []
      var dimencionXY = []
      loopTabla.forEach(element => {
        const xElement = math.round(math.evaluate(element.x.toString()), 2).toString()
        const yElement = math.round(math.evaluate(element.total.toString()), 2).toString()
        arrayX.push(xElement)
        arrayY.push(yElement)
      })
      const dimencion = loopTabla.length
      // debugger
      for (let index = 0; index < dimencion; index++) {
        dimencionXY.push([arrayX[index], arrayY[index]])
      }
      return dimencionXY
    },
    newArrayData(tmp) {
      tmp.map(element => {
        return {
          x: element.x,
          ecuacion: this.mostrarEcuacion(element.ecu),
          total: (isNaN(math.evaluate(element.ecu))) ? 'Dato Incalculabre' : math.round(math.evaluate(element.ecu), 9)
        }
      })
    },
    returnNewFunctionX(decimal, respuestaFormula) {
      return (decimal > 3) ? respuestaFormula : math.evaluate(respuestaFormula)
    }
  }
}
