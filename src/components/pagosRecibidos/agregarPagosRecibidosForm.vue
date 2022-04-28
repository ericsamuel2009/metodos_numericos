<template>
  <div id="guardarPagosRecibidos">
      <vs-button
        relief
        @click="dialogoActive=!dialogoActive"
      >
        Nuevo Ingreso
      </vs-button>
      <form >
    <div class="center">
      <vs-dialog blur prevent-close v-model="dialogoActive">
        <template #header>
          <h4 class="not-margin">
              AGREGAR PAGOS RECIBIDOS 
          </h4>
        </template>


        <div class="con-form center grid">

            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="12">
                    <vs-input v-model="form.cliente" placeholder="Cliente">
                        <template #icon>
                        <i class="mdi mdi-account-arrow-right"></i>
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>   
            <vs-row>
                <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                    <vs-input v-model="form.motivo" placeholder="motivo Pago"></vs-input>
                </vs-col>

                <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="6">
                    <vs-input v-model="form.monto" placeholder="$$$">
                        <template #icon>
                        <i class="mdi mdi-cash"></i>
                        </template>
                    </vs-input>
                </vs-col>
            </vs-row>
          <vs-input type="text" v-model="form.comentario" placeholder="Comentario">
            <template #icon>
              <i class='mdi mdi-comment-outline'></i>
            </template>
          </vs-input>
        </div>

        <template #footer>
          <div class="footer-dialog">
            <vs-button block relief @click="guardar">
              Guardar
            </vs-button>

            <!-- <div class="new">
              <a href="#" @click="irAtras()">Cancelar</a>
            </div> -->
          </div>
        </template>



      </vs-dialog>
    </div>
      </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { validacionCamposVacios } from "@/validators/pagosRecibidosValidator"
export default {
    name: "guardarPagosRecibidos",
    data: ()=>({
        form: {},
        dialogoActive: false,
        input1: '',
        input2: '',
        checkbox1: false
    }),
    computed: {
        ...mapState('pagosRecibidos',['pagosRecibidosResponse'])
    },
    methods:{
        ...mapActions('pagosRecibidos',['getSavePagosRecibidos']),
        guardar(){
            if (validacionCamposVacios( this.form )) {
                this.$emit("trigger",this.form)
                this.dialogoActive = false;
                this.limpiarInformacion();
            }
        },
        limpiarInformacion(){
        this.form = {
            cliente: '',
            motivo: '',
            monto: '',
            comentario: '',
            fechaPago: ''
        }
        },
        irAtras(){
            this.dialogoActive = false
            this.limpiarInformacion();
            //this.$emit("trigger",null)
            ///this.$router.push('/pagosRecibidos/listar'),
        }
    },
    destroyed() {
        // confirm("ESTAS SEGURO QUE QUIERES SALIR? NO SE GUARDARAN LOS CAMBIOS")
        this.limpiarInformacion();
    },
}

</script>

<style>
.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}

</style>