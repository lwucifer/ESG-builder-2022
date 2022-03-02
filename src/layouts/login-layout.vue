<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({ components: {} })
export default class LoginLayout extends Vue {}
</script>

<template>
  <div class="edit-layout purple-theme fill-height">
    <login-header />
    <v-main class="content-scrollable mobile-no-padding">
      <v-flex fill-height>
        <router-view />
      </v-flex>
    </v-main>
  </div>
</template>

<style lang="scss" scoped>
.purple-theme {
  background-color: rgba(70, 98, 246, 0.1);
}
</style>
