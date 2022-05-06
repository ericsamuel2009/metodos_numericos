import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import './icons'
import './permission'
import './utils/error-log'
import * as filters from './filters' // global filters
import VueRx from 'vue-rx'
import 'tui-calendar/dist/tui-calendar.css'
import 'tui-date-picker/dist/tui-date-picker.css'
import 'tui-time-picker/dist/tui-time-picker.css'
const moment = require('moment')
require('moment/locale/es')
import VCalendar from 'v-calendar'
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(VueRx).use(Element, {
  size: Cookies.get('size') || 'medium',
  locale: enLang
}).use(require('vue-moment'), {
  moment
}).use(VCalendar, {
  componentPrefix: 'vc'
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
