<template>
  <v-navigation-drawer
    absolute
    persistent
    fixed
    app
    width="237"
    class="framework-edit-drawer__container"
  >
    <div class="header-logo mb-6" @click="goHome">
      <img width="181" src="@/assets/svg/new-logo.svg" />
    </div>
    <v-stepper
      vertical
      flat
      tile
      class="framework-edit-drawer__stepper"
      :value="currentStep"
    >
      <template v-for="(item, index) in menuItems">
        <v-stepper-step
          :step="index + 1"
          :complete="index < currentStep"
          :editable="index + 1 === currentStep"
          edit-icon="mdi-radiobox-blank"
          :key="index + 'menuItems'"
        >
          <router-link :to="item.path" v-if="index < currentStep">
            {{ item.title }}
          </router-link>
          <div v-else>{{ item.title }}</div>
        </v-stepper-step>
        <v-stepper-content
          :step="index + 1"
          :key="index + 'menuContent'"
          v-if="item.children"
        >
          <v-stepper
            vertical
            class="framework-edit-drawer__sub-stepper"
            :value="currentSubStep"
          >
            <template v-for="(subItem, subIndex) in item.children">
              <v-stepper-step
                :complete="subIndex < currentSubStep"
                :editable="subIndex + 1 === currentSubStep"
                edit-icon="mdi-play"
                :key="subIndex + 'childrenItems'"
                :step="subIndex + 1"
              >
                <router-link
                  :to="subItem.route.path"
                  v-if="subIndex < currentSubStep"
                >
                  {{ subItem.title }}
                </router-link>
                <div v-else>{{ subItem.title }}</div>
              </v-stepper-step>
            </template>
          </v-stepper>
        </v-stepper-content>
      </template>
    </v-stepper>
    <template v-slot:append>
      <v-divider></v-divider>
      <div class="framework-edit-drawer__append-action">
        <v-btn block text color="primary" @click="onExit">Exit</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { menuItems } from '@/layouts/components/framework-edit-drawer/menu-items'
import { Routes } from '@/router'
import { EventBus } from '@/plugins/event-bus'

export interface NavbarItem {
  icon: string
  text: string
  name: string
  hidden: boolean
  onClick: () => void
}

@Component({})
export default class FrameworkEditDrawer extends Vue {
  menuItems = menuItems()

  get currentSubStep() {
    if (!this.menuItems) return 1
    const parentStep = this.menuItems[this.currentStep - 1]
    if (!parentStep || !parentStep?.children) return 1
    const currentSubMenuIndex = parentStep.children?.findIndex(
      (c) => c.route?.name === this.$route.name
    )
    if (currentSubMenuIndex <= 0) return 1
    return currentSubMenuIndex + 1
  }

  get currentStep(): number {
    if (!this.menuItems) return 1
    const currentMenuIndex = this.menuItems.findIndex(
      (d) =>
        d.route?.name === this.$route.name ||
        d.children?.findIndex((c) => c.route?.name === this.$route.name) !== -1
    )
    if (currentMenuIndex <= 0) return 1
    return currentMenuIndex + 1
  }

  goHome(): void {
    this.$router.push({ name: Routes.publishFramework.name })
  }

  onExit(): void {
    EventBus.$emit('drawerExit')
  }
}
</script>
<style lang="scss">
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

// parent stepper
.framework-edit-drawer__stepper {
  .v-stepper--vertical {
    padding-bottom: 0 !important;
  }

  .v-stepper__content {
    margin: -17px -36px -16px 37px !important;
    padding: 16px 60px 16px 14px !important;
  }

  .v-stepper__label {
    text-shadow: none !important;
    a {
      text-decoration: none !important;
      color: #5d5d71 !important;
    }
  }

  .v-ripple__container {
    opacity: 0 !important;
  }

  //parent current step style
  a {
    text-decoration: none;
  }
  .v-stepper__step {
    padding-top: 12px !important;
    padding-bottom: 12px !important;

    white-space: nowrap;
  }
  .v-stepper__step--active {
    &:hover {
      background: unset !important;
    }

    .v-stepper__step__step {
      background-color: unset !important;
      .mdi-radiobox-blank {
        margin-left: 5px !important;
        text-indent: -1000px !important;
        background-color: white !important;
        min-width: 0 !important;
        width: 11.4px !important;
        height: 11.4px !important;
        border: 3px solid #2b61f5 !important;
        border-radius: 50% !important;
      }
    }
  }

  //parent inactive step style
  .v-stepper__step--inactive {
    .v-stepper__step__step {
      margin-left: 8px !important;
      text-indent: -1000px !important;
      background-color: white !important;
      min-width: 0 !important;
      width: 11.4px !important;
      height: 11.4px !important;
      border: 3px solid #c8c8d7 !important;
    }
    .v-stepper__label {
      padding-top: 1px !important;
      div {
        color: #5d5d71 !important;
      }
    }
  }

  //parent completed step style

  .v-stepper__step--complete {
    .v-stepper__step__step {
      background-color: unset !important;
      .mdi-check {
        padding-left: 6px !important;
        color: #58cb77 !important;
      }
    }
  }

  //child stepper
  .framework-edit-drawer__sub-stepper {
    .v-stepper__step {
      &:last-child {
        padding-bottom: 24px !important;
      }
    }

    .v-stepper__label {
      font-style: normal !important;
      font-weight: normal !important;
      font-size: 13px !important;
      line-height: 17px !important;
    }

    //child active step style
    .v-stepper__step--active {
      padding-top: 0 !important;
      padding-left: 0 !important;
      .v-stepper__step__step {
        background-color: white !important;
        margin-right: 0px !important;
        .mdi-play {
          color: #2b61f5 !important;
          font-size: 9px !important;
        }
      }

      .v-stepper__label {
        a {
          color: #2b61f5 !important;
        }
      }
    }

    //child inactive step style
    .v-stepper__step--inactive {
      padding-top: 0 !important;
      padding-left: 0 !important;
      padding-bottom: 18px !important;
      .v-stepper__step__step {
        margin-left: 8px !important;
        margin-right: 8px !important;
        text-indent: -1000px !important;
        background-color: white !important;
        min-width: 0 !important;
        width: 7.2px !important;
        height: 7.2px !important;
        border: 2px solid #c8c8d7 !important;
      }
      .v-stepper__label {
        div {
          color: #5d5d71 !important;
        }
      }
    }

    //child complete step style
    .v-stepper__step--complete {
      padding-top: 0 !important;
      padding-left: 0 !important;
      padding-bottom: 12px !important;
      .v-stepper__step__step {
        margin-right: 0px !important;
        background-color: white !important;
        .mdi-check {
          color: #58cb77 !important;
          padding-left: 0px !important;
          font-size: 9px !important;
        }
      }

      .v-stepper__label {
        padding-top: 0 !important;
      }
    }
  }
}
.framework-edit-drawer__container {
  .framework-edit-drawer__append-action {
    padding: 32px 45px;
  }
  .v-navigation-drawer__append .v-btn--text {
    background-color: #eff5ff !important;
  }
}
</style>
