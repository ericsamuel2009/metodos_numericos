<template>
  <div id="listaPagosRecibidos">
    <div class="app-container">
      <div class="filter-container">
        <el-form ref="form" :inline="true" :model="sizeForm" size="mini">
          <el-form-item label="Referencia">
            <el-input v-model="sizeForm.referencia" />
          </el-form-item>
          <el-form-item label="Cliente">
            <el-input v-model="sizeForm.cliente" />
          </el-form-item>
          <el-form-item label="Monto">
            <el-input v-model="sizeForm.monto" />
          </el-form-item>
          <el-form-item label="Fecha Pago">
            <el-col :span="11">
              <el-date-picker v-model="sizeForm.fechapago" type="date" placeholder="Pick a date" />
            </el-col>
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" round @click="consultarPagosRecibidos">Consultar</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" round @click="consultarPagosRecibidos">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <filter-dinamica /> -->
      <tabla-dinamica
        to="/pagosRecibidos/editar"
        is-delete
        is-editable
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
        @triggerDelete="eliminarPagoRecibido"
      >
        <template v-slot:monto="{ row }">
          {{ row.monto | toCurrency }}
        </template>
        <template v-slot:fechapago="{ row }">
          {{ row.fechapago | moment('YYYY-MM-DD') }}
        </template>
        <template v-slot:comentario="{ row }">
          {{ row.comentario | limiteCaracteresFiltro }}
        </template>
      </tabla-dinamica>
    </div>
    <pagination
      :total="nTotalPaginas"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="consultarPagosRecibidos"
    />
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/listarPagosRecibidos.js"></script>
<style src="@/views/pagosRecibidos/styles/listarPagosRecibidos.css" scoped></style>
