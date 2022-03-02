<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class ConfirmDialog extends Vue {
  @Prop({ default: false, required: false })
  value!: boolean
  dialog = false

  cancel(): void {
    this.$emit('hide')
  }

  confirm(): void {
    this.$emit('hide')
  }
}
</script>

<template>
  <v-dialog v-model="value" max-width="354" :persistent="true">
    <v-card class="common-confirm-dialog">
      <div class="mb-2 d-flex mx-5 pt-5 common-confirm-dialog__wrapper">
        <div class="common-confirm-dialog__title" style="margin-right: 16px">
          Unpublish this framework?
        </div>
      </div>
      <v-card-text class="pa-0 mb-3 mx-5">
        <div class="fs-13 txt-text-2 content">
          This will remove the entry point and new reports can no longer be
          created with this framework. Ongoing or published reports will still
          be supported.
        </div>
      </v-card-text>
      <v-card-actions class="pa-0 d-flex justify-end mx-5 pb-4">
        <span class="btn-cancel" @click="cancel">Cancel</span>
        <v-btn outlined color="primary" class="btn-ok" @click="confirm">
          OK
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.common-confirm-dialog__wrapper {
  display: flex !important;
  justify-content: space-between !important;
}

.common-confirm-dialog {
  padding: 0 20px;
  &__title {
    display: flex !important;
    align-items: center !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    line-height: 20px !important;
  }
  &__btn {
    font-size: 14px !important;
    font-weight: 500 !important;
    padding-left: 12px !important;
    padding-right: 12px !important;
    height: 38px !important;
  }
  .btn-cancel {
    font-weight: 500;
    font-size: 12px;
    color: #2b61f5;
    margin-right: 15px;
    cursor: pointer;
  }
  .btn-ok {
    height: 32px;
    .v-btn__content {
      font-weight: 500;
      font-size: 12px;
      color: #2b61f5;
      margin-right: 15px;
    }
  }
  .content {
    font-size: 13px;
    color: #5d5d71;
  }
}
.headline {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &-showall {
    overflow: unset;
    text-overflow: clip;
    white-space: unset;
    word-break: break-word;
  }
}
.v-application .mx-5 {
  margin-right: 0px !important;
  margin-left: 0px !important;
}
</style>
