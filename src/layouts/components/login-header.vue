<template>
  <v-app-bar
    color="#fff"
    height="100"
    app
    dark
    prominent
    shrink-on-scroll
    class="purple-header-bar"
  >
    <div class="esg-container d-flex align-center fluid purple-theme-header">
      <router-link
        :to="Routes.publishFramework.name"
        class="d-flex align-center"
      >
        <img
          width="160"
          :src="require('@/assets/svg/new-logo.svg')"
          alt=""
          class="purple-header-logo"
        />
      </router-link>
      <div class="purple-header-menu"></div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { Routes } from '@/router'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class LoginHeader extends Vue {
  Routes = Routes

  goHome(): void {
    this.$emit('change')
  }
}
</script>

<style lang="scss" scoped>
* {
  font-family: Roboto;
}
.v-app-bar {
  box-shadow: none !important;
}
::v-deep .v-toolbar__content {
  padding: 0 !important;
}
.v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
  opacity: 0;
}
.purple-header-bar {
  height: fit-content !important;
}
.purple-theme-header {
  padding: 16px 4.2vw 10px;
  margin: 0 auto;
  justify-content: space-evenly;
}
@media screen and (min-width: 1440px) {
  .purple-theme-header {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}
.purple-header-menu {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  min-width: 674px;
  width: 919.4px;
}
.purple-header-logo {
  padding: 20px 0;
}
</style>
<style lang="scss">
.action-menu-item {
  padding: 11px 20px !important;
  height: fit-content !important;
  min-width: unset !important;
  border-radius: 6px !important;
}
.action-menu-item:hover {
  transform: scale(1.025);
}

.action-menu-item:active {
  box-shadow: none !important;
}

.action-menu-item:last-child {
  margin-left: 10px;
  &:hover {
    background-color: rgba(21, 10, 132, 0.38) !important;
  }
}
.action-menu-item .v-btn__content {
  font-size: 12px;
  line-height: 1.4em;
  font-weight: 500;
  font-family: Gopher, sans-serif !important;
}
.only-title {
  height: 100px;
  font-size: 20px;
  font-weight: 700;
  color: #150a84;
  font-family: Gopher, sans-serif !important;
}
</style>
