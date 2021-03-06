import Vue from 'vue'
import App from './App.vue'
import Transitions from 'vue2-transitions';
import vuetify from './plugins/vuetify';
import AnimateCSS from 'animate.css';

Vue.use(AnimateCSS); 

Vue.use(Transitions);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
