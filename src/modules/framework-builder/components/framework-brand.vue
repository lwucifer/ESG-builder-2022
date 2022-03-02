<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card min-width="335" class="rounded-lg">
      <div class="d-flex px-6 py-3 justify-space-between" style="gap: 16px">
        <div
          class="
            upload-image-card__image-container
            d-flex
            align-center
            justify-center
          "
        >
          <empty-logo-icon v-if="!uploadedLogoUrl"></empty-logo-icon>
          <img
            v-else
            :src="uploadedLogoUrl"
            class="upload-image-card__image-container__img"
          />
        </div>
        <div class="d-flex align-center">
          <div>
            <div class="upload-image-card__framework-title">
              {{ frameworkName ? `${frameworkName}_Logo` : 'Untitled' }}
            </div>
            <div class="upload-image-card__logo-picker">
              <input
                type="file"
                id="photoPicker"
                name="photoPicker"
                accept="image/jpeg, image/png"
                style="width: 0px; height: 0px"
                @change="onLogoChange"
              />
              <v-btn
                outlined
                depressed
                color="primary"
                height="32"
                class="px-3"
                @click="handleClickUploadLogo"
              >
                Upload logo (120x120px)
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center px-5 py-3">
        <div class="upload-image-card__text">
          Type
          <span style="color: red">*</span>
        </div>

        <div class="type-logo">
          <v-select
            v-model="framework.frameworkTypeAndLogoInformation.type"
            hide-details="auto"
            dense
            solo
            flat
            min-width="32px"
            :items="selectItems"
            item-text="name"
            item-value="value"
            label="Select type"
            :rules="getRules('Type')"
            class="upload-image-card__type-selector"
          ></v-select>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center px-5 py-4">
        <div class="upload-image-card__text">
          Icon(24x24px)
          <span style="color: red">*</span>
        </div>
        <div>
          <input
            type="file"
            id="iconPicker"
            name="photoPicker"
            accept="image/jpeg, image/png"
            style="width: 0px; height: 0px"
            @change="onIconChange"
          />
          <v-btn
            outlined
            depressed
            color="primary"
            height="32"
            class="px-4"
            :loading="isUploadingIcon"
            @click="handleClickUploadIcon"
          >
            {{ uploadedIconId ? 'Change' : 'Upload' }}
          </v-btn>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="d-flex justify-space-between align-center px-5 py-1">
        <div class="upload-image-card__text">Glossary</div>
        <div class="d-flex align-center">
          <v-switch
            v-model="glossary"
            dense
            inset
            color="primary"
            class="upload-image-card__glossary-switch"
            @change="onToggleGlossary"
          ></v-switch>
        </div>
      </div>
    </v-card>
    <v-dialog width="280" v-model="isUploadLogoDialogOpen" persistent>
      <v-card width="280" height="406" class="pa-4">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="manage-framework-setting__upload-logo_title">
            Framework logo
          </div>
          <v-btn x-small icon @click="onToggleDialog">
            <v-icon color="#C4C4C4">mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card
          height="240"
          width="240"
          flat
          outlined
          class="manage-framework-setting__upload-image-dialog"
        >
          <div
            id="imgLogo"
            class="
              manage-framework-setting__upload-image-dialog__virtual-container
            "
          >
            <cropper
              ref="cropper"
              :src="selectLogoSrc"
              :stencil-props="{
                handlers: {},
                movable: false,
                scalable: false,
                aspectRatio: 1 / 1
              }"
              :resize-image="false"
              :stencil-size="{
                width: 240,
                height: 240,
                wheel: false
              }"
              image-restriction="stencil"
              :auto-zoom="false"
              style="width: 240px; height: 240px"
              :transitions="false"
              :canvas="{
                height: 120,
                width: 120,
                maxHeight: 120,
                maxWidth: 120
              }"
              @change="onCropperChange"
            />
          </div>
        </v-card>
        <div class="d-flex align-center justify-space-between mt-2 mb-2">
          <v-btn small icon @click="reduceZoom">
            <v-icon color="primary" size="20">mdi-minus</v-icon>
          </v-btn>
          <v-slider
            v-model="zoom"
            track-color="#DFDFEF"
            dense
            hide-details="auto"
            :step="10"
            readonly
            @change="onZoomChanged"
          ></v-slider>
          <v-btn small icon @click="increaseZoom">
            <v-icon color="primary" size="20">mdi-plus</v-icon>
          </v-btn>
        </div>
        <div class="d-flex align-center justify-space-between">
          <v-btn
            class="
              manage-framework-settings__btn-style
              manage-framework-settings__other-image-btn
            "
            depressed
            :disabled="loading"
            @click="resetLogo"
          >
            Other image
          </v-btn>
          <v-btn
            class="
              manage-framework-settings__btn-style
              manage-framework-settings__save-btn
            "
            color="primary"
            depressed
            :loading="loading"
            @click="onSubmit()"
          >
            Save
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import EmptyLogoIcon from '@/common/components/icons/empty-logo-icon.vue'
import FrameworkService from '../services/framework.service'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { TodoFixMe } from '@/types/common'

