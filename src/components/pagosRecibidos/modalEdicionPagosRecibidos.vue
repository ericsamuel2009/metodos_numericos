<template>
  <div id="edicion-pagos-recibidos">
            <vs-dialog v-model="bModal" blur prevent-close not-close>
              <template #header>
                    <slot name="HeaderEdicionPagosAdicionales"></slot>
              </template>
              <div class="con-form">
                <div v-for="(main,index) in cabecera" :key="index">
                  <vs-input 
                    :type="main.type"  
                    v-if="editProp == main.valor" 
                    @keypress.enter="enviarInformacion(aEdit)"  
                    v-model="aEdit[editProp]" 
                  >
                    <template #icon>
                      <i :class="`mdi ${main.icono}`"></i>
                    </template>
                  </vs-input>
                </div>
                <!-- <vs-button color="warning"  block @click="enviarInformacion(aEdit)">
                  Actualizar
                </vs-button> -->
              </div>


              <template #footer>
                <div class="con-footer">
                  <vs-button  @click="enviarInformacion(aEdit)" transparent>
                    Ok
                  </vs-button>
                  <vs-button  @click="cerrar(editProp)" dark transparent>
                    Cancel
                  </vs-button>
                </div>
              </template>


            </vs-dialog>
  </div>
</template>

<script>
export default {
    name: "edicion-pagos-recibidos",
    data: () =>({
        bModal: false,
        aEdicion: {}
    }),
    watch: {
        activarModal( bValorModal ) {
            this.bModal = bValorModal;
        },
    },
    props: {
        activarModal: [Boolean], 
        editProp: [String ,Object], 
        aEdit: [Object,Array], 
        icono: {
          type: String,
          default: ''
        },
        cabecera: {
          type: [Object,Array],
          default: function() {
            return []
          }
        }
    },
    methods: {
        async enviarInformacion( item ){
          item.fechaPago = this.$moment(item.fechaPago) 
            this.$emit('cambioEstado', item)
        },
        cerrar(editProp) {
          // this.aEdicion = this.aEdit
            this.$emit('cambioEstado', null)
        }
    }
}
</script>

<style>
.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.con-footer .vs-button {
  margin: 0px;
}
.con-footer .vs-button .vs-button__content {
  padding: 10px 30px;
}
.con-footer .vs-button ~ .vs-button {
  margin-left: 10px;
}
</style>