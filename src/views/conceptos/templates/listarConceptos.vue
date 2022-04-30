<template>
  <div id="ListarConceptos">
      <h1>CONCEPTOS</h1>
      <!-- <router-link to="/pagosRecibidos/agregar">Nuevo Ingreso</router-link> -->
      <button @click="mostrarAgregarConcepto = !mostrarAgregarConcepto">Nueva Categoria</button>
        <!-- <AgregarConceptos v-if="mostrarAgregarConcepto" @triggerConcepto="accionTriggerConcepto" :key="mostrarAgregarConcepto"/> -->
      <table class="tabla">
          <!-- <strong v-if="!newDatos || newDatos.length == 0">no hay datos</strong> -->
          <!-- <small v-if="carga">Cargando</small> -->
          <tr>
              <th>Grupo</th> 
              <th>Concepto</th> 
              <th>fecha creacion</th> 
              <th>Accion</th> 
          </tr>
          <tr v-for="main in aConceptos" :key="main.id" :class="{ desactivado : main.estado == 0}">

              <td>{{main.categoria}}</td>
              <td>{{main.conceptos}}</td>
              <td>{{main.fecha | moment("DD/MM/YYYY")}}</td>
              <td>
                  <a @click="verOpcion(main)">ver</a> |
                  <a @click="editOpcion(main)">editar</a> |
                  <a @click="eliminarOpcion(main)" style="cursor:pointer;">Eliminar</a> |
                  <a @click="activar(main)" style="cursor:pointer;" v-if="main.estado == 0">Activar</a>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex';
// import AgregarConceptos from "@/components/conceptos/agregarConceptos"
export default {
    name: "ListarConceptos",
    data: () => ({
        aConceptos: [],
        mostrarAgregarConcepto: false,
        dConceptoResponse: ""
    }),
    components: {
        AgregarConceptos
    },
    computed: {
      ...mapState('conceptos',['conceptosList','deleteConceptoResponse']),
    },
    methods: {
        ...mapActions('conceptos',['getListConceptos','deleteConcepto']),
        accionTriggerConcepto( conceptoResponse ) {
            this.cargarConceptos()
            if (!['new'].includes(conceptoResponse)) {
                this.mostrarAgregarConcepto = false;
            }
        },
        verOpcion( oConcepto ) {

        },
        editOpcion( oConcepto ) {

        },
        async eliminarOpcion( oConcepto ) {
            await this.deleteConcepto(oConcepto.id)
            this.dConceptoResponse = this.deleteConceptoResponse;
            console.log(this.deleteConceptoResponse);
            this.cargarConceptos();
        },
        activar( oConcepto ) {

        },
        async cargarConceptos() {
            await this.getListConceptos();
            this.aConceptos = this.conceptosList.data;
        }
    },
    created() {
        this.cargarConceptos()
    }
}
</script>

<style>

</style>