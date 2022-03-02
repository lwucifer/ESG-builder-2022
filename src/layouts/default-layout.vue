<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultDrawer from '@/layouts/components/default-drawer.vue'
import DefaultNavBar from '@/layouts/components/default-navbar.vue'
import GlobalService from '@/modules/framework-builder/services/global.service'

@Component({ components: { DefaultDrawer, DefaultNavBar } })
export default class DefaultLayout extends Vue {
  isGlobalParamCompleted = false
  async created() {
    try {
      const status = await GlobalService.isUploadedData()
      this.isGlobalParamCompleted = status.data
    } catch (error) {
      this.isGlobalParamCompleted = false
    }
  }

  get getIsGlobalParamCompleted() {
    return this.isGlobalParamCompleted
  }

  async uploadedFile() {
    try {
      const status = await GlobalService.isUploadedData()
      this.isGlobalParamCompleted = status.data
    } catch (error) {
      this.isGlobalParamCompleted = false
    }
  }
}
</script>

<template>
  <div>
    <default-nav-bar
      :isGlobalParameterCompleted="getIsGlobalParamCompleted"
    ></default-nav-bar>
    <default-drawer></default-drawer>
    <v-main class="default-layout__main">
      <v-flex xs12>
        <router-view
          :isGlobalParameterCompleted="isGlobalParamCompleted"
          @uploadedFile="uploadedFile"
        />
      </v-flex>
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.default-layout__main {
  background-color: #f3f3f8;
}
</style>
