<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <v-list class="py-0" aria-label="profile" aria-busy="true">
        <v-list-item class="pa-0">
          <template v-slot:prepend>
            <v-avatar variant="tonal" color="error" rounded="md">
              <SvgSprite name="custom-google-outline" style="width: 20px; height: 20px" />
            </v-avatar>
          </template>
          <p class="text-body-1 mb-0">Google LLC</p>
          <h6 class="text-subtitle-1 mb-0">Sr. UI designer</h6>
          <template v-slot:append>
            <v-btn color="secondary" aria-label="copy" variant="text" rounded="md" icon size="small">
              <SvgSprite name="custom-copied-outline" style="width: 20px; height: 20px" />
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-item>
      <h6 class="text-subtitle-1">Description</h6>
      <p class="text-body-1 mb-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley.
      </p>
      <ul class="d-flex align-center ga-2" style="list-style-type: none">
        <li>
          <v-chip color="inputBorder" variant="tonal" border="inputBorder solid thin opacity-100" rounded="lg">
            <span class="text-darkText text-caption">Fulltime</span>
          </v-chip>
        </li>
        <li>
          <v-chip color="inputBorder" variant="tonal" border="inputBorder solid thin opacity-100" rounded="lg">
            <span class="text-darkText text-caption">Remote</span>
          </v-chip>
        </li>
        <li>
          <v-chip color="inputBorder" variant="tonal" border="inputBorder solid thin opacity-100" rounded="lg">
            <span class="text-darkText text-caption">Hourly</span>
          </v-chip>
        </li>
      </ul>
      <div class="d-flex justify-space-between">
        <v-list class="d-flex align-center py-0 flex-wrap" aria-label="list" aria-busy="true" density="compact">
          <v-list-item class="text-body-1 pa-0">
            <template v-slot:prepend>
              <SvgSprite name="custom-navigation-outline" class="me-1" style="width: 14px; height: 14px" />
            </template>
            NY, USA
          </v-list-item>
          <v-list-item class="text-body-1 py-0 pe-0">
            <template v-slot:prepend>
              <SvgSprite name="custom-clock-outline" class="me-1" style="width: 14px; height: 14px" />
            </template>
            2 Days ago
          </v-list-item>
        </v-list>
        <v-btn color="primary" variant="flat" rounded="md"> Apply </v-btn>
      </div>
    </v-card-item>
  </v-card>
</template>
