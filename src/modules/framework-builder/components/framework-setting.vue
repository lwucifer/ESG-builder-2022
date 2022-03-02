<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import RichtextEditor from '../components/richtext-editor.vue'
import FrameworkService from '../services/framework.service'
import GlobalService from '@/modules/framework-builder/services/global.service'

interface omission {
  label: string
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
  customFramework: customFramework
}

type GlossaryFile = {
  blobName?: string
  createdAt?: string
  customFrameworkId?: string
  fileName?: string
  id?: string
  type?: string
  updatedAt?: string
  url?: string
}

type logoFile = {
  blobName?: string
  createdAt?: string
  customFrameworkId?: string
  fileName?: string
  id?: string
  type?: string
  updatedAt?: string
  url?: string
}

type logoThumbnailFile = {
  blobName?: string
  createdAt?: string
  customFrameworkId?: string
  fileName?: string
  id?: string
  type?: string
  updatedAt?: string
  url?: string
}

type customFramework = {
  code?: string
  createdAt?: string
  glossaryExternalUrl?: string
  glossaryFile?: GlossaryFile
  glossaryFileId?: string
  glossaryType?: string
  glossaryUrlText?: string
  hoverText?: string
  id?: string
  logoFile?: logoFile
  logoFileId?: string
  logoThumbnailFile?: logoThumbnailFile
  logoThumbnailFileId?: string
  name?: string
  pubishedAt?: string
  status?: string
  type?: string
  updatedAt?: string
}

@Component({
  components: { RichtextEditor }
})
export default class FrameworkSetting extends Vue {
  @Prop() glossary = true
  @Prop({ required: true }) framework!: framework
  @Prop() logoId!: string
  @Prop() iconId!: string

  existedFrameworkCode: (string | undefined)[] = []
  listKeyOmissionTexts: any = {}

  @Watch('framework.frameworkInformation.name') onFrameworkNameChange() {
    this.$parent.$emit(
      'frameworkName',
      this.framework.frameworkInformation.name
    )
  }

  @Watch('framework.frameworkInformation.code') onFrameworkCodeChange() {
    this.$parent.$emit(
      'frameworkCode',
      this.framework.frameworkInformation.code
    )
  }

  @Watch('framework.omissionInformation.omissionTexts')
  onFrameworkOmissionTextChange() {
    this.framework.omissionInformation.omissionTexts.forEach(
      (omission: omission, index: any) => {
        if (!(index in this.listKeyOmissionTexts))
          this.$set(this.listKeyOmissionTexts, index, false)
      }
    )
  }

  async mounted() {
    try {
      const unpub = await GlobalService.getFramework('unpublished')
      const pub = await GlobalService.getFramework('published')

      const framework: framework[] = [...unpub.data, ...pub.data]

      this.existedFrameworkCode = framework.map((f) => f.customFramework.code)

      this.framework.omissionInformation.omissionTexts.forEach(
        (omission: omission, index: any) => {
          this.$set(this.listKeyOmissionTexts, index, false)
        }
      )
    } catch (error) {
      this.$showSnack(error, true)
    }
  }

  $refs!: {
    form: HTMLFormElement
  }

  valid = true
  types = []
  typeShow = null
  omissions = [] as string[]
  options = [] as string[]
  glossaryTypes = [
    { title: 'External link', value: 'EXTERNAL_LINK' },
    { title: 'Internal file', value: 'INTERNAL_FILE' }
  ]
  isUploadGlossaryFile = false
  uploadedGlossaryFile = { blobName: null }

  get isSelectGlossaryLink() {
    if (!this.framework?.glossaryInformation?.glossaryType) return true
    return this.framework.glossaryInformation.glossaryType === 'EXTERNAL_LINK'
  }
  onAddOmission() {
    this.$emit('addOmissions')
  }

  onAddOption() {
    this.$emit('addOptions')
  }

