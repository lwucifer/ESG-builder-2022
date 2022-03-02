import Vue from 'vue'
import router, { Routes } from './router'
import App from './App.vue'
import store from './store'
import './plugins/layout'
import vuetify from './plugins/vuetify'
import { EventBus } from './plugins/event-bus'

Vue.config.productionTip = false
router.beforeEach(async (to, from, next) => {
  //When go to signin page, if already loggedin, navigate to home
  if (to.name === Routes.login.name) {
    const isLoggedIn = store?.getters?.isLoggedIn
    if (isLoggedIn) {
      router.push(Routes.home)
      return
    } else {
      next()
      console.log('isNotLoggedIn')
    }
  }

  if (to?.meta?.isAuth === true) {
    //when navigate to screen that require authentication, if have not logged in, navigate to login screen
    const isLoggedIn = store?.getters?.isLoggedIn
    if (!isLoggedIn) router.push(Routes.login)
    else next()
  } else next()

  next()
})

type SnackConfig = {
  top?: boolean
  right?: boolean
  width?: number
}

Vue.prototype.$showSnack = (
  text: string,
  isError: boolean,
  icon?: string,
  config?: SnackConfig
) => {
  const snack = { text, isError, icon, config }
  EventBus.$emit('ShowToastBase', snack)
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

require('@/sass/index.scss')
