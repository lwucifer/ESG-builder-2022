<template>
  <v-app>
    <div>
      <component :is="layout" />
      <v-snackbar
        v-model="isShowSnack"
        elevation="1"
        timeout="5000"
        :color="isShowSnackError ? '#fff1ef' : '#e8fce8'"
        :content-class="
          isShowSnackError
            ? 'main-snackbar-error d-flex justify-space-between align-center'
            : 'main-snackbar-succeed d-flex justify-space-between align-center'
        "
      >
        {{ snackMessage }}
        <v-btn
          depressed
          outlined
          @click="isShowSnack = false"
          :class="
            isShowSnackError
              ? 'main-snackbar__close-btn-error'
              : 'main-snackbar__close-btn-succeed'
          "
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { EventBus } from '@/plugins/event-bus'

type Toast = {
  text: string
  isError: boolean
}

@Component({})
export default class App extends Vue {
  snackMessage = ''
  isShowSnack = false
  isShowSnackError = false
  get layout(): string {
    if (this.$route.meta && this.$route.meta.layout) {
      return this.$route.meta.layout + 'Layout'
    }
    return 'DefaultLayout'
  }

  mounted() {
    EventBus.$on('ShowToastBase', (data: Toast) => {
      const { text, isError } = data
      this.snackMessage = text
      this.isShowSnackError = isError
      this.isShowSnack = true
    })
  }

  unmounted() {
    EventBus.$destroy()
  }
}
</script>
<style lang="scss">
.main-snackbar-succeed {
  min-width: 675px !important;
  color: #016a1f !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
}

.main-snackbar-error {
  min-width: 675px !important;
  color: #e11900 !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  line-height: 20px !important;
}

.main-snackbar__close-btn-succeed {
  width: 43px !important;
  height: 24px !important;
  background-color: #fff !important;
  border: 1px solid #6df392 !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  color: #016a1f !important;
}

.main-snackbar__close-btn-error {
  width: 43px !important;
  height: 24px !important;
  background-color: #fff !important;
  border: 1px solid #f8b5ac !important;
  font-style: normal !important;
  font-weight: 400 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  color: #e11900 !important;
}
</style>
