<template>
  <div id="FilterDinamic">
    <div class="filter-container">
      <el-form ref="valor" :inline="true" :model="valor" size="mini">
        <el-form-item
          v-for="(main, index) in arregloFormulario"
          v-show="main.isSearch"
          :key="index"
          :label="main.titulo"
        >
          <el-col
            v-show="['date', 'datetime-local', 'month'].includes(main.type)"
          >
            <slot :name="main.type" :row="valor">
              <el-date-picker
                v-model="valor[main.valor]"
                :type="main.type"
                clearable
                placeholder="Seleccione Fecha"
              />
            </slot>
          </el-col>
          <el-col v-show="['monthrange'].includes(main.type)">
            <slot :name="main.type" :row="valor">
              <el-date-picker
                v-model="valor[main.valor]"
                :type="main.type"
                unlink-panels
                range-separator="a"
                start-placeholder="Inicio de Mes"
                end-placeholder="Final de mes"
              />
            </slot>
          </el-col>
          <el-col v-show="['select'].includes(main.type)">
            <slot :name="main.type" :row="valor" />
          </el-col>
          <el-col v-show="['number'].includes(main.type)">
            <slot :name="main.type" :row="valor">
              <el-input
                v-model.number="valor[main.valor]"
                clearable
                :type="main.type"
              />
            </slot>
          </el-col>
          <el-col v-show="['',null,undefined,' ','text'].includes(main.type)">
            <slot :name="main.type" :row="valor">
              <el-input
                v-model="valor[main.valor]"
                clearable
                :type="main.type"
              />
            </slot>
          </el-col>
        </el-form-item>
        <slot name="btn-accion" :row="valor" />
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterDinamic',
  // watch: {
  //   valor(forms) {
  //     console.log(forms)
  //     this.$emit('input', forms)
  //   }
  // },
  props: {
    datos: {
      type: [Array],
      default: function() {
        return []
      }
    }
    // value: [String, Array, Object],
  },
  data: () => ({
    aForm: [],
    valor: {}
  }),
  computed: {
    arregloFormulario() {
      return this.aForm // .filter((x) => !this.exceptuarValores.includes(x.valor))
    }
  },
  created() {
    console.log(this.datos)
    this.aForm = this.datos
  }
}
</script>

<style></style>
