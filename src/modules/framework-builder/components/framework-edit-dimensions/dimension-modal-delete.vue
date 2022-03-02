<template>
  <div class="modal" v-if="visible">
    <div class="dimension-modal-delete">
      <p>Are you sure you want to delete this Dimension?</p>
      <div class="actions">
        <v-btn small color="light" @click="close" class="mr-4">Cancel</v-btn>
        <v-btn small color="light" @click="ok">Confirm</v-btn>
      </div>
    </div>
    <div class="modal-overlay" v-if="visible" @click="close"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class DimensionModalDelete extends Vue {
  @Prop() visible = false

  close() {
    this.$emit('close')
  }

  ok() {
    this.$emit('ok')
  }
}
</script>

<style lang="scss" scoped>
.dimension-modal-delete {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 99;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(202, 202, 202, 0.5),
    0px 1px 4px rgba(218, 218, 224, 0.4);
  font-weight: 500;
  width: 300px;
  .actions {
    text-align: right;
  }
}
.modal-overlay {
  position: fixed;
  z-index: 90;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
