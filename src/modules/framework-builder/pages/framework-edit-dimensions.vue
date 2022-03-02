<template>
  <div class="framework-edit-dimension">
    <div class="framework-edit-dimension__left">
      <div class="dimension-presets">
        <p class="title">Dimension Presets</p>
        <dimension-preset-card
          v-for="(item, index) in presets"
          :key="index"
          :item="item"
          @add="addCard(index)"
        />
      </div>
    </div>
    <div
      class="framework-edit-dimension__right"
      v-if="dimensionList.length > 0"
    >
      <p class="title">Framework Dimensions</p>
      <div class="framework-dimensions">
        <draggable
          :list="dimensionList"
          :disabled="false"
          class="list-group"
          ghost-class="ghost"
          :move="checkMove"
          @start="dragging = true"
          @end="dragging = false"
          :animation="200"
        >
          <dimension-card
            v-for="(item, index) in dimensionList"
            :key="index"
            :index="index"
            :item="item"
            @delete="deleteCard(index, item)"
            @change="updateCard(index, item)"
          />
        </draggable>
      </div>
      <dimension-actions
        @add="newCard"
        @save="save"
        @next="next"
        :disabled="disableSubmit"
      />
    </div>

    <dimension-no-item @add="newCard" v-else />

    <dimension-modal-delete
      :visible="modalDelete"
      @close="modalDelete = false"
      @ok="deleteConfirm"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import DimensionModalDelete from '@/modules/framework-builder/components/framework-edit-dimensions/dimension-modal-delete.vue'
import DimensionPresetCard from '@/modules/framework-builder/components/framework-edit-dimensions/dimension-preset-card.vue'
import DimensionCard from '@/modules/framework-builder/components/framework-edit-dimensions/dimension-card.vue'
import DimensionActions from '@/modules/framework-builder/components/framework-edit-dimensions/dimension-actions.vue'
import DimensionNoItem from '@/modules/framework-builder/components/framework-edit-dimensions/dimension-no-item.vue'
import DimensionService from '../services/dimension.service'
import { Dimension, NodeData } from '@/types/common'
import { Routes } from '@/router'

// const fakeVersionFrameworkId = '123e4567-e89b-12d3-a456-426614174000'
@Component({
  components: {
    draggable,
    DimensionModalDelete,
    DimensionPresetCard,
    DimensionCard,
    DimensionActions,
    DimensionNoItem
  }
})
export default class EditFrameworkDimensions extends Vue {
  loading = false
  dragging = false
  modalDelete = false
  isUpdate = false
  currentDelete: Dimension = {
    id: '',
    icon: '',
    color: '',
    new: 0,
    code: '',
    name: ''
  }
  currentDeleteIndex: number | null = null
  presets: Dimension[] = [
    {
      id: 1,
      icon: 'mdi-leaf',
      color: 'green',
      new: 0,
      code: 'ENV',
      name: 'Environment'
    },
    {
      id: 2,
      icon: 'mdi-earth',
      color: 'yellow',
      new: 0,
      name: 'Social Capital',
      code: 'SCO'
    },
    {
      id: 3,
      icon: 'mdi-users',
      color: 'red',
      new: 0,
      name: 'Human Capital',
      code: 'HUM'
    },
    {
      id: 4,
      icon: 'mdi-building',
      color: 'pink',
      new: 0,
      name: 'Business Model & Innovation',
      code: 'BUS'
    },
    {
      id: 5,
      icon: 'mdi-leadership',
      color: 'seaGreen',
      new: 0,
      name: 'Leadership & Governance',
      code: 'LED'
    },
    {
      id: 6,
      icon: 'mdi-earth',
      color: 'blue',
      new: 0,
      name: 'Universal',
      code: 'UNI'
    },
    {
      id: 7,
      icon: 'mdi-activity',
      color: 'grey1',
      new: 0,
      name: 'Activity Metrics',
      code: 'ACM'
    }
  ]
  dimensionList: Dimension[] = []
  nodeList: NodeData[] = []
  frameworkId = this.$route.query.version

  @Watch('dimensionList', { deep: true, immediate: true })
  updateDimensionList(): void {
    this.isUpdate = true
  }

  get currentVersionId() {
    return this.frameworkId as string
  }

  get disableSubmit() {
    for (let i = 0; i < this.dimensionList.length; i++) {
      if (
        !this.dimensionList[i]?.code ||
        !this.dimensionList[i]?.name ||
        !this.dimensionList[i]?.icon ||
        !this.dimensionList[i]?.color
      ) {
        return false
      }
    }

    return true
  }
  async created() {
    this.getDimensionPresets()
    this.getDimensionList()
  }

