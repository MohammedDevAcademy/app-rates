import Vue from 'vue'
import VueResource from 'vue-resource'

/// App libs
import App from './App.vue'
import router from './App.Router'

/// ext libs
import '../node_modules/nprogress/nprogress.css'

Vue.use(VueResource);
Vue.use(router);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
