<template>
  <div class="framework-edit-dimension__right no-item">
    <div>
      <img src="@/assets/icons/dimension-cards.svg" class="mb-3" />
      <p class="title-select">Select dimension presets or</p>
      <v-btn large color="light" @click="newCard">
        <v-icon size="16" class="mr-2">mdi-plus</v-icon>
        Create new dimension
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class DimensionNoItem extends Vue {
  newCard() {
    this.$emit('add')
  }
}
</script>

<style lang="scss" scoped>
.framework-edit-dimension__right.no-item {
  > div {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    text-align: center;
  }
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
