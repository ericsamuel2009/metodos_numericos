<template>
  <div id="FilterDinamic">
    <div class="filter-container">
      <el-form ref="form" :inline="true" :model="filterForm" size="mini">
        <el-form-item label="Referencia">
          <el-input v-model="filterForm.referencia" />
        </el-form-item>
        <el-form-item label="Cliente">
          <el-input v-model="filterForm.cliente" />
        </el-form-item>
        <el-form-item label="Monto">
          <el-input v-model="filterForm.monto" />
        </el-form-item>
        <el-form-item label="Fecha Pago">
          <el-col :span="11">
            <el-date-picker
              v-model="filterForm.fechapago"
              type="date"
              placeholder="Pick a date"
            />
          </el-col>
        </el-form-item>

        <el-form-item size="mini">
          <el-button
            type="primary"
            round
            @click="consultarPagosRecibidos"
          >Consultar</el-button>
        </el-form-item>
        <el-form-item size="mini">
          <el-button
            type="primary"
            round
            @click="consultarPagosRecibidos"
          >Agregar</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const SIZE_FORM = formDeclare()
export default {
  name: 'FilterDinamic',
  data: () => ({
    filterForm: SIZE_FORM
  })
}
function formDeclare() {
  return {
    referencia: null,
    cliente: null,
    monto: null,
    fechapago: null
  }
}
</script>

<style></style>

