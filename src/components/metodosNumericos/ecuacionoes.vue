<template>
  <div>
    <el-card class="box-card">
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-square-root" @click="symbol('sqrt')" />
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-exponent" @click="symbol('^')" />
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-math-log" @click="symbol('log10')" />
      <el-button style="font-size: 1.3em;" type="primary" @click="symbol('log')">Ln</el-button>
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-math-sin" @click="symbol('sin')" />
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-math-tan" @click="symbol('tan')" />
      <el-button style="font-size: 1.3em;" type="primary" icon="mdi mdi-math-cos" @click="symbol('cos')" />
      <el-button style="font-size: 1.3em;" type="primary" @click="symbol('(')">(</el-button>
      <el-button style="font-size: 1.3em;" type="primary" @click="symbol(')')">)</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'TablaDeEcuaciones',
  methods: {
    symbol(simbolo) {
      this.$emit('symbolTriggerEvent:add', simbolo)
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 15px;
}
</style>
