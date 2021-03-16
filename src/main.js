import Vue from 'vue'
import App from './App.vue'
import Bridge from './config/bridge.js'

Vue.prototype.$bridge = Bridge

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
