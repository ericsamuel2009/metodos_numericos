import { Message } from 'element-ui'
export default {
  methods: {
    messageToast(showClose = true, message, type) {
      Message({
        showClose,
        message,
        type
      })
    },
    notification(title = 'Default', message = 'falta una descripcion del mensaje', type = null) {
      this.$notify({ title, message, type })
    },
    colorStatusHandler(row) {
      const ESTADO_CATEGORIA = {
        0: 'danger',
        1: 'success'
      }
      return ESTADO_CATEGORIA[row.estado] || row.estado
    }
  }
}
