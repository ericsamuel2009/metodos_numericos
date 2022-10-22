<template>
  <div id="t-simpson-13">
    <div class="app-container">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 24}" :xl="{span: 24}">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span><b>Metodo Simpson 1/3</b></span>
            <el-button style="float: right;" type="primary" plain @click="calcular">Calcular</el-button>
            <el-button icon="mdi mdi-calculator" circle type="info" @click="dialogTableVisible = true" /> <i class="mdi mdi-menu-right" @click="mostrar" />
          </div>
          <div>
            <b><el-input v-model.number="input1" placeholder="b" size="mini" class="inputIntegral" /></b>
            <div>
              <h1 style="margin-top: auto; margin-bottom: -40px;">∫ <el-input v-model="input3" style="top: -42px;;margin-left: 10px;" placeholder="Ingrese Ecuacion" /></h1>
            </div>
            <el-input v-model.number="input2" placeholder="a" size="mini" class="inputIntegral" />
          </div>
        </el-card>
      </el-col>

      <el-dialog title="Calculadora" :visible.sync="dialogTableVisible" width="30%">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="always">
              Always
            </el-card>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogTableVisible = false">Agregar Formula</el-button>
        </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TSimpson13',
  data() {
    return {
      input1: 0,
      input2: 0,
      input3: '',
      dialogTableVisible: false,
      mostrar: false
    }
  },
  methods: {
    calcular() {
      console.log('Calculo')
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
</style>
