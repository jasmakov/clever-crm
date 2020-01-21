import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import './registerServiceWorker'
import VModal from 'vue-js-modal'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDerective from '@/directives/tooltip.directive'
import 'materialize-css/dist/js/materialize.min'
import VueSimpleAlert from 'vue-simple-alert'
import EvaIcons from 'vue-eva-icons'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(VModal)
Vue.use(VueSimpleAlert)
Vue.use(EvaIcons)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDerective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

firebase.initializeApp({
  apiKey: 'AIzaSyAptZlmNERHpjoc3q0eNXFglvmYe0fefkM',
  authDomain: 'vue-crm-5b5e4.firebaseapp.com',
  databaseURL: 'https://vue-crm-5b5e4.firebaseio.com',
  projectId: 'vue-crm-5b5e4',
  storageBucket: 'vue-crm-5b5e4.appspot.com',
  messagingSenderId: '19273978823',
  appId: '1:19273978823:web:5f3f0adedf6ddfe628bfe2',
  measurementId: 'G-P8P7LN1TEN'
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
