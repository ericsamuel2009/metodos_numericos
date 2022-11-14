<template>
  <div class="tourGuia">
    <el-button icon="el-icon-question" type="button" class="btn btn-outline-dark" @click.prevent.stop="guide">
      Mostrar Guia
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import guiaDashboard from './modules/guiaDashboard'
import guiaTSimpson13 from './modules/guiaTSimpson13'
import guiaTSimpson38 from './modules/guiaTSimpson38'
import guiaJeorgeBoole from './modules/guiaJeorgeBoole'
import guiatrapezoidal from './modules/guiatrapezoidal'
import guiaSimpsonAbierto from './modules/guiaSimpsonAbierto'
export default {
  name: 'Tour',
  data: function() {
    return {
      driver: null
    }
  },
  mounted() {
    this.driver = new Driver()
  },
  methods: {
    guide() {
      console.log(this.$router.currentRoute)
      const NAME_ROUTER = {
        'Dashboard': guiaDashboard,
        'TSimpson13': guiaTSimpson13,
        'TSimpson38': guiaTSimpson38,
        'JeorgeBoole': guiaJeorgeBoole,
        'Trapezoidal': guiatrapezoidal,
        'SimpsonAbierto': guiaSimpsonAbierto
      }
      this.driver.defineSteps(NAME_ROUTER[this.$router.currentRoute.name])
      this.driver.start()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