  onPressSelectGlossaryFile() {
    const iconPickerElement = document.getElementById('glossaryFilePicker')
    iconPickerElement?.click()
  }

  getRules(fieldName: string, requiredOnly?: boolean) {
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

  getCodeRules() {
    return [
      (v: string) => !!v.replace(/\s/g, '') || 'Code is required',
      (v: string) =>
        (v.length <= 255 && v.length >= 2) ||
        'Code needs to be between 2-255 characters',
      (v: string) =>
        !this.existedFrameworkCode.includes(v) ||
        'Framework code should be unique'
    ]
  }

  get uploadedGlossaryFileName() {
    if (!this.uploadedGlossaryFile?.blobName) return undefined
    return this.uploadedGlossaryFile.blobName
  }

  get isEnableOmissionOptions() {
    if (!this.framework?.omissionInformation?.omissionTexts) return false
    return this.framework.omissionInformation.omissionTexts.length > 1
  }

  get getValidateOmissionText() {
    for (
      let index = 0;
      index < this.framework.omissionInformation.omissionTexts.length;
      index++
    ) {
      const omission = this.framework.omissionInformation.omissionTexts[
        index
      ] as omission
      let regex = /(<([^>]+)>)/gi
      let hasText = omission.title.replace(regex, '').replace(/\s/g, '')
      if (!hasText) return false
    }
    return true
  }

  async onGlossaryFileChange(event: Event) {
    if (this.isUploadGlossaryFile) {
      return
    }

    this.isUploadGlossaryFile = true

    const target = event.target as HTMLInputElement
    const file = target.files

    if (!file) {
      this.$showSnack('File does not exists', true)
      target.value = ''
      return
    }

    const acceptFileTypes = ['pdf', 'doc', 'docx']
    if (!acceptFileTypes.includes(file[0].name.split('.').splice(-1)[0])) {
      this.$showSnack('Wrong file format uploaded', true)
      this.isUploadGlossaryFile = false
      target.value = ''
      return
    }

    if (file) {
      const selectedGlossaryFile = (
        event.target as HTMLInputElement
      ).files?.item(0)
      try {
        const rs = await FrameworkService.uploadFile(
          selectedGlossaryFile,
          'GLOSSARY'
        )
        if (rs.data) {
          this.uploadedGlossaryFile = rs.data
          this.framework.glossaryInformation.glossaryFileId = rs.data.id
        }
        this.isUploadGlossaryFile = false
      } catch (error) {
        this.$showSnack(error, true)
        this.isUploadGlossaryFile = false
        target.value = ''
      }
    }
  }

  submit(): void {
    this.$emit('validateBrand')
    this.$refs.form.validate()
    if (this.getValidateOmissionText) this.$emit('submit')
  }

  handleClickNext(): void {
    this.$emit('validateBrand')
    this.$refs.form.validate()
    if (this.getValidateOmissionText) this.$emit('handleClickNext')
  }

  deleteOmission(omissionTextId: number) {
    this.framework.omissionInformation.omissionTexts.splice(omissionTextId, 1)
  }
  moveOmissionUp(omissionTextId: number) {
    const element =
      this.framework.omissionInformation.omissionTexts[omissionTextId]
    this.framework.omissionInformation.omissionTexts.splice(omissionTextId, 1)
    this.framework.omissionInformation.omissionTexts.splice(
      omissionTextId - 1,
      0,
      element
    )
  }

  moveOmissionDown(omissionTextId: number) {
    const element =
      this.framework.omissionInformation.omissionTexts[omissionTextId]
    this.framework.omissionInformation.omissionTexts.splice(omissionTextId, 1)
    this.framework.omissionInformation.omissionTexts.splice(
      omissionTextId + 1,
      0,
      element
    )
  }

  onFocusInput(index: number) {
    this.$set(
      this.listKeyOmissionTexts,
      index,
      !this.listKeyOmissionTexts[index]
    )
  }

  onBlurRichText(index: number) {
    this.$set(
      this.listKeyOmissionTexts,
      index,
      !this.listKeyOmissionTexts[index]
    )
  }

  isValidRichText(title: string) {
    var regex = /(<([^>]+)>)/gi
    var hasText = title.replace(regex, '').replace(/\s/g, '')
    if (hasText) return true
    return false
  }
}
</script>

<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <div class="framework-setting">
      <v-card class="pa-0 rounded-lg">
        <div class="px-5 py-6 framework-setting__header">
          <p class="title-framework-setting">Framework Settings</p>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Framework Name"
                v-model="framework.frameworkInformation.name"
                outlined
                clearable
                dense
                :rules="getRules('Framework name')"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Code"
                v-model="framework.frameworkInformation.code"
                outlined
                dense
                clearable
                :rules="getCodeRules()"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Hover Text"
                v-model="framework.frameworkInformation.hoverText"
                outlined
                clearable
                dense
                hide-details="auto"
                class="required"
                auto-grow
                rows="1"
                row-height="5"
                :rules="getRules('Hover Text', true)"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
        <div v-if="glossary" class="px-5 py-6 framework-setting__glossary">
          <p class="title">Glossary</p>
          <v-row>
            <v-col cols="6">
              <v-text-field
                label="Glossary Link Text"
                v-model="framework.glossaryInformation.glossaryUrlText"
                outlined
                clearable
                dense
                :rules="getRules('Glossary link text')"
                hide-details="auto"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-select
                dense
                outlined
                v-model="framework.glossaryInformation.glossaryType"
                label="Glossary File"
                placeholder="Select file"
                :persistent-placeholder="true"
                hide-details="auto"
                class="framework-setting__glossary-file__input required"
                :items="glossaryTypes"
                item-text="title"
                item-value="value"
              ></v-select>
            </v-col>
          </v-row>
          <v-row v-if="isSelectGlossaryLink">
            <v-col cols="12">
              <v-text-field
                label="Glossary link"
                v-model="framework.glossaryInformation.glossaryExternalUrl"
                outlined
                clearable
                dense
                hide-details="auto"
                class="required"
                :rules="getRules('Glossary link', true)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <div class="upload">
                <input
                  type="file"
                  id="glossaryFilePicker"
                  name="photoPicker"
                  style="width: 0px; height: 0px"
                  accept=".pdf, .doc, .docx"
                  @change="onGlossaryFileChange"
                />
                <v-btn
                  outlined
                  color="primary"
                  height="32"
                  class="px-4"
                  :loading="isUploadGlossaryFile"
                  @click="onPressSelectGlossaryFile"
                >
                  Upload file
                </v-btn>
                <div
                  class="info-file"
                  style="margin-left: 5px"
                  v-if="uploadedGlossaryFileName"
                >
                  <img src="@/assets/svg/upload-suceess.svg" />
                  <span class="name-file">{{ uploadedGlossaryFileName }}</span>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="px-5 py-6 framework-setting__omission">
          <p class="title">Omission Text</p>
          <div
            v-for="(omissionText, index) in framework.omissionInformation
              .omissionTexts"
            :key="index + '_omission'"
            :class="
              index != framework.omissionInformation.omissionTexts.length - 1
                ? 'multiple-omission'
                : ''
            "
          >
            <div
              class="align-center"
              :class="
                isEnableOmissionOptions
                  ? 'framework-setting__omission__editor-container__optional'
                  : 'framework-setting__omission__editor-container'
              "
            >
              <div v-if="listKeyOmissionTexts[index]">
                <richtext-editor
                  v-model="omissionText.title"
                  :lable="omissionText.label"
                  class="framework-setting__omission__editor-container__editor"
                  :required="true"
                  @blur="onBlurRichText(index)"
                ></richtext-editor>
                <div
                  class="v-text-field__details"
                  style="margin-top: 5px; padding: 0 12px"
                  v-if="!isValidRichText(omissionText.title)"
                >
                  <div class="v-messages theme--light error--text" role="alert">
                    <div class="v-messages__wrapper">
                      <div class="v-messages__message">
                        Reason of Omission is required
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <v-text-field
                v-else
                label="Omission Text"
                v-model="omissionText.title"
                outlined
                clearable
                dense
                :rules="getRules('Omission Text', true)"
                hide-details="auto"
                class="required"
                @focus="onFocusInput(index)"
              ></v-text-field>
              <div
                v-if="isEnableOmissionOptions"
                style="width: 5%; height: 100%"
                class="
                  d-flex
                  flex-column
                  justify-center
                  align-center
                  ml-4
                  framework-setting__omission__editor-container__option-container
                "
              >
                <div
                  class="
                    framework-setting__omission__editor-btn-wrapper
                    d-flex
                    flex-column
                    align-center
                    justify-center
                  "
                >
                  <v-icon
                    x-small
                    class="framework-setting__omission__editor-btn-arrow"
                    @click="moveOmissionUp(index)"
                  >
                    mdi-chevron-up
                  </v-icon>