interface omission {
  title: string
}

interface option {
  name: string
  description: string
}

interface framework {
  frameworkTypeAndLogoInformation: {
    type: string
    logoFileId: string
    logoThumbnailFileId: string
    glossaryEnabled: boolean
  }
  frameworkInformation: {
    name: string
    code: string
    hoverText: string
  }
  glossaryInformation: {
    glossaryUrlText: string
    glossaryExternalUrl: string
    glossaryFileId?: string
    glossaryType: string
  }
  omissionInformation: {
    omissionTexts: omission[]
    omissionOptions: option[]
  }
}

@Component({ components: { EmptyLogoIcon, Cropper } })
export default class FrameworkBrand extends Vue {
  @Prop() framework!: framework
  @Prop() typevalidateBrand = false
  valid = true
  $refs!: {
    form: HTMLFormElement
    cropper: TodoFixMe
  }
  selectItems = [
    { name: 'Reporting Standards', value: 'REPORTING_STANDARDS' },
    { name: 'Special Framework', value: 'SPECIAL_FRAMEWORK' },
    {
      name: 'Exchange Listing Requirements',
      value: 'EXCHANGE_LISTING_REQUIREMENTS'
    }
  ]
  isUploadLogoDialogOpen = false
  zoom = 0
  glossary = true
  selectLogoFile: File | undefined | null = null
  selectIconFile: File | undefined | null = null
  selectLogoSrc: string | ArrayBuffer | null | undefined = ''
  selectIconSrc = ''
  loading = false
  uploadedLogoUrl: string | undefined = ''
  uploadedLogo:
    | { fileName: string; id: string; fileData?: string }
    | undefined = undefined
  isUploadingIcon = false
  uploadedIconId = undefined

  get logoName(): string {
    console.log('logoName', this.uploadedLogo)
    if (!this.uploadedLogo) return 'Untitled'
    return this.uploadedLogo?.fileName || 'Untitled'
  }

  get logoUrl(): string | undefined | boolean | ArrayBuffer | null {
    if (!this.uploadedLogo?.fileData) return false
    return this.selectLogoSrc
  }

  get frameworkName(): string {
    return this.framework.frameworkInformation.code
  }

  reduceZoom(): void {
    if (this.zoom >= 10) this.zoom -= 10
  }

  increaseZoom(): void {
    if (this.zoom <= 90) this.zoom += 10
  }

  @Watch('typevalidateBrand') validateBrand() {
    this.$refs.form.validate()
  }

  handleClickUploadLogo(): void {
    const photoPickerElement = document.getElementById('photoPicker')
    photoPickerElement?.click()
  }
  handleClickUploadIcon(): void {
    const iconPickerElement = document.getElementById('iconPicker')
    iconPickerElement?.click()
  }
  onLogoChange(event: Event) {
    var fileInput = document.getElementById('photoPicker') as any
    var typeFile = fileInput.files[0].type
    if (!['image/jpeg', 'image/png'].includes(typeFile)) {
      this.$showSnack('Wrong the format uploaded!', true)
      return
    }
    if ((event.target as HTMLInputElement).files) {
      this.zoom = 0
      this.selectLogoFile = (event.target as HTMLInputElement).files?.item(0)
      if (this.selectLogoFile) {
        const reader = new FileReader()
        reader.addEventListener(
          'load',
          () => (this.selectLogoSrc = reader.result)
        )
        reader.readAsDataURL(this.selectLogoFile)
        this.isUploadLogoDialogOpen = true
      }
    }
    ;(event.target as HTMLInputElement).value = ''
  }

  getRules(fieldName: string) {
    return [(v: string) => !!v || `${fieldName} is required`]
  }

  async onIconChange(event: Event) {
    if (this.isUploadingIcon) {
      return
    }
    var fileInput = document.getElementById('iconPicker') as any
    var typeFile = fileInput.files[0].type
    if (!['image/jpeg', 'image/png'].includes(typeFile)) {
      this.$showSnack('Wrong the format uploaded!', true)
      return
    }

    this.isUploadingIcon = true

    if ((event.target as HTMLInputElement).files) {
      const selectedIcon = (event.target as HTMLInputElement).files?.item(0)
      try {
        const rs = await FrameworkService.uploadFile(selectedIcon, 'ICON')
        if (rs.data) {
          this.$parent.$emit('logoUrl', rs.data.fileUrl)
          this.$emit('onUploadIcon', rs.data.id)
          this.$showSnack('Upload succesfully!', false)
          this.uploadedIconId = rs.data.id
        } else {
          this.$showSnack('Upload failed!', true)
        }
        this.isUploadingIcon = false
      } catch (error) {
        this.$showSnack(error, true)
        this.isUploadingIcon = false
      }
    }
  }

  onToggleDialog(): void {
    this.selectLogoFile = null
    this.selectLogoSrc = null
    this.isUploadLogoDialogOpen = !this.isUploadLogoDialogOpen
  }
  onToggleGlossary() {
    this.$emit('disableGlossary', this.glossary)
  }

