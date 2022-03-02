import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import AuthService from '@/modules/authentication/services/auth.service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    token: ''
  },
  getters: {
    isLoggedIn(state) {
      if (state?.user && state?.token) {
        return true
      }
      return false
    },

    authToken(state) {
      return state.token
    }
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload
    },
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async login({ commit }, payload) {
      const response = await AuthService.login(payload)
      if (response.data) {
        const { token, admin } = response.data
        commit('SET_TOKEN', token)
        commit('SET_USER', admin)
      }
      return response
    },

    logout({ commit }) {
      commit('SET_USER', null)
      commit('SET_TOKEN', null)
    }
  },
  modules: {},
  plugins: [
    createPersistedState({
      key: 'framework-builder-admin',
      paths: ['token', 'user']
    })
  ]
})
