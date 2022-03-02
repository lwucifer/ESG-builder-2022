<template>
  <div class="new-file-upload">
    <p class="new-file-upload__title">{{ sectionName }}</p>
    <v-card
      class="py-8 px-15 d-flex align-center new-file-upload__container"
      height="120"
      elevation="0"
      :style="isUploaded ? 'background-color: #f9f9fb' : '#ffffff'"
    >
      <div
        class="d-flex justify-space-between align-center"
        style="width: 100%"
      >
        <div class="d-flex align-center">
          <div class="mr-6">
            <excel-icon v-if="isUploaded"></excel-icon>
            <empty-logo-icon v-else></empty-logo-icon>
          </div>
          <div>
            <div class="new-file-upload__file-name" v-if="!isUploaded">
              Download xlsx file to edit and upload
            </div>
            <div class="new-file-upload__file-name" v-if="isUploaded">
              {{
                fileName === 'File'
                  ? 'Download xlsx file to edit and upload'
                  : fileName
              }}
            </div>
            <div
              v-if="isUploading"
              class="
                new-file-upload__progress-bar__container
                d-flex
                align-center
              "
            >
              <span class="new-file-upload__progress-bar__status mr-1">
                Uploading
              </span>
              <v-progress-linear
                buffer-value
                rounded
                :value="progress"
                height="8"
                :class="
                  progress === 100
                    ? 'new-file-upload__progress-bar-finish'
                    : 'new-file-upload__progress-bar-undone'
                "
              ></v-progress-linear>
            </div>
            <div
              v-if="isUploadSucceed && !isUploading"
              class="new-file-upload__upload_succeed"
            >
              File uploaded successfully
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column justify-center" style="gap: 8px">
        <v-btn
          :class="
            isDisabled
              ? 'new-file-upload__btn-size-disabled'
              : 'new-file-upload__btn-size'
          "
          outlined
          depressed
          v-if="!hideUpload && sectionName.toLowerCase() !== 'dimension'"
          :disabled="isDisabled"
          @click="handleClickUploadFile()"
        >
          Upload
        </v-btn>
        <v-btn
          class="new-file-upload__btn-size"
          outlined
          depressed
          v-if="!hideDownload"
          @click="handleClickDownloadFile()"
        >
          Download
        </v-btn>
      </div>
      <input
        style="position: absolute; z-index: -1"
        ref="upload"
        type="file"
        accept=".xlsx, .xls"
        @change="onFileChange($event)"
      />
    </v-card>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import EmptyLogoIcon from '@/common/components/icons/empty-logo-icon.vue'
import ExcelIcon from '@/common/components/icons/excel-icon.vue'

@Component({ components: { EmptyLogoIcon, ExcelIcon } })
export default class NewFileUpload extends Vue {
  //*===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜===👜Props
  @Prop({ default: 'Uom' }) sectionName!: string
  @Prop({ default: 'File' }) fileName!: string
  @Prop({ default: false }) isUploading!: boolean
  @Prop({ default: false }) isUploaded!: boolean
  @Prop({ default: 0 }) progress!: number
  @Prop({ default: false }) hideDownload!: boolean
  @Prop({ default: false }) hideUpload!: boolean
  @Prop({ default: false }) isUploadSucceed!: boolean

  $refs!: {
    upload: HTMLInputElement
  }

  get isDisabled() {
    if (this.isUploading) {
      return true
    }

    return false
  }

  handleClickUploadFile() {
    this.$refs.upload.click()
  }

  handleClickDownloadFile() {
    this.$emit('handleClickDownloadFile')
  }

  onFileChange(e: Event) {
    this.$emit('onFileChange', e)
  }
}
</script>

<style lang="scss">
.new-file-upload__title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #2c2c2e;
  margin-bottom: 10px;
}
.new-file-upload__container {
  border: 2px dashed #dfdfef !important;

  .new-file-upload__file-name {
    font-style: normal !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    line-height: 17px !important;
    color: #2c2c2e !important;
  }

  .new-file-upload__btn-size {
    width: 80px !important;
    height: 24px !important;
    background: #ffffff !important;
    border: 1px solid #d4e4fe !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: #2b61f5 !important;
  }

  .new-file-upload__btn-size-disabled {
    width: 80px !important;
    height: 24px !important;
    border: none !important;
    background: #dfdfef !important;
    font-style: normal !important;
    font-weight: 500 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: #87879d !important;
  }

  .new-file-upload__progress-bar__container {
    .new-file-upload__progress-bar__status {
      font-style: normal !important;
      font-weight: 400 !important;
      font-size: 12px !important;
      line-height: 16px !important;
      color: #87879d !important;
    }

    .new-file-upload__progress-bar-undone {
      border: 1px solid #d4e4fe !important;
      width: 128px !important;

      .v-progress-linear__determinate {
        height: 4px !important;
        left: 2px !important;
        border-top-left-radius: 8px !important;
        border-bottom-left-radius: 8px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
      }
    }

    .new-file-upload__progress-bar-finish {
      border: 1px solid #d4e4fe !important;
      width: 128px !important;

      .v-progress-linear__determinate {
        width: 96% !important;
        height: 4px !important;
        left: 2px !important;
        border-radius: 8px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
      }
    }
  }

  .new-file-upload__upload_succeed {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: #87879d;
  }
}
</style>
