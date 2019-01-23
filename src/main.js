import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  { ApiService } from './ApiService'
import _ from 'lodash'
import moment from 'moment'
moment.locale('ja')
Vue.prototype.$apiService = new ApiService()
Vue.prototype.$_ = _
Vue.prototype.$moment = moment

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
