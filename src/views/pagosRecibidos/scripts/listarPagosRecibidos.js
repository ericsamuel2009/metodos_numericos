export default {
  /* eslint-disable */
  name: 'ListarPagosRecibidos',
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'John',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Morgan',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Jessy',
        address: 'No. 189, Grove St, Los Angeles'
      }],
      search: ''
    }
  },
  methods: {
      async consultarPagosRecibidos() {
        const loading = this.$vs.loading({
            text: 'Cargando...'
        })
    await this.getTodosPagosRecibidosList();
        loading.close()
        const { response, status } = this.todosPagosRecibidosResponseList
        if (validarStatus(status,this.$vs)) {
            this.aPagosRecibidos = response
        }
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
