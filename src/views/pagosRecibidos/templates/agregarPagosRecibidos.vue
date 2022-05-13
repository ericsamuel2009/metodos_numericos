<template>
  <div id="pagosRecibidos">
    <div class="app-container">
      <div class="app-container">
        <el-button type="primary" size="mini" @click="agregarPagoRecibido">Agregar</el-button>
        <el-button type="primary" size="mini" @click="facturar">facturar pagos recibidos</el-button>
      </div>
      <tabla-dinamica
        :datos="tableData"
        :tablacabecera="aTablaCabecera"
        :list-loading="listLoading"
      >
        <template #accion="{row}">
          <el-button type="text" @click="editar(row)">editar</el-button>
          <el-button type="text" @click="eliminar(row)">Eliminar</el-button>
        </template>
        <template #monto="{row}">
          {{row.monto | toCurrency}}
        </template>
      </tabla-dinamica>

      <el-dialog title="add" :visible.sync="dialogFormVisible" width="40%" center>
        <div class="createPost-container">
          <el-form
            ref="dataToAdd"
            :model="dataToAdd"
            status-icon
            label-width="120px"
            label-position="top"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-row :gutter="10">
              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Cliente" prop="cliente">
                    <el-input v-model="dataToAdd.cliente" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="26" :sm="6" :md="6" :lg="6" :xl="6">
                <div class="grid-content">
                  <el-form-item label="Motivo" prop="motivo">
                    <el-input v-model="dataToAdd.motivo" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Monto" prop="monto">
                    <el-input v-model.number="dataToAdd.monto" />
                  </el-form-item>
                </div>
              </el-col>
              <el-col :xs="26" :sm="5" :md="5" :lg="5" :xl="5">
                <div class="grid-content">
                  <el-form-item label="Fecha Pago" prop="date">
                    <el-date-picker
                      v-model="dataToAdd.fechapago"
                      type="date"
                      placeholder="Fecha Pago"
                      format="yyyy/MM/dd"
                      value-format="yyyy-MM-dd"
                    />
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Comentario">
              <el-input
                v-model="dataToAdd.comentario"
                type="textarea"
                maxlength="500"
                show-word-limit
              />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click.prevent="onSubmit(dataToAdd)">
            Agregar
          </el-button>
          <el-button @click.prevent="close">
            Cancelar
          </el-button>
        </div>
      </el-dialog>
    </div>
    <pagination
      :total="nTotalPaginas"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
    />
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/agregarPagosRecibidos.js"></script>
<style
  src="@/views/pagosRecibidos/styles/agregarPagosRecibidos.css"
  scoped
></style>
