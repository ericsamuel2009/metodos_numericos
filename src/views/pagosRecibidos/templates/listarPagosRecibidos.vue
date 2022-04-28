<template>
  <div id="listaPagosRecibidos">
    <div class="app-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column label="Cliente" prop="cliente"/>
        <el-table-column label="motivo Pago" prop="motivo" />
        <el-table-column label="Monto" prop="monto" />
        <el-table-column label="Comentario" prop="comentario" />
        <el-table-column label="Pagos de Pago" prop="fechaPago" />
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/listarPagosRecibidos.js"></script>
<style src="@/views/pagosRecibidos/styles/listarPagosRecibidos.css" scoped></style>
