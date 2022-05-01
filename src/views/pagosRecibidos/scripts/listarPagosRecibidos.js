import { mapActions, mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  /* eslint-disable */
  name: 'ListarPagosRecibidos',
  data() {
    return {
      tableData: [],
      range: {
        start: new Date(2020, 9, 12),
        end: new Date(2020, 9, 16),
      },
      listLoading: true,
      search: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  components: { Pagination },
  computed: {
    ...mapState('pagosRecibidos', ['todosPagosRecibidosResponseList']),
    ...mapGetters('pagosRecibidos',['aTodosPagosRecibidos']),
  },
  methods: {
    ...mapActions('pagosRecibidos', ['getTodosPagosRecibidosList']),
      async consultarPagosRecibidos() {
        console.log({l:this.listQuery})
        await this.getTodosPagosRecibidosList();
        console.log(this.aTodosPagosRecibidos);
        this.tableData = this.aTodosPagosRecibidos
        this.total = this.aTodosPagosRecibidos.length
        this.listLoading = false
        // const { response, status } = this.todosPagosRecibidosResponseList
        // if (validarStatus(status,this.$vs)) {
        //     this.aPagosRecibidos = response
        // }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  },
  filters:{
      toCurrency( valorACurrency ) {
          let currency = parseInt(valorACurrency)
          if ([NaN,undefined,null,''].includes(currency))  return "$ "+0; 
          var formatter = new Intl.NumberFormat('es-CO', {
              style: 'currency',
              currency: 'COP',
              minimumFractionDigits: 0
          });
          return formatter.format(currency);
      },
      separarAPuntoYComa(valorASeparaPorComa) {
          if(!valorASeparaPorComa) return
          return valorASeparaPorComa.split(" ; ").join(",")
      },
      quitarPunto(valor) {
          if( !valor ) return
          return valor.split(".").join("")
      },
      camelCase( valor ) {
          if( !valor ) return
          return valor.split(" ").map( palabra  => {
              return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
          }).join(" ");
      },
      uppercase( valorlowerToUpper ){
          return valorlowerToUpper.toUpperCase();
      },
      limiteCaracteresFiltro(valorProveedor) {
          if(!valorProveedor) return
          return (valorProveedor.length <= 44 )? valorProveedor : valorProveedor.substr(0,44) + "..."
      },
  },
  created() {
    this.consultarPagosRecibidos()
  },
}
