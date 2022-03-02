import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#2B61F5',
        secondary: '#6E2A6E',
        accent: '#82B1FF',
        error: '#E11900',
        info: '#0246B1',
        success: '#01AA30',
        warning: '#B65700'
      }
    }
  }
})
