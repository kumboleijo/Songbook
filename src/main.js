// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import EventHub from 'vue-event-hub'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(EventHub)

Vue.config.productionTip = false

Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

if (BANDNAME != '') document.title = BANDNAME

// register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(function(registration) {
      // registration worked
      console.log('Registration succeeded.')

      // force the app to unregister service worker and reload
      document.getElementById('reload').onclick = function() {
        navigator.serviceWorker
          .getRegistrations()
          .then(function(registrations) {
            for (let registration of registrations) {
              registration.unregister()
            }
            location.reload()
          })
          .catch(function(err) {
            console.log('Service Worker unregistration failed: ', err)
          })
      }
    })
    .catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error)
    })
}
