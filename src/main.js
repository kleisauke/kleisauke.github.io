import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTimeago from 'vue-timeago'
import i18n from './i18n'

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: process.env.VUE_APP_I18N_LOCALE || 'nl',
  locales: {
    'nl': require('date-fns/locale/nl'),
    'en': require('date-fns/locale/en'),
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')
