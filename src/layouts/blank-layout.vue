<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class BlankLayout extends Vue {}
</script>

<template>
  <v-main class="blank-layout__main">
    <v-flex xs12>
      <router-view />
    </v-flex>
  </v-main>
</template>

<style lang="scss" scoped>
.blank-layout__main {
  background-color: #f3f3f8;
}
</style>
