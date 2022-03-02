<template>
  <div
    class="dimension-presets-item"
    :style="{
      background: themes[item.color] ? themes[item.color].card : '#F3F3F8'
    }"
    v-if="!item.hide"
  >
    <component
      v-if="item.icon"
      :is="customizeIcons[item.icon]"
      :color="themes[item.color] ? themes[item.color].text : '#2C2C2E'"
      size="24"
      class="icon mr-2"
    />
    <span
      class="text"
      :style="{
        color: themes[item.color] ? themes[item.color].text : '#2C2C2E'
      }"
    >
      {{ item.name }}
    </span>
    <v-btn small @click="addCard" color="light">Add</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Dimension } from '@/types/common'
import { themeColors, themeIcons } from '@/static/themes'

@Component({})
export default class DimensionPresetCard extends Vue {
  @Prop() item?: Dimension

  get themes() {
    return themeColors
  }
  get customizeIcons() {
    return themeIcons
  }

  addCard() {
    this.$emit('add')
  }
}
</script>

<style lang="scss" scoped>
.dimension-presets-item {
  display: flex;
  align-items: center;
  padding: 9px 9px 9px 16px;
  border-radius: 4px;
  border: 1px solid #dfdfef;
  margin-bottom: 16px;
  .text {
    font-size: 16px;
    font-weight: 500;
  }
  .v-icon {
    margin-right: 9px;
    font-size: 18px;
  }
  .v-btn {
    margin-left: auto;
  }
}
</style>
