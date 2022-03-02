<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileUpload from '@/common/components/ui/new-file-upload.vue'
import { Routes } from '@/router'
import GlobalParameterService from '@/modules/framework-builder/services/global.service'
import { TodoFixMe } from '@/types/common'

@Component({
  components: { FileUpload }
})
export default class ManageFramework extends Vue {
  types = []
  typeShow = null
  fieldsUploadProgress = 0
  uomUploadProgress = 0
  isFieldUploading = false
  isUomUploading = false
  isFieldUploaded = false
  isUomUploaded = false
  isFieldUploadSucceed = false
  isUomUploadSucceed = false
  fieldFileName = ''
  uomFileName = ''

  async mounted() {
    const uom = await GlobalParameterService.getFileType('UOM')
    const field = await GlobalParameterService.getFileType('FIELD')
    if (uom.data['fileName']) {
      this.isUomUploaded = true
      this.uomFileName = uom.data['fileName']
    }

    if (field.data['fileName']) {
      this.isFieldUploaded = true
      this.fieldFileName = field.data['fileName']
    }
  }

  backToHome(): void {
    // FrameworkService.login()
    this.$router.push({ name: Routes.publishFramework.name })
  }

  async onFieldFileChange(e: Event) {
    this.isFieldUploading = true
    const target = e.target as HTMLInputElement
    const file = target.files

    if (!file) {
      this.$showSnack('File does not exists', true)
      this.isFieldUploading = false
      target.value = ''
      return
    }

    const acceptFileTypes = ['xlsx', 'xls']
    if (!acceptFileTypes.includes(file[0].name.split('.').splice(-1)[0])) {
      this.$showSnack('Wrong file format uploaded', true)
      this.isFieldUploading = false
      target.value = ''
      return
    }

    if (file[0].name.substr(0, file[0].name.length - 5) !== 'FIELDS') {
      this.$showSnack('Wrong file format uploaded', true)
      this.isFieldUploading = false
      target.value = ''
      return
    }

    const formData = new FormData()
    formData.append('file', file[0])
    this.isFieldUploading = true
    try {
      await GlobalParameterService.uploadExcel(
        formData,
        'field',
        (progressEvent) => {
          this.fieldsUploadProgress =
            (progressEvent.loaded / progressEvent.total) * 100
        }
      )
    } catch (error: TodoFixMe) {
      this.$showSnack(error.response.data.message, true)
      this.isFieldUploading = false
      target.value = ''
    }
    this.isFieldUploading = false
    this.fieldFileName = file[0].name
    this.isFieldUploadSucceed = true
    this.isFieldUploaded = true
    target.value = ''
    this.$emit('uploadedFile')
  }

  async onUomFileChange(e: Event) {
    this.isUomUploading = true
    const target = e.target as HTMLInputElement
    const file = target.files

    if (!file) {
      this.$showSnack('File does not exists', true)
      this.isUomUploading = false
      target.value = ''
      return
    }

    const acceptFileTypes = ['xlsx', 'xls']
    if (!acceptFileTypes.includes(file[0].name.split('.').splice(-1)[0])) {
      this.$showSnack('Wrong file format uploaded', true)
      this.isUomUploading = false
      target.value = ''
      return
    }

    if (file[0].name.substr(0, file[0].name.length - 5) !== 'UOM') {
      this.$showSnack('Wrong file format uploaded', true)
      this.isUomUploading = false
      target.value = ''
      return
    }

    const formData = new FormData()
    formData.append('file', file[0])

    try {
      await GlobalParameterService.uploadExcel(
        formData,
        'uom',
        (progressEvent) => {
          this.uomUploadProgress =
            (progressEvent.loaded / progressEvent.total) * 100
        }
      )
    } catch (error: TodoFixMe) {
      this.$showSnack(error.response.data.message, true)
      this.isUomUploading = false
      target.value = ''
    }

    this.isUomUploading = false
    this.uomFileName = file[0].name
    this.isUomUploadSucceed = true
    this.isUomUploaded = true
    target.value = ''
    this.$emit('uploadedFile')
  }

  async handleClickDownloadFile(type: string) {
    let res
    let downloadLink = ''

    switch (type) {
      case 'UOM':
        res = await GlobalParameterService.downloadUomExcel()
        downloadLink = 'UOM.xlsx'
        break
      case 'FIELDS':
        res = await GlobalParameterService.downloadFieldsExcel()
        downloadLink = 'FIELDS.xlsx'
        break
    }

    if (!res) {
      return
    }
    const url = window.URL.createObjectURL(res)
    const link = document.createElement('a')
    link.href = url

    link.download = downloadLink
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  get computedFieldsUploadProgress() {
    return this.fieldsUploadProgress
  }

  get computedUomUploadProgres() {
    return this.uomUploadProgress
  }
}
</script>

<template>
  <div class="manage-framework">
    <div class="manage-form-upload">
      <div class="manage-form__header">
        <div class="manage-form-upload__row">
          <div class="manage-form-upload__item">
            <file-upload
              sectionName="UoM"
              :file-name="uomFileName"
              :is-uploaded="isUomUploaded"
              :is-uploading="isUomUploading"
              :progress="computedUomUploadProgres"
              :is-upload-succeed="isUomUploadSucceed"
              @onFileChange="onUomFileChange"
              @handleClickDownloadFile="handleClickDownloadFile('UOM')"
            ></file-upload>
          </div>
          <div class="manage-form-upload__item">
            <file-upload
              sectionName="Fields"
              :file-name="fieldFileName"
              :progress="computedFieldsUploadProgress"
              :is-uploading="isFieldUploading"
              :is-uploaded="isFieldUploaded"
              :is-upload-succeed="isFieldUploadSucceed"
              @onFileChange="onFieldFileChange"
              @handleClickDownloadFile="handleClickDownloadFile('FIELDS')"
            ></file-upload>
          </div>
        </div>
        <div class="message-upload__row">
          <img src="@/assets/svg/warning.svg" />
          Fields and UoM are shared between all frameworks. Any change will
          affect all published and unpublished frameworks
        </div>
      </div>
      <div class="manage-form__footer">
        <v-btn outlined color="primary" @click="backToHome">
          Back to homepage
        </v-btn>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.manage-framework {
  padding: 25px 20px;
  .manage-form-upload {
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(202, 202, 202, 0.5),
      0px 1px 4px rgba(218, 218, 224, 0.4);
    border-radius: 8px;
    .manage-form__header {
      padding: 32px 32px;
      border-bottom: 1px solid #dfdfef;
      .manage-form-upload__row {
        display: flex;
        justify-content: space-between;
        // flex-direction: column;
        // justify-content: flex-start;
        // align-items: stretch;
        &__row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
        }
        .manage-form-upload__item {
          width: calc(50% - 16px);
          .form-upload__title {
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
            color: #2c2c2e;
            margin-bottom: 10px;
          }
        }
      }
      .message-upload__row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 8px 12px;
        height: 36px;
        background: #fff2d7;
        border: 1px solid #ffcf6d;
        box-sizing: border-box;
        border-radius: 4px;
        margin-top: 32px;
        font-size: 13px;
        line-height: 20px;
        color: #b65700;
        text-indent: 10px;
      }
    }
    .manage-form__footer {
      height: 88px;
      width: 100%;
      padding: 26px 32px;
      .v-btn {
        height: 40px !important;
        text-transform: inherit !important;
        background: #ffffff;
        border: 1px solid #d4e4fe;
      }
    }
  }
}
</style>
