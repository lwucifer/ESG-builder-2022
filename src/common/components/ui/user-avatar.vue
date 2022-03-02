<template>
  <div>
    <v-menu bottom :offset-y="true">
      <template v-slot:activator="{ on, attrs }">
        <div class="pointer-initital" v-bind="attrs" v-on="on">
          <v-avatar :color="color" :size="size">
            <img v-if="thumbnail" :src="thumbnail" alt="Profile Picture" />
            <span v-else :style="{ fontSize: 14 + 'px', color: textColor }">
              {{ initial }}
            </span>
          </v-avatar>
        </div>
      </template>

      <v-list class="user-avatar" dense>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, index) in menus"
            :key="index"
            @click="item.click"
          >
            {{ item.text }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Routes } from '@/router'
//*===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷Primary
export interface NavMenuItem {
  text: string
  click: () => void
}
@Component({})
export default class UserAvatar extends Vue {
  //*===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧Vuex
  //*===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏Computed

  get menus(): NavMenuItem[] {
    return [
      {
        text: 'Setting',
        click: this.onSetting
      },
      {
        text: 'Logout',
        click: this.onLogout
      }
    ]
  }

  get thumbnail(): string {
    return ''
    // return this.profile?.thumbnail
  }

  get containerStyle(): { border: string } {
    return {
      border: `solid ${2}px ${'white'}`
    }
  }

  get initial(): string {
    return 'NH'
    // if (!this.profile) {
    //   return ''
    // }

    // const { name = '', surname = '' } = this.profile
    // if (!name && !surname)
    //   return (
    //     this.profile.email && this.profile.email.substring(0, 2).toUpperCase()
    //   )
    // return `${name && name.substring(0, 1)}${
    //   surname && surname.substring(0, 1)
    // }`.toUpperCase()
  }

  get textColor(): string {
    return '#B65700'
  }

  get color(): string {
    return '#FFF2D7'
  }

  get size(): number {
    return 40
  }

  onSetting(): void {
    this.$router.push({ name: Routes.accountSettings.name })
  }

  onLogout(): void {
    this.$store.dispatch('logout')
    this.$router.push({ name: Routes.login.name })
  }
}
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
.pointer-initital {
  cursor: pointer;
}
.pointer-cursor {
  cursor: pointer;
}
.user-avatar {
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    font-size: 14px;
    text-decoration: none;
    color: var(--v-anchor-base) !important;
  }
}
</style>
