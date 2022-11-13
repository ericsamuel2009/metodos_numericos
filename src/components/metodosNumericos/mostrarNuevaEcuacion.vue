<template>
  <span>
    <span class="eq-c">
      <span class="radical">
        <span class="valorSuperior">{{ valorSuperior }}</span>
        <span class="integral">∫</span>
        <span class="valorInferior">{{ valorInferior }}</span>
        <span v-html="convertirEcuacion" /> dx
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'MostrarNuevaEcuacion',
  props: {
    nuevaEcuacion: {
      type: String,
      default: ''
    },
    valorSuperior: {
      type: [String, Number],
      default: 0
    },
    valorInferior: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    convertirEcuacion() {
      return this.nuevaEcuacion.replaceAll('sqrt', `&radic;`).replaceAll('()', '').replaceAll('log10', 'Log').replaceAll('log', 'Ln')
    }
  }
}
</script>

<style lang="scss" scoped>
.radical {
    position: relative;
    font-size: 1.6em;
    vertical-align: middle;
}
.n-root {
    position: absolute;
    top: -0.333em;
    left: 0.333em;
    font-size: 45%;
}
.radicand {
    padding: 0.25em 0.25em;
    border-top: thin black solid;
}
.valorSuperior {
  position: absolute;
    font-size: 11px;
    top: -12px;
    left: 9px
}
.valorInferior {
  position: absolute;
  font-size: 11px;
  bottom: -7px;
  left: 5px;
}
.integral {
  margin-right: 6px;
    font-size: 1.2em;
    position: relative;
}
</style>
