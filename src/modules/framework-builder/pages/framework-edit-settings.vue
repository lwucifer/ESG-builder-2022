<template>
  <div
    class="
      framework-edit-settings
      screen-container-base
      justify-space-between
      align-center
      pa-5
    "
  >
    <v-row>
      <v-col cols="4">
        <framework-brand
          :framework="framework"
          :typevalidateBrand="typevalidateBrand"
          @handleClickUploadLogo="isUploadLogoDialogOpen = true"
          @disableGlossary="onDisableGlossary"
          @onUploadLogo="onUploadLogo"
          @onUploadIcon="onUploadIcon"
        ></framework-brand>
      </v-col>
      <v-col cols="8">
        <framework-setting
          :glossary="framework.frameworkTypeAndLogoInformation.glossaryEnabled"
          :framework="framework"
          @addOmissions="addOmissions"
          @addOptions="addOptions"
          @submit="submit"
          @handleClickNext="onNext"
          @frameworkCode="frameworkCode"
          @validateBrand="validateBrand"
        ></framework-setting>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import FrameworkBrand from '@/modules/framework-builder/components/framework-brand.vue'
import FrameworkSetting from '@/modules/framework-builder/components/framework-setting.vue'
import GlobalParameterService from '../services/global.service'
import { Routes } from '@/router'
import { EventBus } from '@/plugins/event-bus'

@Component({ components: { FrameworkBrand, FrameworkSetting } })
export default class ManageFrameworkSettings extends Vue {
  isSave = false
  isUploadLogoDialogOpen = false
  zoom = 0
  logoId = ''
  iconId = ''
  typevalidateBrand = false
  framework = {
    id: '',
    frameworkTypeAndLogoInformation: {
      type: '',
      logoFileId: '',
      logoThumbnailFileId: '',
      glossaryEnabled: true
    },
    frameworkInformation: {
      name: '',
      code: '',
      hoverText: ''
    },
    glossaryInformation: {
      glossaryUrlText: '',
      glossaryExternalUrl: undefined,
      glossaryFileId: undefined,
      glossaryType: 'EXTERNAL_LINK'
    },
    omissionInformation: {
      omissionTexts: [
        {
          action: 'ADD',
          label: 'Reason of Omission',
          title: ''
        }
      ],
      omissionOptions: [
        {
          action: 'ADD',
          name: '',
          description: ''
        }
      ]
    }
  }

  lastestFrameworkVersionId = ''

  mounted() {
    console.log(this.$route.params)
    this.isSave = false
    EventBus.$on('drawerExit', () => {
      this.onDrawerExit()
    })
  }

  handleZoomOutClick(): void {
    this.zoom = this.zoom - 10 || 0
  }

  handleZoomInClick(): void {
    this.zoom = this.zoom + 10 || 100
  }

  onDisableGlossary(e: boolean): void {
    this.framework.frameworkTypeAndLogoInformation.glossaryEnabled = e
  }

  addOmissions(): void {
    this.framework.omissionInformation.omissionTexts.push({
      label: 'Reason of Omission',
      action: 'ADD',
      title: ''
    })
  }

  addOptions(): void {
    this.framework.omissionInformation.omissionOptions.push({
      action: 'ADD',
      name: '',
      description: ''
    })
  }

  onUploadLogo(imgId: string) {
    this.logoId = imgId
  }

  onUploadIcon(imgId: string) {
    this.iconId = imgId
  }

  frameworkCode(payload: string) {
    this.framework.frameworkInformation.code = payload
  }

  validateBrand() {
    this.typevalidateBrand = true
  }

  async submit() {
    this.isSave = false
    try {
      this.framework.frameworkTypeAndLogoInformation.logoFileId = this.logoId
      this.framework.frameworkTypeAndLogoInformation.logoThumbnailFileId =
        this.iconId
      if (!this.framework.frameworkTypeAndLogoInformation.type) return
      if (!this.logoId || !this.iconId) {
        this.$showSnack('Framework logo and icon are mandatory', true)
        return
      }

      const response = await GlobalParameterService.createFramework(
        this.framework
      )
      if (!response?.data?.id) {
        this.$showSnack('Create framework failed!')
        return
      }

      this.$showSnack('All changes has been saved.')
      this.isSave = true
      this.framework.id = response?.data?.id
      this.lastestFrameworkVersionId =
        response?.data?.customFrameworkVersions[0].id
    } catch (error) {
      this.$showSnack(error, true)
    }
  }

  async onNext() {
    if (!this.isSave) {
      await this.submit()
    }
    this.$router.push({
      path: Routes.editFrameworkDimensions.path,
      query: {
        id: this.framework?.id,
        version: this.lastestFrameworkVersionId
      }
    })
  }

  async onDrawerExit() {
    if (this.framework?.id) {
      await this.submit()
    }
    this.$router.push({ name: Routes.publishFramework.name })
  }
}
</script>
<style lang="scss" scoped>
.framework-edit-settings {
  background-color: $background-color;
}
</style>
