import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import charts from '@/utils/charts.js';
import VueResource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(charts)
Vue.use(VueResource)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
