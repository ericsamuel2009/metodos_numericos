<template>
  <div id="pagosEfectuados">
    <vs-col offset="3" w="6">
      <h1>PAGOS EFECTUADOS</h1>
      <button @click="agregarPagoEfectuado">Nuevo Egreso</button><br>
      <label for="">Fecha Pago </label>
      <input
        v-model="fechaPago"
        type="date"
        placeholder="fecha pago"
        @change="cambioFecha"
      >
      <input :value="soloMes" disabled placeholder="mes">
      | <small> <button @click="facturar">facturar pagos</button></small> |
      total : <b>{{ valorTotal | toCurrency }}</b>
      <table class="tabla">
        <strong
          v-if="!datosEfectuados || datosEfectuados.length == 0"
        >no hay datos</strong>
        <small v-if="carga">Cargando</small>
        <tr>
          <th>Grupo</th>
          <!-- SI ES VASS U OTRA ENTIDAD -->
          <th>Concepto</th>
          <!--SI FUE PRIMA O NOMINA U OTRA COSA-->
          <th>Monto</th>
          <!-- CANTIDAD DE DINERO-->
          <th>está Pagado?</th>
          <!-- COMENTARIO ADICIONAL -->
          <th>Metodo Pago</th>
          <!-- COMENTARIO ADICIONAL -->
          <th>Mes Pago</th>
          <!-- FECHA DE PAGO -->
          <th>Comentario</th>
          <!-- COMENTARIO ADICIONAL -->
          <th>Accion</th>
          <!-- FECHA DEL REGISTRO -->
        </tr>
        <tr v-for="main in datosEfectuados" :key="main.referencia">
          <td>{{ main.grupo.titulo }}</td>
          <td>{{ main.concepto.titulo }}</td>
          <td>{{ main.monto | toCurrency }}</td>

          <td>
            <select id="" v-model="main.estadoPago" name="" disabled>
              <option value="0">NO</option>
              <option value="1">SI</option>
            </select>
          </td>
          <td>
            <select id="" v-model="main.metodoPago" name="" disabled>
              <option value="EFECTIVO">EFECTIVO</option>
              <option value="CUENTA">CUENTA</option>
            </select>
          </td>
          <td>
            <select id="" name="" :value="soloMes" disabled>
              <option value="January">Enero</option>
              <option value="February">Febrero</option>
              <option value="March">Marzo</option>
              <option value="April">Abril</option>
              <option value="May">Mayo</option>
              <option value="Juny">Junio</option>
              <option value="July">Julio</option>
              <option value="August">agosto</option>
              <option value="September">septiembre</option>
              <option value="October">octubre</option>
              <option value="November">noviembre</option>
              <option value="December">diciembre</option>
            </select>
          </td>
          <td>{{ main.comentario | limiteCaracteresFiltro }}</td>
          <!-- <td>
                  <a @click="verOpcion(main)">ver</a> |
                  <a @click="editOpcion(main)">editar</a> |
                  <a @click="eliminarOpcion(main)">Eliminar</a>
              </td> -->
        </tr>
      </table>
      <!-- <PagosEfectuados v-if="esPagosEfectuadosVisible" @triggerEfectuados="agregarNuevoPagoEfectuado" /> -->
    </vs-col>
  </div>
</template>

<script src="@/views/pagosEfectuados/scripts/listarPagosEfectuados.js"></script>
<style src="@/views/pagosEfectuados/styles/listarPagosEfectuados.css"></style>
