import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'
import mixin from './plugins/mixin'
import './registerServiceWorker'

Vue.config.productionTip = false
Vue.mixin(mixin);
Vue.use(require('vue-shortkey'));

Vue.directive('blur', {
  inserted: function (el) {
    el.onfocus = (ev) => ev.target.blur()
  }
});

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
