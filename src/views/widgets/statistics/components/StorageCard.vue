<script setup lang="ts">
import { useCustomizerStore } from '@/stores/customizer';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const customizer = useCustomizerStore();
</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-card
        elevation="0"
        :color="customizer.actTheme === 'dark' ? 'surface' : 'darkText'"
        class="storageCard overflow-hidden"
        rounded="lg"
      >
        <v-card-item>
          <div class="d-flex justify-space-between">
            <div class="storageContent">
              <h5 class="text-h5 mb-2">Dropbox Storage</h5>
              <v-avatar variant="tonal" rounded="md" color="white">
                <SvgSprite name="custom-cloud-outline" style="width: 20px; height: 20px" />
              </v-avatar>
              <span class="text-caption d-block pt-4 pb-2">1,342GB of 150GB Users</span>
              <div class="d-flex">
                <v-progress-linear aria-label="progressbar" color="error" height="6" model-value="100" rounded></v-progress-linear>
                <v-progress-linear aria-label="progressbar" color="warning" height="6" model-value="100" rounded></v-progress-linear>
                <v-progress-linear aria-label="progressbar" color="secondary" height="6" model-value="100" rounded></v-progress-linear>
                <v-progress-linear aria-label="progressbar" color="info" height="6" model-value="100" rounded></v-progress-linear>
              </div>
            </div>
            <h4 class="text-h4">150GB</h4>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card elevation="0" color="primary" rounded="lg">
        <v-card-item>
          <v-list class="py-0 bg-primary" aria-label="balance" aria-busy="true">
            <v-list-item class="pa-0">
              <p class="text-body-1 mb-0">Available Balance</p>
              <h4 class="text-h4 mb-0">$1,234.90</h4>
              <template v-slot:append>
                <v-avatar variant="tonal" color="white" size="large" rounded="md">
                  <SvgSprite name="custom-bidirectional" class="text-white" style="width: 28px; height: 28px" />
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.storageCard {
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    background-image: url(@/assets/images/analytics/img-dropbox-bg.svg);
    background-position: bottom right;
    background-size: 100%;
    background-repeat: no-repeat;
    bottom: 0;
    opacity: 0.5;
  }
}
.storageContent {
  flex: 1;
}
</style>