  resetLogo() {
    this.selectLogoFile = undefined
    this.isUploadLogoDialogOpen = false
    this.selectLogoSrc = null
    const photoPickerElement = document.getElementById(
      'photoPicker'
    ) as HTMLInputElement
    if (photoPickerElement) {
      photoPickerElement.files = null
      photoPickerElement.value = ''
      photoPickerElement.click()
    }
  }

  async onSubmit() {
    this.loading = true
    try {
      const { canvas } = this.$refs.cropper.getResult()
      await this.submitPhoto(canvas.toDataURL())
    } catch (error) {
      this.$showSnack(error)
    }
    // try {
    //   const rs = await FrameworkService.uploadFile(this.selectLogoFile, 'LOGO')

    //   if (rs?.data) {
    //     this.uploadedLogo = rs.data
    //     this.uploadedLogoUrl = rs.data.fileUrl
    //     this.isUploadLogoDialogOpen = false
    //     this.$emit('onUploadLogo', rs.data.id)
    //     this.$showSnack('Upload succesfully!', false)
    //   }
    //   this.loading = false
    // } catch (error) {
    //   this.$showSnack(error, true)
    //   this.loading = false
    // }
    // const node = document.getElementById('imgLogo')
    // if (!node) return
    // this.loading = true
    // console.log('OnStart: ', new Date())
    // htmlToImage
    //   .toPng(node, { pixelRatio: 0.5 })
    //   .then((dataUrl) => {
    //     this.submitPhoto(dataUrl, fileName)
    //     // const downloadLink = document.createElement('a')
    //     // document.body.appendChild(downloadLink)

    //     // downloadLink.href = dataUrl
    //     // downloadLink.target = '_self'
    //     // downloadLink.download = fileName
    //     // downloadLink.click()
    //     console.log(dataUrl)
    //     this.loading = false
    //   })
    //   .catch((error) => {
    //     console.error('oops, something went wrong!', error)
    //     this.loading = false
    //   })
  }

  async submitPhoto(imgData: string) {
    try {
      this.loading = true
      const file = await this.base64ToFile(imgData, 'LOGO.png', 'image/png')
      console.log(file)
      const rs = await FrameworkService.uploadFile(file, 'LOGO')
      if (rs.data) {
        this.uploadedLogoUrl = rs.data.fileUrl
        this.$emit('onUploadLogo', rs.data.id)
      }
      this.isUploadLogoDialogOpen = false
    } catch (error) {
      console.log('submitPhoto', error)
    } finally {
      this.loading = false
    }
  }

  async base64ToFile(buf: string, filename: string, mimeType: string) {
    const res: Response = await fetch(buf)
    const blob: Blob = await res.blob()
    return new File([blob], filename, { type: mimeType })
  }

  @Watch('zoom')
  onZoomChange(nvl: number, ovl: number) {
    const zoomLevel = (ovl - nvl) / 100
    const cropperControl = this.$refs.cropper as Cropper
    cropperControl.zoom(1 - zoomLevel)
  }
}
</script>
<style lang="scss">
.type-logo {
  .v-messages__wrapper {
    text-align: right !important;
  }
}
</style>
<style scoped lang="scss">
.upload-image-card__framework-title {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #2c2c2e;
  text-overflow: clip;
  max-lines: 1;
  max-width: 300px;
}

.upload-image-card__logo-picker {
  float: right;
}

.upload-image-card__text {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #2c2c2e;
}

.upload-image-card__image-container {
  width: 120px;
  height: 120px;
  object-fit: cover;
  .upload-image-card__image-container__img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
}

.upload-image-card__upload-btn {
  width: 151px !important;
  height: 32px !important;
}

.upload-image-card__upload-icon-btn {
  width: 69px !important;
  height: 32px !important;
}

::v-deep {
  .upload-image-card__glossary-switch {
    .v-input--selection-controls__input {
      width: 38px !important;
      margin-right: 4px !important;
    }
  }

  .upload-image-card__type-selector {
    max-width: 160px !important;
    text-align: right !important;
    .v-input__slot {
      border-style: none !important;
      padding: 0 0 0 12px !important;
    }
    .v-label,
    .v-select__selections {
      font-family: Mukta;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #2c2c2e;
      right: 0 !important;
      padding-right: 8px;
    }
  }
}
.manage-framework-setting__upload-image-dialog {
  border: 1px solid #d4e4fe !important;
  overflow: hidden;
  .manage-framework-setting__upload-image-dialog__virtual-container {
    height: 240px;
    width: 240px;
    overflow: hidden;
    .manage-framework-setting__upload-image-dialog__virtual-container__image {
      height: 240px;
      width: 240px;
      object-fit: contain;
    }
  }
}

.manage-framework-setting__upload-logo_title {
  font-style: normal !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  line-height: 20px !important;
  color: #2c2c2e !important;
}

.manage-framework-settings__btn-style {
  width: 116px !important;
  height: 38px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 14px !important;
}

.manage-framework-settings__other-image-btn {
  color: #2b61f5 !important;
  background-color: #eff5ff !important;
}
</style>
