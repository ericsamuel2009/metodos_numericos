<template>
  <div id="pagosRecibidos">
    <vs-row>
      <vs-col offset="3" w="6">
        <h1>PAGOS RECIBIDOS</h1>
        <AgregarPago @trigger="accionTrigger" />
        <div style="display: -webkit-inline-box">
          <label for="">Fecha Pago </label>
          <vs-input v-model="fechaPago" type="datetime-local" />
          <!-- <input type="datetime-local" placeholder="fecha pago" v-model="fechaPago">  -->
          <input
            :value="soloMes"
            disabled
            placeholder="mes"
            style="width: 100px"
          >
          <vs-button relief size="small" @click="facturar">
            facturar pagos recibidos
          </vs-button>
        </div>
        <div class="center">
          <vs-table>
            <template #thead>
              <vs-tr>
                <vs-th> Cliente </vs-th>
                <!-- SI ES VASS U OTRA ENTIDAD -->
                <vs-th> motivo Pago </vs-th>
                <!--SI FUE PRIMA O NOMINA U OTRA COSA-->
                <vs-th> Monto </vs-th>
                <!-- CANTIDAD DE DINERO-->
                <vs-th> Comentario </vs-th>
                <!-- COMENTARIO ADICIONAL -->
                <!-- <vs-th> Fecha Pago </vs-th> FECHA DE PAGO -->
                <vs-th>Eliminar </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr
                v-for="(main, index) in $vs.getPage(aPagosRecibidos, page, max)"
                :key="index"
                :data="main"
              >
                <vs-td
                  edit
                  @click="
                    ;(edit = main), (editProp = 'cliente'), (editActive = true)
                  "
                >
                  {{ main.cliente }}
                </vs-td>
                <vs-td
                  edit
                  @click="
                    ;(edit = main), (editProp = 'motivo'), (editActive = true)
                  "
                >
                  {{ main.motivo }}
                </vs-td>
                <vs-td
                  edit
                  @click="
                    ;(edit = main), (editProp = 'monto'), (editActive = true)
                  "
                >
                  {{ main.monto | toCurrency }}
                </vs-td>
                <vs-td
                  edit
                  @click="
                    ;(edit = main),
                      (editProp = 'comentario'),
                      (editActive = true)
                  "
                >
                  {{ main.comentario }}
                </vs-td>
                <vs-td>
                  <vs-button
                    circle
                    danger
                    relief
                    size="mini"
                    @click="eliminarOpcion(main)"
                  >
                    <i class="mdi mdi-minus" />
                  </vs-button>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination
                v-model="page"
                :length="$vs.getLength(aPagosRecibidos, max)"
              />
            </template>
          </vs-table>
          <vs-dialog v-model="editActive" blur prevent-close>
            <template #header>
              <h4 class="not-margin">
                Cambiar Campo de <b>{{ editProp }}</b>
              </h4>
            </template>

            <div class="con-form">
              <vs-input
                v-if="editProp == 'cliente'"
                v-model="edit[editProp]"
                placeholder="Cliente"
                @keypress.enter="editActive = false"
              >
                <template #icon>
                  <i class="mdi mdi-account-arrow-right" />
                </template>
              </vs-input>

              <vs-input
                v-if="editProp == 'motivo'"
                v-model="edit[editProp]"
                placeholder="Motivo"
                @keypress.enter="editActive = false"
              />

              <vs-input
                v-if="editProp == 'monto'"
                v-model="edit[editProp]"
                type="number"
                placeholder="Monto"
                @keypress.enter="editActive = false"
              >
                <template #icon>
                  <i class="mdi mdi-cash" />
                </template>
              </vs-input>

              <vs-input
                v-if="editProp == 'comentario'"
                v-model="edit[editProp]"
                placeholder="Comentario"
                @keypress.enter="editActive = false"
              >
                <template #icon>
                  <i class="mdi mdi-comment-outline" />
                </template>
              </vs-input>
            </div>
          </vs-dialog>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script src="@/views/pagosRecibidos/scripts/agregarPagosRecibidos.js"></script>
<style
  src="@/views/pagosRecibidos/styles/agregarPagosRecibidos.css"
  scoped
></style>
