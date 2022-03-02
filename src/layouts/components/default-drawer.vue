<script lang="ts">
import { Routes } from '@/router'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import Logout from '@/common/icons/Logout.vue'
import User from '@/common/icons/User.vue'

export interface NavbarItem {
  icon: string
  text: string
  name: string
  hidden: boolean
  onClick: () => void
}

@Component({
  components: { Logout, User }
})
export default class DefaultDrawer extends Vue {
  //*===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎Data
  isOpen = false
  drawerStatus = false
  //*===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜Props
  @Prop({ default: true })
  isExpanded = true

  @Watch('drawer', { deep: true, immediate: true })
  updateDrawerStatus(newVal: boolean): void {
    this.drawerStatus = newVal
  }

  mounted(): void {
    console.log('mounted')
  }

  get isDrawerOpen(): boolean {
    return true
  }

  goHome(): void {
    this.$router.push({ name: Routes.publishFramework.name })
  }

  get manageFrameworkRoute(): string {
    return this.$route.name === Routes.globalParameter.name
      ? Routes.globalParameter.name
      : Routes.publishFramework.name
  }

  get items(): Partial<NavbarItem>[] {
    return [
      {
        text: 'Manage Framework',
        name: this.manageFrameworkRoute,
        icon: 'mdi-widgets-outline',
        onClick: () => {
          this.$router.push({ name: Routes.publishFramework.name })
        }
      }
    ]
  }

  get appendItemsSecond(): Partial<NavbarItem>[] {
    return [
      {
        icon: 'User',
        text: 'Account Settings',
        name: 'AccountSettings'
      },
      {
        icon: 'Logout',
        text: 'Logout',
        name: 'Login',
        onClick: this.logout
      }
    ]
  }

  get isManageFrameworkActive(): boolean {
    const activeRoutes = [Routes.globalParameter]
    return activeRoutes.findIndex((r) => r.name === this.$route.name) >= 0
  }

  get isManageJourneyActive(): boolean {
    const activeRoutes = [Routes.manageJourney]
    return activeRoutes.findIndex((r) => r.name === this.$route.name) >= 0
  }

  isActive(name: string): boolean {
    console.log('isActive', this.$route.name, name)
    return this.$route.name === name
  }
  logout(): void {
    this.$store.dispatch('logout')
    this.$router.push({ name: Routes.login.name })
  }
}
</script>

<template>
  <v-navigation-drawer
    v-model="isExpanded"
    absolute
    persistent
    fixed
    app
    width="237"
    class="d-flex default-drawer__navigation-drawer"
  >
    <div class="header-logo" @click="goHome">
      <img width="181" src="@/assets/svg/new-logo.svg" />
    </div>
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.text"
        :to="{ name: item.name }"
        height="35px"
        exact
        @mousedown="() => item.onClick && item.onClick()"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template v-slot:append>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="item in appendItemsSecond"
          :key="item.text"
          :to="{ name: item.name }"
          height="35px"
          exact
          @mousedown="() => item.onClick && item.onClick()"
        >
          <v-list-item-icon>
            <component
              :is="item.icon"
              :color="isActive(item.name) ? '#2B61F5' : '#87879D'"
            />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.default-drawer__navigation-drawer {
  background-color: white !important;
  .header-logo {
    width: $drawer-width;
    padding-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .img {
      object-fit: cover;
      margin-top: 32px;
    }
  }
  .v-list {
    margin-top: 32px;
    margin-left: 22px;
    margin-right: 19px;
    .v-list-item {
      height: 40px;
      min-height: 40px;
      width: 195px;
      background-color: white !important;
      color: $text-3 !important;
      font-family: Mukta;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      margin-top: 4px;
      border-radius: 4px;
      overflow: hidden;
      vertical-align: middle;
      align-content: center;
      padding: 0px 4px 0px 14px;
      margin-bottom: 16px;
      border-left: 3px solid white;
      .theme--dark.v-icon {
        color: $text-3 !important;
      }
    }
    .v-list-item--active {
      border-left: 2px solid $blue-3;
      background-color: #eff5ff !important;
      color: $blue-3 !important;
      .theme--dark.v-icon {
        color: $blue-3 !important;
      }
    }

    .v-list-item__icon {
      height: 24px !important;
      margin: 8px 8px 8px 0px !important;
      .v-icon.v-icon {
        font-size: 20px !important;
      }
    }
  }
}
</style>
