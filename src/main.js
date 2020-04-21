import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'https://ksn2.faa.gov/afn/staffstatuscovid19/facilitiesincidents/_api'
axios.defaults.baseURL = `${_spPageContextInfo.webAbsoluteUrl}/_api`
axios.defaults.headers.get['Accept'] = "application/json;odata=verbose"

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
