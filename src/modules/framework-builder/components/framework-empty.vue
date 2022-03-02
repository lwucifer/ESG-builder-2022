<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class EmptyPublishFramework extends Vue {
  @Prop({ default: false }) isLoading = false
}
</script>

<template>
  <div class="content-unpublish">
    <div>
      <img src="@/assets/svg/no-unpublish.svg" />
      <p class="no-result">No Framework here</p>
    </div>
    <div class="content-unpublish__overlay" v-if="isLoading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-unpublish {
  height: 314px;
  display: flex;
  justify-content: space-around;
  align-content: stretch;
  flex-direction: column;
  text-align: center;
  .content-unpublish__overlay {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    .v-progress-circular {
      top: 50%;
    }
  }
  .no-result {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #87879d;
  }
}
</style>
