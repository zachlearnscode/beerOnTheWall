import Vue from 'vue'
import App from './App.vue'
import Transitions from 'vue2-transitions';

Vue.use(Transitions);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
