<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import FileUpload from '@/common/components/ui/new-file-upload.vue'
import FrameworkService from '@/modules/framework-builder/services/framework.service'

type StructureItem = {
  name: string
  fieldsUploadProgress: number
  isFieldUploading: boolean
  isFieldUploaded: boolean
  isFieldUploadSucceed: boolean
  fieldFileName: string
  targetRouter: string
}
@Component({
  components: {
    FileUpload
  }
})
export default class FrameworkEditStructure extends Vue {
  types = []
  versionId = this.$route.query.version

  get currentVersionId() {
    return this.versionId as string
  }

  get fakeData() {
    return [
      {
        name: 'Dimension',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'DIMENSION',
        targetRouter: 'dimension'
      },
      {
        name: 'Category',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'CATEGORY',
        targetRouter: 'category'
      },
      {
        name: 'Topics',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'TOPIC',
        targetRouter: 'topic'
      },
      {
        name: 'Metrics',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'METRIC',
        targetRouter: 'metric'
      },
      {
        name: 'Sub metrics',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'SUB_METRICS',
        targetRouter: 'sub-metric'
      },
      {
        name: 'Field Groups',
        fieldsUploadProgress: 0,
        isFieldUploading: false,
        isFieldUploaded: false,
        isFieldUploadSucceed: false,
        fieldFileName: '',
        value: 'FIELD_GROUPS',
        targetRouter: 'sub-metric-field'
      }
    ]
  }
  goNext() {
    console.log('kkkk')
  }
  async downLoadSampleFile(type: string) {
    const rs = await FrameworkService.downloadSampleFile(
      type,
      this.currentVersionId
    )
    if (!rs) {
      return
    } else {
      const url = window.URL.createObjectURL(rs)
      const link = document.createElement('a')
      link.href = url
      const downloadLink = `${type}.xlsx`
      link.download = downloadLink
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
  async onFieldFileChange(item: StructureItem, e: Event) {
    const file = (e.target as HTMLInputElement).files

    if (!file) {
      return
    }

    const formData = new FormData()
    formData.append('file', file[0])
    item.isFieldUploading = true
    await FrameworkService.uploadExcel(
      formData,
      item.targetRouter,
      this.currentVersionId,
      (progressEvent) => {
        item.fieldsUploadProgress =
          (progressEvent.loaded / progressEvent.total) * 100
      }
    )
    item.isFieldUploading = false
    item.fieldFileName = file[0].name
    item.isFieldUploadSucceed = true
    item.isFieldUploaded = true
  }
}
</script>

<template>
  <div class="framework-edit-structure">
    <v-card class="file-upload-wrapper">
      <v-card-text class="framework-edit-structure__text">
        <div class="row">
          <div
            class="file-upload-item col-md-6 m-0"
            v-for="(item, index) in fakeData"
            :key="index"
          >
            <file-upload
              :sectionName="item.name"
              :file-name="item.fieldFileName"
              :progress="item.fieldsUploadProgress"
              :is-uploading="item.isFieldUploading"
              :is-uploaded="item.isFieldUploaded"
              :is-upload-succeed="item.isFieldUploadSucceed"
              @onFileChange="onFieldFileChange(item, $event)"
              @handleClickDownloadFile="downLoadSampleFile(item.value)"
            />
          </div>
        </div>
      </v-card-text>
      <v-divider class="divider-icon"></v-divider>
      <v-card-actions class="framework-edit-structure__action">
        <v-spacer></v-spacer>
        <v-btn
          depressed
          color="primary"
          height="40"
          class="px-16"
          @onclick="goNext()"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
.box {
  box-sizing: border-box;
  border: 3px solid transparent;
  background-clip: padding-box;
}
.framework-edit-structure {
  padding: 20px;
  &__action {
    padding: 24px 32px;
  }
  &__text {
    padding: 32px;
    height: 85%;
    overflow: auto;
  }
}
.file-upload-wrapper {
  box-shadow: 0px 2px 4px rgba(202, 202, 202, 0.5),
    0px 1px 4px rgba(218, 218, 224, 0.4);
  border-radius: 8px;

  .action {
    div {
      margin-right: 8px;
    }
  }
}
</style>