                  <v-icon
                    x-small
                    class="framework-setting__omission__editor-btn-arrow"
                    @click="moveOmissionDown(index)"
                  >
                    mdi-chevron-down
                  </v-icon>
                </div>

                <v-btn
                  class="ma-2"
                  outlined
                  width="20"
                  height="20"
                  fab
                  color="#DFDFEF"
                  @click="deleteOmission(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </div>
            <p class="description-omission" v-if="index == 0">
              The table with reasons for omissions will be automatically
              appended with the options specified below. Any additional text
              will appear above the table.
            </p>
          </div>
          <v-btn
            outlined
            color="primary"
            height="24"
            class="my-4 mt-5 px-2"
            @click="onAddOmission"
          >
            + Add text box
          </v-btn>

          <v-row
            v-for="(option, index) in framework.omissionInformation
              .omissionOptions"
            :key="index + '_option'"
          >
            <v-col cols="3">
              <v-text-field
                label="Reason for Omission"
                v-model="option.name"
                outlined
                clearable
                dense
                hide-details="auto"
                :rules="getRules('Reason for Omission', true)"
                class="required"
              ></v-text-field>
            </v-col>
            <v-col cols="9">
              <v-text-field
                label="Description"
                v-model="option.description"
                outlined
                dense
                clearable
                hide-details="auto"
                class="required"
                :rules="getRules('Description', true)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn
            outlined
            color="primary"
            height="24"
            class="mt-5 px-2"
            @click="onAddOption"
          >
            + Add option
          </v-btn>
        </div>
        <div class="px-5 py-6 d-flex flex-row justify-end align-center">
          <v-btn
            outlined
            color="primary"
            height="40"
            class="mr-2 px-16"
            @click="submit"
          >
            Save
          </v-btn>
          <v-btn
            depressed
            color="primary"
            height="40"
            class="px-16"
            @click="handleClickNext"
          >
            Next
          </v-btn>
        </div>
      </v-card>
    </div>
  </v-form>
</template>

<style lang="scss">
.framework-setting .v-card {
  .title-framework-setting {
    font-weight: 600;
    font-size: 16px;
    color: #2c2c2e;
  }
  .mdi-close::before {
    font-size: 14px !important;
  }
  .v-text-field input,
  .v-select__selection,
  .v-text-field__slot {
    font-weight: normal !important;
    font-size: 12px !important;
    color: #2c2c2e;
  }
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
  fieldset {
    border: 1px solid #dfdfef;
  }
  .framework-setting__header {
    border-bottom: 1px solid #dfdfef;
  }
  .framework-setting__glossary {
    padding: 24px 0;
    .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
      > .v-input__control
      > .v-input__slot {
      box-shadow: inherit !important;
    }
    .upload {
      display: flex;
      .info-file {
        display: flex;
        .name-file {
          line-height: 32px;
          font-size: 12px;
          color: #5d5d71;
        }
      }
    }
    border-bottom: 1px solid #dfdfef;
  }
  .framework-setting__omission {
    padding: 24px 0;
    .description-omission {
      margin-bottom: 0px;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #87879d;
      margin-top: 8px;
    }
    .multiple-omission {
      margin-bottom: 15px;
    }
    border-bottom: 1px solid #dfdfef;
    .framework-setting__omission__editor-container {
      .framework-setting__omission__editor-container__editor {
        width: 100%;
      }
      .framework-setting__omission__editor-container__option-container {
        width: 0;
        height: 100%;
        .v-icon {
          font-size: 12px !important;
        }
      }
    }
    .framework-setting__omission__editor-container__optional {
      .framework-setting__omission__editor-container__editor {
        width: calc(100% - 60px);
      }
      .framework-setting__omission__editor-container__option-container {
        width: 60px;
        height: 100%;
        .framework-setting__omission__editor-btn-wrapper {
          border: solid thin #dfdfef;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          overflow: hidden;
          .v-icon {
            width: 2.5px !important;
            height: 5px !important;
            min-height: 0 !important;
            min-width: 0 !important;
            cursor: pointer !important;
          }
          .v-icon:hover {
            color: #0246b1 !important;
          }
          .v-icon.v-icon::after {
            width: 2.5px !important;
            height: 5px !important;
            min-height: 0 !important;
            min-width: 0 !important;
          }
        }
        .v-icon {
          font-size: 12px !important;
        }
      }
    }
  }
}
.framework-setting {
  .col-xl,
  .col-xl-auto,
  .col-xl-12,
  .col-xl-11,
  .col-xl-10,
  .col-xl-9,
  .col-xl-8,
  .col-xl-7,
  .col-xl-6,
  .col-xl-5,
  .col-xl-4,
  .col-xl-3,
  .col-xl-2,
  .col-xl-1,
  .col-lg,
  .col-lg-auto,
  .col-lg-12,
  .col-lg-11,
  .col-lg-10,
  .col-lg-9,
  .col-lg-8,
  .col-lg-7,
  .col-lg-6,
  .col-lg-5,
  .col-lg-4,
  .col-lg-3,
  .col-lg-2,
  .col-lg-1,
  .col-md,
  .col-md-auto,
  .col-md-12,
  .col-md-11,
  .col-md-10,
  .col-md-9,
  .col-md-8,
  .col-md-7,
  .col-md-6,
  .col-md-5,
  .col-md-4,
  .col-md-3,
  .col-md-2,
  .col-md-1,
  .col-sm,
  .col-sm-auto,
  .col-sm-12,
  .col-sm-11,
  .col-sm-10,
  .col-sm-9,
  .col-sm-8,
  .col-sm-7,
  .col-sm-6,
  .col-sm-5,
  .col-sm-4,
  .col-sm-3,
  .col-sm-2,
  .col-sm-1,
  .col,
  .col-auto,
  .col-12,
  .col-11,
  .col-10,
  .col-9,
  .col-8,
  .col-7,
  .col-6,
  .col-5,
  .col-4,
  .col-3,
  .col-2,
  .col-1 {
    padding: 10px !important;
  }
}
.framework-setting .required .v-label {
  overflow: revert;
}
.framework-setting .v-text-field--outlined:not(.v-label--active) .v-label,
.v-select--outlined:not(.v-label--active) .v-label {
  font-family: Mukta;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #5d5d71;
}
.framework-setting .required .v-label::after {
  content: '*';
  color: #e11900;
  position: absolute;
  right: -6px;
  top: 0;
}

.framework-setting__glossary-file__input {
  ::placeholder {
    font-style: normal !important;
    font-weight: 400 !important;
    font-size: 12px !important;
    line-height: 16px !important;
    color: #2c2c2e !important;
  }
}
</style>
