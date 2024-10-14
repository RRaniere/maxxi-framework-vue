<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
</script>
<template>
  <v-card variant="outlined" class="bg-lightprimary" rounded="lg">
    <v-card-item class="text-center">
      <v-avatar variant="flat" rounded="md" color="primary">
        <SvgSprite name="custom-lock-outline-2" style="width: 20px; height: 20px" />
      </v-avatar>
      <h5 class="text-h5 mt-3 mb-1">Unlock All Features</h5>
      <p class="text-body-1 mb-2">Unlock All Features</p>
      <v-btn variant="flat" color="primary" rounded="md" block>Upgrade To Premium</v-btn>
    </v-card-item>
  </v-card>
</template>
