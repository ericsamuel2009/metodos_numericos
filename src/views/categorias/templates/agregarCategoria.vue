<template>
  <div id="CrearCategoria">
    <div class="app-container">
      <div class="createPost-container">
        <el-form ref="sizeForm" :inline="true" :model="sizeForm" size="mini" status-icon label-width="120px" :rules="rules">
          <el-form-item ref="titulo" label="Titulo" prop="titulo">
            <el-input v-model="sizeForm.titulo" clearable />
          </el-form-item>
          <el-form-item label="Estado" prop="estado">
            <el-switch
              v-model="sizeForm.estado"
              active-color="#13ce66"
              active-value="1"
              inactive-value="0"
            />
            <!-- <el-select v-model="sizeForm.estado" placeholder="Seleccione una Opcion">
              <el-option label="Activo" value="1" />
              <el-option label="Inactivo" value="0" />
            </el-select> -->
          </el-form-item>

          <el-form-item size="mini">
            <el-button type="primary" round @click="agregarCategoria(sizeForm)">Agregar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="@/views/categorias/scripts/agregarCategoria.js"></script>
<style></style>
