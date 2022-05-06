import { Message } from 'element-ui'
export default {
  methods: {
    message(showClose = true, message, type) {
      Message({
        showClose,
        message,
        type
      })
    }
  }
}
