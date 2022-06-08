<template>
  <div id="ListarCategorias">
    <div class="app-container">
      <div class="filter-container">
        <el-form ref="sizeForm" :inline="true" :model="sizeForm" size="mini">
          <el-form-item label="Titulo">
            <el-input v-model="sizeForm.titulo" clearable />
          </el-form-item>
          <el-form-item label="Estado">
            <el-select v-model="sizeForm.estado" clearable placeholder="Seleccione una Opcion">
              <el-option label="Activo" value="1" />
              <el-option label="Inactivo" value="0" />
            </el-select>
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" round @click="consultaCategorias">Consultar</el-button>
          </el-form-item>
          <el-form-item size="mini">
            <el-button type="primary" round @click="nuevaCategoria">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
      >
        <template #estado="{ row }">
          <el-tag :type="colorStatusHandler(row.estado)" effect="dark">
            {{ row.estado | statusHandler }}
          </el-tag>
        </template>
        <template #fecha="{ row }">
          {{ row.fecha | moment("YYYY-MM-DD") }}
        </template>
        <template #accion="{row}">
          <el-popconfirm
            confirm-button-text="Si"
            cancel-button-text="No, Gracias"
            icon="el-icon-info"
            icon-color="red"
            title="Seguro De Eliminarlo?"
            @confirm="eliminarCategoria(row)"
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
      @pagination="consultaCategorias"
    />
  </div>
</template>
<script src="@/views/categorias/scripts/listarCategorias.js"></script>
<style></style>
