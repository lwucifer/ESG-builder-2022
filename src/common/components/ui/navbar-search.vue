<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

//*===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶===🔶Secondary

//*===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷===🔷Primary

@Component({ components: {} })
export default class NavbarSearch extends Vue {
  //*===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧===💧Vuex
  //*===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜Props
  //*===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎===🍎Data
  query = ''
  //*===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏===🍏Computed
  //*===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊===🌊Methods
}
</script>

<template>
  <div class="navbar-search">
    <v-text-field
      v-model="query"
      label="Search framework"
      class="navbar-search"
      solo
      ref="textField"
      maxlength="255"
      height="40px"
      prepend-inner-icon="mdi-magnify"
    />
  </div>
</template>

<style lang="scss">
.navbar-search {
  width: 335px;
  height: 40px;
  display: flex;

  &.v-input {
    .v-text-field__details {
      display: none;
    }

    .v-icon.v-icon {
      font-size: 24px;
    }

    .v-input__slot {
      margin: 0 !important;
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      padding-left: 14px !important;
      .theme--light.v-label {
        margin-left: 8px !important;
        font-family: Mukta !important;
        font-style: normal !important;
        font-weight: 500 !important;
        font-size: 12px !important;
        line-height: 16px !important;
      }
    }

    i {
      font-size: 1.8em;
      color: #aeaeb2;
      transition: color 0.3s ease-in-out;
    }
  }

  & input {
    color: gray !important;
    margin-left: 8px;
  }

  &.active i {
    color: $color-accent !important;
  }
}

.theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  min-height: 40px !important;
  background: white !important;
  border: 1px solid #dfdfef;
  border-radius: 4px;
}
</style>
