<template>
  <div id="ListarCategorias">
      <h1>CATEGORIAS</h1>
<div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
    <!-- <AgregarGrupo v-if="mostrarAgregarGrupo" @triggerGrupos="accionTriggerGrupos" :key="mostrarAgregarGrupo"/> -->
</div>
      <button @click="mostrarAgregarGrupo = !mostrarAgregarGrupo">Nueva Categoria</button>
      <table class="tabla">
          <strong v-if="!Acategorias || Acategorias.length == 0">no hay datos</strong>
          <small v-if="carga">Cargando</small>
          <tr>
              <th>Titulo</th> <!-- SI ES VASS U OTRA ENTIDAD -->
              <th>fecha creacion</th> <!--SI FUE PRIMA O NOMINA U OTRA COSA-->
              <th>Accion</th> <!-- FECHA DEL REGISTRO -->
          </tr>
          <tr v-for="(main,index) in Acategorias" :key="index" :class="{ desactivado : main.estado == 0}">
              <td>{{main.titulo}}</td>
              <td>{{main.fecha | moment("DD/MM/YYYY")}}</td>
              <td>
                  <a @click="verOpcion(main)">ver</a> |
                  <a @click="editOpcion(main)">editar</a> |
                  <a @click="eliminarOpcion(main)" style="cursor:pointer;">Eliminar</a> |
                  <a @click="Activar(main)" style="cursor:pointer;" v-if="main.estado == 0">Activar</a>
              </td>
          </tr>
      </table>
  </div>
</template>

<script>
 
import { mapState, mapActions} from 'vuex';
// import AgregarGrupo from "@/components/grupos/agregarGrupo.vue"
export default {
    name: "ListarCategorias",
    data: () => ({
      Acategorias: [],
      mostrarAgregarGrupo: false,
      carga: false
    }),
    components: {
      AgregarGrupo
    },
    methods: {
      ...mapActions('grupos',['getListGrupos','deleteGrupos']),
      accionTriggerGrupos( datosGrupos ) {
        this.consultaGrupos();
        if (!['new'].includes(datosGrupos)) {
            this.mostrarAgregarGrupo = false;
        }
      },
      nuevoIngreso() {

      },
      verOpcion() {
 
      },
      editOpcion() {

      },
      async eliminarOpcion( item ){
        await this.deleteGrupos( item.id )
        this.consultaGrupos();
      },
      async Activar() {

      },
      async consultaGrupos() {
        this.carga = true;
        await this.getListGrupos();
        this.Acategorias = this.gruposList.data;
        this.carga = false;
      }
    },
    filters: {
      formateoFecha( fecha ) {
        return this.$moment(fecha);
      }
    },
    computed: {
      ...mapState('grupos',['gruposList']),

    },
    created() {
      this.consultaGrupos();
    }
}
</script>

<style>
tr.desactivado > td {
  color: #d1d1d1;;
}
</style>