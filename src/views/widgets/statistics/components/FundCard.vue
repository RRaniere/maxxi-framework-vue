<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import { useDisplay } from 'vuetify';
const { xlAndUp } = useDisplay();

const items = ref(['Today', 'Weekly', 'Monthly']);

const menulist = ref(['Active', 'Disable', 'Remove']);
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Add Fund</h5>
        <v-menu width="150">
          <template v-slot:activator="{ props }">
            <v-btn icon color="secondary" aria-label="menu" variant="text" rounded="md" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px; transform: rotate(90deg)" />
            </v-btn>
          </template>
          <v-list elevation="24" class="pa-3" aria-busy="true" aria-label="user content" rounded="md">
            <v-list-item density="compact" rounded="md" color="secondary" v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-text>
    <v-card-item class="pt-0 px-0">
      <div class="px-6">
        <div class="text-center">
          <p class="text-h6 mb-0">Amount</p>
          <h3 class="text-h3 mb-2">$100</h3>
          <ul class="d-flex align-center justify-center ga-2 flex-wrap mb-4" style="list-style-type: none">
            <li>
              <v-chip color="primary" value="tonal" rounded="md" size="small">$100</v-chip>
            </li>
            <li>
              <v-chip color="secondary200" variant="outlined" rounded="md" size="small">
                <span class="text-darkText">$150</span>
              </v-chip>
            </li>
            <li>
              <v-chip color="secondary200" variant="outlined" rounded="md" size="small">
                <span class="text-darkText">$200</span>
              </v-chip>
            </li>
            <li>
              <v-chip color="secondary200" variant="outlined" rounded="md" size="small">
                <span class="text-darkText">$250</span>
              </v-chip>
            </li>
          </ul>
        </div>
        <v-card variant="outlined" rounded="lg">
          <v-list rounded="lg" aria-busy="true" aria-label="user content">
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar :size="xlAndUp ? ' 52' : '40'" variant="outlined" color="surface">
                  <img src="@/assets/images/users/avatar-6.png" :width="xlAndUp ? ' 52' : '40'" alt="vector" />
                </v-avatar>
              </template>
              <h6 class="text-subtitle-1 mb-0">Able pro</h6>
              <span class="text-caption">@ableprodevelop</span>
              <template v-slot:append>
                <v-menu width="150">
                  <template v-slot:activator="{ props }">
                    <v-btn icon color="secondary" aria-label="menu" variant="text" rounded="md" size="small" v-bind="props">
                      <SvgSprite name="custom-chevron-up" style="width: 20px; height: 20px" />
                    </v-btn>
                  </template>
                  <v-list elevation="24" class="pa-3" rounded="md" aria-label="menu" aria-busy="true">
                    <v-list-item
                      density="compact"
                      rounded="md"
                      color="secondary"
                      v-for="(item, index) in menulist"
                      :key="index"
                      :value="index"
                    >
                      <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
        <v-btn color="primary" class="mt-4" rounded="md" block variant="flat">Confirm</v-btn>
      </div>
    </v-card-item>
  </v-card>
</template>
