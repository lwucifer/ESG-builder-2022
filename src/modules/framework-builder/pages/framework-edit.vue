<template>
  <v-app>
    <div class="layout-container-base">
      <v-main>
        <router-view />
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component({ components: {} })
export default class FrameworkEdit extends Vue {}
</script>
