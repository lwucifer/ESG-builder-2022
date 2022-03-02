<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ConfirmDialog from '@/common/components/ui/confirm-dialog.vue'

interface logoFile {
  blobName: string
  url: string
}

interface customFramework {
  logoFile: logoFile
  code: string
  createdAt: string
  glossaryExternalUrl: string
  glossaryFileId: null
  hoverText: string
}

interface framework {
  code: string
  glossaryExternalUrl: string
  glossaryFileId: string
  glossaryType: string
  glossaryUrlText: string
  hoverText: string
  id: string
  name: string
  status: string
  type: string
  customFramework: customFramework
}

@Component({
  components: { ConfirmDialog }
})
export default class ItemFramework extends Vue {
  display = false

  @Prop({ required: true }) framework?: framework

  get imageUrl() {
    if (this.framework) {
      return this.framework.customFramework.logoFile.url
    }

    return ''
  }

  publish(): void {
    this.display = true
  }

  hideDialog(): void {
    this.display = false
  }
}
</script>

<template>
  <div class="item-framework">
    <div class="item-framework__content">
      <img
        class="item-framework__content__logo"
        :src="framework.glossaryFileId"
        v-if="framework && framework.glossaryFileId"
      />
      <img class="item-framework__content__logo" :src="imageUrl" v-else />
      <div class="infomation">
        <p class="title">
          {{ framework.customFramework && framework.customFramework.name }}
        </p>
        <p class="time" v-if="framework && framework.status == 'published'">
          Published
        </p>
      </div>
    </div>
    <div
      class="item-framework__footer"
      v-if="framework && framework.status == 'published'"
    >
      <div class="action">Preview</div>
      <div class="action" @click="publish">Unpublish</div>
      <div class="action" @click="$emit('editFramework', framework.id)">
        Editing
      </div>
    </div>
    <div class="item-framework__footer" v-else>
      <div class="action">Preview</div>
      <div class="action">Archive</div>
      <div class="action" @click="$emit('editFramework', framework.id)">
        Open
      </div>
    </div>
    <ConfirmDialog
      v-if="display"
      v-model="display"
      maxWidth="388"
      @hide="hideDialog"
    />
  </div>
</template>

<style lang="scss" scoped>
.item-framework {
  height: 184px;
  background: #ffffff;
  border: 1px solid #dfdfef;
  box-sizing: border-box;
  border-radius: 8px;
  .item-framework__content {
    padding: 20px 24px;
    height: 144px;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px solid #dfdfef;
    .infomation {
      width: 60%;
      max-width: calc(100%-92px);
      padding-left: 24px;
      .time {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        color: #87879d;
      }
    }
    .item-framework__content__logo {
      width: 40%;
      object-fit: contain;
      width: 120px;
      height: 120px;
    }
  }
  .item-framework__footer {
    height: 40px;
    display: flex;
    .action {
      width: calc(100% / 3);
      text-align: center;
      line-height: 40px;
      color: #2b61f5;
      cursor: pointer;
      font-weight: 500;
      font-size: 12px;
    }
    .action:first-child {
      border-right: 1px solid #dfdfef;
    }
    .action:last-child {
      border-left: 1px solid #dfdfef;
    }
  }
}
</style>
