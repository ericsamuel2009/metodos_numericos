<template>
  <div id="listaPagosRecibidos">
    <div class="filter-container">
      <!-- <el-input v-model="search" size="mini" placeholder="Type to search" /> -->

      <vc-date-picker v-model="range" is-range>
        <template v-slot="{ inputValue, inputEvents }">
          <div class="flex justify-center items-center">
            <input
              :value="inputValue.start"
              v-on="inputEvents.start"
              class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
            />
           ->
            <input
              :value="inputValue.end"
              v-on="inputEvents.end"
              class="border px-2 py-1 w-32 rounded focus:outline-none focus:border-indigo-300"
            />
          </div>
        </template>
      </vc-date-picker>

      <!-- <vc-date-picker
        v-model="date"
        color="red"
        is-dark
        is-range
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="bg-white border px-2 py-1 rounded"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </vc-date-picker> -->
    </div>
    <div class="app-container">
      <el-table
        v-loading="listLoading"
        :data="tableData.filter( (data) => !search || data.cliente.toLowerCase().includes(search.toLowerCase()) ) "
        style="width: 100%"
        border
      >
        <el-table-column type="index" align="center" label="ID" width="50" />
        <el-table-column label="Cliente" align="center" prop="cliente" width="120" />
        <el-table-column label="motivo Pago" align="center" prop="motivo" width="200" />
        <el-table-column label="Monto" align="center" prop="monto" width="150">
          <template slot-scope="{ row }">
            {{ row.monto | toCurrency }}
          </template>
        </el-table-column>
        <el-table-column label="Comentario" prop="comentario" />
        <el-table-column align="center" label="Pagos de Pago" prop="fechaPago" width="130">
          <template slot-scope="{ row }">
            {{ row.fechaPago | moment("DD/MM/YYYY") }}
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="Acciones" width="100">
          <template slot-scope>
            <!-- <el-button @click="handleClick" type="text" size="small">Detail</el-button> -->
            <el-button type="text" size="small">Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="consultarPagosRecibidos"
    />
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/listarPagosRecibidos.js"></script>
<style
  src="@/views/pagosRecibidos/styles/listarPagosRecibidos.css"
  scoped
></style>
