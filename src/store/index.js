import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import app from './modules/app'
import user from './modules/user'
import settings from './modules/setting'
import errorLog from './modules/errorLog'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    permission, tagsView, app, user, settings, errorLog
  }

})

export default store
