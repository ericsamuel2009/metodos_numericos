<template>
  <div id="EditarrPagosRecibidos" v-loading="loading">
    <div class="app-container">
      <div class="createPost-container">
        <el-form
          ref="dataToEdit"
          :model="dataToEdit"
          status-icon
          label-width="120px"
          label-position="top"
          :rules="rules"
          class="demo-ruleForm"
        >
          <el-row :gutter="10">
            <el-col :xs="26" :sm="3" :md="3" :lg="3" :xl="3">
              <div class="grid-content">
                <el-form-item label="Cliente" prop="cliente">
                  <el-input v-model="dataToEdit.cliente" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="26" :sm="3" :md="3" :lg="3" :xl="3">
              <div class="grid-content">
                <el-form-item label="Motivo" prop="motivo">
                  <el-input v-model="dataToEdit.motivo" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="26" :sm="3" :md="3" :lg="3" :xl="3">
              <div class="grid-content">
                <el-form-item label="Monto" prop="monto">
                  <el-input v-model="dataToEdit.monto" />
                </el-form-item>
              </div>
            </el-col>
            <el-col :xs="26" :sm="3" :md="3" :lg="3" :xl="3">
              <div class="grid-content">
                <el-form-item label="Fecha Pago" prop="date">
                  <el-date-picker
                    v-model="cFechaPago"
                    type="date"
                    placeholder="Fecha Pago"
                    format="yyyy/MM/dd"
                    value-format="yyyy-MM-dd"
                  />
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          {{ dataToEdit.fechapago }}
          <el-form-item label="Comentario">
            <el-input
              v-model="dataToEdit.comentario"
              type="textarea"
              maxlength="500"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="update(dataToEdit)"
            >Actualizar</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/editarPagosRecibidos"></script>
<style></style>
