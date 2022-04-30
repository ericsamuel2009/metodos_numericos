<template>
  <div id="listaPagosRecibidos">
    <el-input
      v-model="search"
      size="mini"
      placeholder="Type to search"
    />
    <div class="app-container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        border
      >
        <el-table-column label="Cliente" prop="cliente" />
        <el-table-column label="motivo Pago" prop="motivo" />
        <el-table-column label="Monto" prop="monto" />
        <el-table-column label="Comentario" prop="comentario" />
        <el-table-column label="Pagos de Pago" prop="fechaPago" />

        <el-table-column
          fixed="right"
          label="Acciones"
          width="100"
        >
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick" type="text" size="small">Detail</el-button> -->
            <el-button type="text" size="small">Eliminar</el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-minus" circle @click="handleDelete(scope.$index, scope.row)" />
          </template>
        </el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/listarPagosRecibidos.js"></script>
<style src="@/views/pagosRecibidos/styles/listarPagosRecibidos.css" scoped></style>
