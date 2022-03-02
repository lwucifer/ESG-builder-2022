<template>
  <div class="dimension-actions">
    <v-btn large color="light" @click="newCard">
      <v-icon size="16" class="mr-2">mdi-plus</v-icon>
      New Dimension
    </v-btn>
    <v-btn
      large
      class="ml-auto mr-4"
      color="light"
      @click="save"
      :disabled="!disabled"
    >
      Save
    </v-btn>
    <v-btn large color="primary" @click="next" :disabled="!disabled">
      Next
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({})
export default class DimensionActions extends Vue {
  @Prop({ default: false }) disabled!: boolean

  newCard() {
    this.$emit('add')
  }
  save() {
    this.$emit('save')
  }
  next() {
    this.$emit('next')
  }
}
</script>

<style lang="scss" scoped>
.dimension-actions {
  padding: 24px 40px;
  border-top: 1px solid #dfdfef;
  display: flex;
  width: 100%;
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: #fff;
  .v-btn {
    min-width: 120px;
    height: 40px;
  }
}
</style>