  async getDimensionList() {
    try {
      this.loading = true
      const res = await DimensionService.getDimensionList(this.currentVersionId)
      console.log('getDimensionList-->', res)
      this.nodeList = res.data
      this.nodeList.map((el) => this.dimensionList.push(el.metaData))
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }

  async getDimensionPresets() {
    try {
      this.loading = true
      const res = await DimensionService.getDimensionPresets()
      console.log('getDimensionPresets-->', res)
      this.presets = res.data
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }

  deleteCard(index: number, item: Dimension) {
    this.currentDelete = item
    this.currentDeleteIndex = index
    this.modalDelete = true
  }

  updateCard(index: number, item: Dimension) {
    this.dimensionList[index] = item
    console.log('dimensionList', this.dimensionList)
  }

  async deleteConfirm() {
    if (!this.currentDelete?.new) {
      for (let i = 0; i < this.presets.length; i++) {
        if (this.currentDelete?.id === this.presets[i]?.id) {
          this.presets[i] = { ...this.presets[i], hide: false } as Dimension
          break
        }
      }
    }
    if (this.currentDelete?.id) {
      await DimensionService.deleteDimension(
        this.currentVersionId,
        this.currentDelete?.id
      )
    }
    this.dimensionList.splice(this.currentDeleteIndex as number, 1)
    this.modalDelete = false
  }

  async next() {
    if (this.isUpdate) {
      try {
        this.loading = true
        await DimensionService.saveDimensions(
          this.dimensionList,
          this.currentVersionId
        )
        this.isUpdate = false
        this.$showSnack('Save dimensions successfully!')
        this.$router.push({
          name: Routes.editFrameworkStructure.name,
          query: {
            id: this.$route.query.id,
            version: this.currentVersionId
          }
        })
      } catch (error) {
        this.$showSnack(error, true)
      } finally {
        this.loading = false
      }
    } else {
      this.$router.push({
        name: Routes.editFrameworkStructure.name,
        query: {
          id: this.$route.query.id,
          version: this.currentVersionId
        }
      })
    }
  }

  async save() {
    const createList = this.dimensionList.filter((el) => el.id === '')
    const updateList = this.dimensionList.filter((el) => el.id !== '')
    if (!this.isUpdate) return
    try {
      this.loading = true
      await DimensionService.saveDimensions(createList, this.currentVersionId)
      await DimensionService.updateDimensions(updateList, this.currentVersionId)
      this.isUpdate = false
      this.$showSnack('Save dimensions successfully!')
    } catch (error) {
      this.$showSnack(error, true)
    } finally {
      this.loading = false
    }
  }

  addCard(index: number) {
    this.presets[index].id = ''
    this.dimensionList.push(this.presets[index])
    this.presets[index] = { ...this.presets[index], hide: true } as Dimension
  }

  newCard() {
    const newDimension: Dimension = {
      icon: '',
      color: 'grey1',
      new: 1,
      name: '',
      code: ''
    }
    this.dimensionList.push(newDimension)
  }

  checkMove() {
    console.log('dimensionList after drag: ' + this.dimensionList)
  }
}
</script>

<style lang="scss">
.framework-edit-dimension {
  height: 100%;
  .title {
    font-size: 16px !important;
    color: #3c3c3c;
  }
  .title-select {
    font-size: 20px !important;
    color: #3c3c3c;
    font-weight: 500;
    line-height: 28px;
  }
  .v-btn.light {
    color: #2b61f5;
    background-color: #fff;
    box-shadow: none;
    border: 1px solid #d4e4fe;
  }
  .ml-auto {
    margin-left: auto;
  }
  background-color: $background-color;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  &__right {
    width: 50%;
    height: 100%;
    max-height: 100%;
    background-color: #fff;
    overflow-y: hidden;
    padding-top: 50px;
    position: relative;
    display: flex;
    flex-flow: column;
    .framework-dimensions {
      padding: 0 65px 45px;
      height: 100%;
      max-height: 100%;
      overflow-y: auto;
    }
    .title {
      text-align: center;
    }
  }
  &__left {
    width: 50%;
    padding: 60px 65px;
    height: 100%;
    .dimension-presets {
      padding: 24px 28px;
      background-color: #fff;
      border-radius: 8px;
      border-bottom: 1px solid #dfdfef;
      box-shadow: 0px 2px 4px rgba(202, 202, 202, 0.5),
        0px 1px 4px rgba(218, 218, 224, 0.4);
    }
  }
}
</style>
