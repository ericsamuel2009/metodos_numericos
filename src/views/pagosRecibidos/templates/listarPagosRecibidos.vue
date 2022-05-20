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
            <el-button type="info" plain round @click="agregarPagoRecibido">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <filter-dinamica /> -->
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
        summary
      >
        <template #referencia="{ row }">
          <span title="editar" class="link-type" @click="editarPagoRecibido(row)">
            {{ row.referencia }}
          </span>
        </template>
        <template #monto="{ row }">
          {{ row.monto | toCurrency }}
        </template>
        <template #fechapago="{ row }">
          {{ row.fechapago | moment('YYYY-MM-DD') }}
        </template>
        <template #comentario="{ row }">
          {{ row.comentario | limiteCaracteresFiltro }}
        </template>
        <template #accion="{row}">
          <!-- <el-button type="text" size="mini" >Editar</el-button> -->
          <el-popconfirm
            confirm-button-text="Si"
            cancel-button-text="No, Gracias"
            icon="el-icon-info"
            icon-color="red"
            title="Seguro De Eliminarlo?"
            @confirm="eliminarPagoRecibido(row)"
          >
            <slot name="delete">
              <el-button slot="reference" type="text" size="mini">Eliminar</el-button>
            </slot>
          </el-popconfirm>
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
