<template>
  <div id="pagosEfectuados">
    <div class="app-container">
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
          {{ row.estadopago }}
        </template>
        <template #fechapago="{ row }">
          {{ row.fechapago | moment('YYYY-MM-DD') }}
        </template>
        <template #comentario="{ row }">
          {{ row.comentario | limiteCaracteresFiltro }}
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
