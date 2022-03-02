import Vue from 'vue'
import DefaultLayout from '@/layouts/default-layout.vue'
import BlankLayout from '@/layouts/blank-layout.vue'
import FrameworkEditLayout from '@/layouts/framework-edit-layout.vue'
import LoginLayout from '@/layouts/login-layout.vue'
import LoginHeader from '@/layouts/components/login-header.vue'

Vue.component('DefaultLayout', DefaultLayout)
Vue.component('BlankLayout', BlankLayout)
Vue.component('FrameworkEditLayout', FrameworkEditLayout)
Vue.component('LoginHeader', LoginHeader)
Vue.component('LoginLayout', LoginLayout)
