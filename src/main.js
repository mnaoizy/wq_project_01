import Vue from 'vue'
import App from './App.vue'
import router from './router'
import  { ApiService } from './ApiService'

Vue.prototype.$apiService = new ApiService()

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
