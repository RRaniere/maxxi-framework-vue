<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

// table data
const revenueData = ref([
  {
    name: 'Steven Goodwin',
    icon: 'custom-star-outline',
    plan: 'free',
    price: '$55'
  },
  {
    name: 'Rena Nunez',
    icon: 'custom-star-outline',
    plan: 'premium',
    price: '-$2'
  },
  {
    name: 'Hilda Hale',
    icon: 'custom-fall-down-outline',
    plan: 'free',
    price: '$83'
  },
  {
    name: 'Gussie Gonzales',
    icon: 'custom-star-outline',
    plan: 'free',
    price: '$89'
  },
  {
    name: 'Louise Byrd',
    icon: 'custom-fall-down-outline',
    plan: 'team',
    price: '-$20'
  }
]);
</script>
<template>
  <v-card variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Monthly Revenue</h5>
        <v-menu width="150">
          <template v-slot:activator="{ props }">
            <v-btn icon color="secondary" aria-label="menu" variant="text" rounded="md" size="small" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px; transform: rotate(90deg)" />
            </v-btn>
          </template>
          <v-list elevation="24" class="pa-3" rounded="md" aria-label="menu" aria-busy="true">
            <v-list-item density="compact" rounded="md" color="secondary" v-for="(item, index) in menulist" :key="index" :value="index">
              <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-text>
    <v-card-item class="px-0 pb-0">
      <div class="px-6 pb-6">
        <h5 class="text-h5 mb-0">
          $746.5k
          <span class="text-success text-caption">
            +20.6
            <SvgSprite name="custom-rise-outline" style="width: 12px; height: 12px; vertical-align: -1px" />
          </span>
        </h5>
        <p class="text-body-1 text-lightText mb-0">Past 30 days</p>
      </div>
      <v-divider></v-divider>
      <v-table class="bordered-table" hover>
        <thead class="bg-containerBg">
          <tr>
            <th class="text-start text-uppercase text-caption font-weight-bold py-0 ps-6" style="height: 51px">Customer</th>
            <th class="text-start text-uppercase text-caption font-weight-bold py-0" style="height: 51px">Plan</th>
            <th class="text-end text-uppercase text-caption font-weight-bold py-0 pe-6" style="height: 51px">MRP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in revenueData" :key="item.name" class="text-lighttext">
            <td class="text-subtitle-1 font-weight-regular py-4 ps-6" style="min-width: 200px">
              <v-avatar size="32" color="containerBg" variant="flat" rounded="md" class="me-2">
                <SvgSprite :name="item.icon || ''" class="text-lightText" style="width: 18px; height: 18px" />
              </v-avatar>
              {{ item.name }}
            </td>
            <td>
              <v-chip color="info" variant="tonal" rounded="md" label v-if="item.plan === 'free'" size="small"> Free </v-chip>
              <v-chip color="success" variant="tonal" rounded="md" label v-if="item.plan === 'premium'" size="small"> Premium </v-chip>
              <v-chip color="error" variant="tonal" rounded="md" label v-if="item.plan === 'team'" size="small"> Team </v-chip>
            </td>
            <td class="text-subtitle-1 text-end pe-6">
              <span class="text-error" v-if="item.price.startsWith('-')">{{ item.price }}</span>
              <span v-else>{{ item.price }}</span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
  </v-card>
</template>
