<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import NavbarSearch from '@/common/components/ui/navbar-search.vue'
import UserAvatar from '@/common/components/ui/user-avatar.vue'
//*===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶Secondary

//*===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷Primary

@Component({ components: { NavbarSearch, UserAvatar } })
export default class DefaultNavBar extends Vue {
  //*===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧Vuex
  //*===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜Props
  @Prop() isGlobalParameterCompleted = false
  //*===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎Data
  windowTop = 0
  searchBarIgnoreList = ['GlobalParameter']
  createNewIgnoreList = ['GlobalParameter']
  show = false
  //*===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏Computed
  mounted(): void {
    window.addEventListener('scroll', this.onScroll)
  }

  beforeDestroy(): void {
    window.removeEventListener('scroll', this.onScroll)
  }

  //*===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊Methods
  onScroll(): void {
    this.windowTop = window.top.scrollY
  }

  showNotification(): void {
    console.log('showNotification')
  }

  isInSearchBarIgnoreList() {
    return this.searchBarIgnoreList.includes(this.$route.name as string)
  }

  isInCreateNewFrameworkIgnoreList() {
    return this.createNewIgnoreList.includes(this.$route.name as string)
  }
}
</script>

<template>
  <v-app-bar color="#ffffff" fixed app height="74" class="default-navbar px-1">
    <div class="default-navbar__textfields" v-if="!isInSearchBarIgnoreList()">
      <navbar-search />
    </div>
    <v-spacer />
    <template>
      <div class="d-flex justify-space-between align-center">
        <v-tooltip
          bottom
          v-model="show"
          :disabled="isGlobalParameterCompleted"
          content-class="default-navbar__new-frame-work__tooltip"
          v-if="!isInCreateNewFrameworkIgnoreList()"
        >
          <template v-slot:activator="{ on, attrs }">
            <div @mouseover="show = true" @mouseleave="show = false">
              <v-btn
                depressed
                color="primary"
                v-bind="attrs"
                v-on="on"
                width="126"
                height="32"
                style="font-size: 12px"
                to="framework-edit/settings"
                :disabled="!isGlobalParameterCompleted"
              >
                <v-icon small class="mr-1" size="10">mdi-plus</v-icon>
                New Framework
              </v-btn>
            </div>
          </template>
          <span>
            New frameworks can only be added after Global Parameters are
            configured
          </span>
        </v-tooltip>
        <v-btn
          class="mr-5 ml-5"
          title="Notifications"
          icon
          @click="showNotification"
          height="40"
          width="40"
        >
          <img src="@/assets/svg/notification.svg" />
          <div class="notification-alert"></div>
        </v-btn>
        <user-avatar></user-avatar>
      </div>
    </template>
  </v-app-bar>
</template>

<style lang="scss" scoped>
.default-navbar {
  min-width: 300px;
  max-height: $navbar-top-height;
  box-shadow: unset !important;
  border-bottom: solid 1px #dfdfef !important;

  transition: width 200ms ease 0s;

  &__textfields {
    display: flex;
    flex-grow: 1;
  }

  .v-btn {
    font-family: Mukta !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .burger:focus::before {
    opacity: 0 !important;
  }

  .v-input__append-inner {
    display: none !important;
  }

  .v-toolbar__content {
    border: 2px solid white;
    transition: border-color 0.3s ease-in-out;

    display: flex;
    width: 100%;
    height: $navbar-top-height;
    flex-direction: row;
  }

  &.active {
    .v-toolbar__content {
      border-bottom: 2px solid $color-accent;
    }
  }
}

.user-name {
  margin-right: 1.1rem;
  padding-left: 2rem;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 1.1em;

  display: inline-flex;
  align-items: center;

  .user-avatar {
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.7) !important;
    font-size: 1.5em;
  }
}

.active-lang {
  background: #dddddd;
  color: white;
}

.separator {
  border-right: 2px solid rgba(0, 0, 0, 0.1);
  min-height: 40px;
}

.notification-alert {
  position: absolute;
  right: 3px;
  bottom: 4px;
  background: red;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.default-navbar__new-frame-work__tooltip {
  width: 288px !important;
  background-color: #5d5d71 !important;
}
</style>
