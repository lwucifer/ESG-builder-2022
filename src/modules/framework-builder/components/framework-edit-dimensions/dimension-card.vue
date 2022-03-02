<template>
  <v-card
    class="section-card framework-dimension-card"
    :style="{ background: cardColor ? cardColor : '#F3F3F8' }"
  >
    <v-progress-linear
      :color="progressColor ? progressColor : '#2C2C2E'"
      :background-color="progressColor ? progressColor : '#2C2C2E'"
      :value="100"
    />
    <div class="content">
      <div class="card-title">
        <component
          v-if="item.icon"
          :is="customizeIcons[item.icon]"
          :color="textColor ? textColor : '#2C2C2E'"
          size="24"
          class="icon mr-2"
        />
        <span :style="{ color: textColor ? textColor : '#2C2C2E' }">
          {{ !item.name && item.new ? 'New Dimension' : item.name }}
        </span>
      </div>
      <div class="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              class="required"
              label="Dimension name"
              outlined
              required
              clearable
              dense
              v-model="item.name"
              :rules="getNameRules('Dimension name')"
              maxlength="255"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              class="required"
              label="Dimension code"
              outlined
              required
              clearable
              dense
              v-model="item.code"
              :rules="getNameRules('Dimension code')"
              maxlength="255"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="icons"
              :item-text="'text'"
              :item-value="'icon'"
              clearable
              outlined
              dense
              v-model="item.icon"
              label="Icon"
              @input="changeIcon"
              class="select-icon"
            >
              <template v-slot:item="{ item }">
                <div class="select-icon-item">
                  <component
                    v-if="item.icon"
                    :is="customizeIcons[item.icon]"
                    color="#0246B1"
                    size="24"
                    class="icon"
                  />
                  <span class="text">{{ item.text }}</span>
                </div>
              </template>
            </v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              :items="colors"
              :item-text="'text'"
              :item-value="'text'"
              clearable
              outlined
              dense
              v-model="item.color"
              label="Color scheme"
              @input="changeColor"
              class="select-color"
            >
              <template v-slot:item="{ item }">
                <div
                  class="select-color-item"
                  :style="{
                    color: item.color,
                    background: item.background
                  }"
                >
                  <div>
                    <span
                      class="icon"
                      :style="{ background: item.color }"
                    ></span>
                    <span class="text" :style="{ color: item.color }">
                      {{ item.text }}
                    </span>
                  </div>
                </div>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </div>
      <div class="actions">
        <v-btn small icon>
          <img src="@/assets/icons/two-arrows.svg" />
        </v-btn>
        <v-btn small icon @click="deleteCard">
          <img src="@/assets/icons/close.svg" />
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { Dimension, Themes } from '@/types/common'
import { themeColors, themeIcons, colorList, iconList } from '@/static/themes'

@Component({})
export default class DimensionPresetCard extends Vue {
  @Prop() item?: Dimension

  firtLoad = true
  progressColor = ''
  cardColor = ''
  textColor = ''

  get icons() {
    return iconList
  }

  get colors() {
    return colorList
  }

  get customizeIcons() {
    return themeIcons
  }

  get themes(): Themes {
    return themeColors
  }
  @Watch('item', { deep: true, immediate: true })
  updateItem(_new: Dimension): void {
    this.progressColor = this.themes[_new?.color as string]?.progress
    this.cardColor = this.themes[_new?.color as string]?.card
    this.textColor = this.themes[_new?.color as string]?.text
  }

  deleteCard() {
    this.$emit('delete')
  }

  changeColor(e: string) {
    this.progressColor = e == null ? '' : this.themes[e]?.progress
    this.textColor = e == null ? '' : this.themes[e]?.text
    this.cardColor = e == null ? '' : this.themes[e]?.card
  }

  changeIcon(e: string) {
    console.log('newItem', this.item, e)
  }

  getNameRules(fieldName: string, requiredOnly?: boolean) {
    if (requiredOnly) {
      return [
        (v: string) => !!v.replace(/\s/g, '') || `${fieldName} is required`
      ]
    }

    return [
      (v: string) => !!v.replace(/\s/g, '') || `${fieldName} is required`,
      (v: string) =>
        (v.length <= 255 && v.length >= 2) ||
        `${fieldName} needs to be between 2-255 characters`
    ]
  }
}
</script>

<style lang="scss" scoped>
.v-select-list {
  padding: 0;
}
</style>

<style lang="scss">
.v-progress-linear__background {
  background-color: rgb(44, 44, 46);
  border-color: rgb(44, 44, 46);
}
.v-progress-linear {
  color: rgba(0, 0, 0, 0.87);
}
.required label::after {
  content: '*';
  color: #e11900;
  margin-left: 2px;
}
.select-icon-item {
  display: flex;
  align-items: center;
  margin: 0 -16px;
  width: calc(100% + 32px);
  height: 40px;
  border-top: 1px solid #dfdfef;
  padding: 0 16px;
  background-color: #fff;
  .text {
    display: inline-block;
    margin-left: auto;
    font-size: 13px;
    color: #87879d;
  }
}
.select-color-item {
  display: flex;
  align-items: center;
  margin: 0 -16px;
  width: calc(100% + 32px);
  height: 40px;
  > div {
    border-top: 1px solid #dfdfef;
    padding: 0 16px;
    display: flex;
    align-items: center;
    width: 100%;
    background-color: #fff;
    height: 40px;
  }
  &:hover {
    > div {
      background-color: transparent;
    }
    .text {
      filter: none;
      -webkit-filter: none;
    }
  }
  .icon {
    height: 14px;
    width: 14px;
    display: inline-block;
    border-radius: 50%;
    overflow: hidden;
  }
  .text {
    display: inline-block;
    margin-left: auto;
    filter: brightness(0) invert(0.35);
    -webkit-filter: brightness(0) invert(0.5);
    font-size: 13px;
  }
}
.framework-edit-dimension .framework-dimension-card {
  margin-bottom: 20px;
  position: relative;
  border: 1px solid #dfdfef;
  box-shadow: none !important;
  border-radius: 0px 0px 4px 4px;
  .content {
    padding: 15px;
  }
  .actions {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 12px;
    background-color: #fff;
    border-radius: 16px 0 0 16px;
    padding: 6px 8px;
    .v-btn {
      background-color: #fff;
      box-shadow: none;
      border: 1px solid #c4c4c4;
      height: 20px;
      width: 20px;
      + .v-btn {
        margin-left: 10px;
      }
    }
  }
  .card-title {
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 500;
    .v-icon {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
  }
  .v-input {
    .v-label {
      color: #5d5d71;
    }
    &.v-text-field input,
    .v-select__selection {
      font-size: 12px;
      color: #2c2c2e;
    }
    .v-icon {
      font-size: 20px;
    }
  }
  .v-input .v-input__slot {
    background-color: #fff;
  }
  .v-text-field--outlined fieldset {
    border: 1px solid #dfdfef;
  }
}
</style>
