import Vue from 'vue'
import Vuex from 'vuex'

import permission from './modules/permission'
import tagsView from './modules/tagsView'
import app from './modules/app'
import user from './modules/user'
import settings from './modules/setting'
import errorLog from './modules/errorLog'
import pagosRecibidos from './modules/pagosRecibidos'
import pagosEfectuados from './modules/pagosEfectuados'
import categorias from './modules/categorias'
import conceptos from './modules/conceptos'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission,
    tagsView,
    app,
    user,
    settings,
    errorLog,
    pagosRecibidos,
    pagosEfectuados,
    categorias,
    conceptos
  }

})

export default store
