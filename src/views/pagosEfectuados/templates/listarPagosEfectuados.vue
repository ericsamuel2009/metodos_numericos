<template>
  <div id="pagosEfectuados">
    <div class="app-container">
      <filterDinamic :datos="aTablaCabecera">
        <template #select>
          <el-select
            v-model="concepto"
            clearable
            placeholder="Seleccione una Opcion"
          >
            <el-option v-for="main of aConceptos" :key="main.idSC" :label="main.titulo" :value="main.idSC" />
          </el-select>
        </template>
        <template #btn-accion="{ row }">
          <el-form-item size="mini">
            <el-button
              type="primary"
              round
              @click="consultarPagoEfectuado(row)"
            >Consultar</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button
              type="info"
              plain
              round
              @click="agregarPagoEfectuado()"
            >Agregar</el-button>
          </el-form-item>
        </template>
      </filterDinamic>
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
        summary
      >
        <template #categoria="{ row }">
          {{ row.conceptos.categorias.titulo }}
        </template>
        <template #conceptos="{ row }">
          {{ row.conceptos.titulo }}
        </template>
        <template #monto="{ row }">
          {{ row.monto | toCurrency }}
        </template>
        <template #estadopago="{ row }">
          {{ row.estadopago | convertEstadoPago}}
          <!-- <el-tag :type="colorStatusHandler(row.estadopago)" effect="dark">
            {{ row.estadopago | statusHandler }}
          </el-tag> -->
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
            @confirm="eliminarPagoEfectuados(row)"
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
      @pagination="consultarPagoEfectuado"
    />
  </div>
</template>

<script src="@/views/pagosEfectuados/scripts/listarPagosEfectuados.js"></script>
<style src="@/views/pagosEfectuados/styles/listarPagosEfectuados.css"></style>
