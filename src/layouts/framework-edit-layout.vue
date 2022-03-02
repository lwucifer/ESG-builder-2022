<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FrameworkEditDrawer from '@/layouts/components/framework-edit-drawer/index.vue'
import FrameworkEditNavbar from '@/layouts/components/framework-edit-navbar/index.vue'

@Component({ components: { FrameworkEditDrawer, FrameworkEditNavbar } })
export default class FrameworkEditLayout extends Vue {
  frameworkName(payload: string) {
    this.frameworkTitle = payload
  }

  getFrameworkCode(payload: string) {
    this.frameworkCode = payload
  }

  logoUrl(payload: string) {
    this.iconUrl = payload
  }

  frameworkTitle = ''
  frameworkCode = ''
  iconUrl = ''
}
</script>

<template>
  <div>
    <framework-edit-drawer></framework-edit-drawer>
    <framework-edit-navbar
      :framework-title="frameworkTitle"
      :framework-code="frameworkCode"
      :icon-url="iconUrl"
    ></framework-edit-navbar>
    <v-main class="framework-edit-layout__main">
      <router-view
        @frameworkName="frameworkName"
        @frameworkCode="getFrameworkCode"
        @logoUrl="logoUrl"
      />
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.framework-edit-layout__main {
  background-color: #f3f3f8;
  overflow-y: scroll;
}
</style>
