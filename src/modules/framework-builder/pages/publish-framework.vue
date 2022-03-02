<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import FrameworkEmpty from '@/modules/framework-builder/components/framework-empty.vue'
import FrameworkItem from '@/modules/framework-builder/components/framework-item.vue'
import GlobalParameterService from '../services/global.service'
import { Routes } from '@/router'
import { CustomFramework } from '@/types/custom-framework'

interface logoFile {
  blobName: string
  createdAt: string
  customFrameworkId: string
  fileName: string
  id: string
  type: string
  updatedAt: string
  url: string
}

interface framework {
  code: string
  glossaryExternalUrl: string
  glossaryFileId: string
  glossaryType: string
  glossaryUrlText: string
  logoFile: logoFile
  hoverText: string
  id: string
  name: string
  status: string
  type: string
}

@Component({
  components: { FrameworkEmpty, FrameworkItem }
})
export default class PublishedFramework extends Vue {
  @Prop() isGlobalParameterCompleted!: boolean

  types = []
  typeShow = null
  listUnpublishedFrameworks = [] as framework[]
  listPublishedFrameworks = [] as framework[]
  loading = false

  testUI = true // check UI have data

  editFramework(id: string): void {
    this.$router.push({
      name: Routes.editFrameworkSettings.name,
      params: {
        id
      }
    })
  }

  async created() {
    try {
      this.loading = true
      const unpub = await GlobalParameterService.getFramework('unpublished')
      const pub = await GlobalParameterService.getFramework('published')
      this.listUnpublishedFrameworks = unpub?.data
      this.listPublishedFrameworks = pub?.data
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<template>
  <div class="publish-framework">
    <div class="published">
      <v-card min-height="378">
        <div class="published__header">
          <div class="published__header__info">
            <div class="published__header__info__title">
              Published Frameworks
            </div>
            <div
              :class="
                isGlobalParameterCompleted
                  ? 'published__header__info__subtitle__completed'
                  : 'published__header__info__subtitle'
              "
            >
              <v-btn outlined height="32" width="147" to="global-parameter">
                <v-icon size="20" class="mr-1">mdi-web</v-icon>
                Global Parameters
              </v-btn>
            </div>
          </div>
        </div>
        <framework-empty
          v-if="listPublishedFrameworks.length === 0"
          :isLoading="loading"
        ></framework-empty>
        <div v-else class="list-publish">
          <v-row>
            <v-col
              cols="6"
              v-for="(framework, index) in listPublishedFrameworks"
              :key="index"
            >
              <framework-item
                :framework="framework"
                @editFramework="editFramework"
              ></framework-item>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>

    <div class="unpublish-framework">
      <v-card min-height="378">
        <div class="unpublish__header">
          <div class="unpublish__header__info">
            <div class="unpublish__header__info__title">Unpublished</div>
            <div class="unpublish__header__info__subtitle">
              <v-select
                class="esg-input-grey-1 publish-framework__show-all-selector"
                :items="types"
                :item-text="'value'"
                :item-value="'id'"
                dense
                outlined
                v-model="typeShow"
                label="Show all"
                hide-details="auto"
                @input="initial = false"
              ></v-select>
            </div>
          </div>
        </div>
        <framework-empty
          v-if="listUnpublishedFrameworks.length === 0"
          :isLoading="loading"
        ></framework-empty>
        <div v-else class="list-publish">
          <v-row>
            <v-col
              cols="12"
              v-for="(framework, index) in listUnpublishedFrameworks"
              :key="index"
            >
              <framework-item
                class="item-unpublish"
                :framework="framework"
                @editFramework="editFramework"
              ></framework-item>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>

<style lang="scss">
.publish-framework {
  padding: 25px 20px;
  display: flex;
  justify-content: space-between;
  .published {
    width: calc(100% / 3 * 2 - 10px);
    .published__header {
      border-bottom: 1px solid #dfdfef;
    }
    .published__header__info {
      height: 64px;
      line-height: 64px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .published__header__info__title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #2c2c2e;
        width: 50%;
      }
      .published__header__info__subtitle {
        .v-btn--outlined {
          color: $blue-3 !important;
          border: thin solid #dfdfef;
          font-size: 12px !important;
        }
      }
      .published__header__info__subtitle__completed {
        .v-btn--outlined {
          color: $green-3 !important;
          border: thin solid #dfdfef;
          font-size: 12px !important;
          background-color: $green-1 !important;
        }
      }
    }
    .content-published {
      display: flex;
      justify-content: space-around;
      align-content: stretch;
      flex-direction: column;
      text-align: center;
      .no-result {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        color: #87879d;
      }
    }
    .list-publish {
      padding: 20px;
      max-height: calc(100vh - 74px - 50px - 64px);
      overflow: auto;
    }
  }

  .unpublish-framework {
    width: calc(100% / 3 - 10px);
    .unpublish__header {
      border-bottom: 1px solid #dfdfef;
    }
    .unpublish__header__info {
      height: 64px;
      line-height: 64px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      .unpublish__header__info__title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #2c2c2e;
        width: 50%;
      }
    }
    .list-publish {
      padding: 20px 20px 20px 20px;
      max-height: calc(100vh - 74px - 50px - 64px);
      overflow: auto;
    }
    .item-unpublish {
      margin-bottom: 20px;
    }
    .item-unpublish:last-child {
      margin-bottom: 0px;
    }
  }
  .v-card {
    border-radius: 8px !important;
    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(202, 202, 202, 0.5),
      0px 1px 4px rgba(218, 218, 224, 0.4) !important;
  }
  .v-text-field.v-text-field--enclosed {
    height: 64px;
    margin-top: 16px;
  }
  .v-input__control {
    width: 160px;
  }
  .v-select__slot {
    width: 160px !important;
  }
  fieldset {
    border: 1px solid #dfdfef;
    height: 32px;
    line-height: 32px;
  }
  .v-text-field--outlined.v-input--dense .v-label {
    top: 5px;
  }
  .v-select__slot {
    label {
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      color: #2c2c2e;
    }
    .v-input__append-inner {
      margin-top: 2px !important;
    }
  }
}

.publish-framework__show-all-selector {
  fieldset {
    border: 1px solid #dfdfef !important;
  }

  .mdi-menu-down {
    color: #aeaeb2 !important;
  }

  .v-label {
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 13px !important;
    line-height: 20px !important;
    color: #2c2c2e !important;
  }
}
</style>
