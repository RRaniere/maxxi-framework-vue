<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import paypal from '@/assets/images/widget/img-paypal.png';
import gpay from '@/assets/images/widget/img-gpay.png';
import phonePay from '@/assets/images/widget/img-phonepay.png';

const menulist = ref(['Name', 'Date', 'Rating', 'Unread']);

const historyData = shallowRef([
  {
    title: 'Paypal',
    avatar: paypal,
    subcontent: '+2,10,000',
    price: '$210,000',
    percentage: '+30.6',
    color: 'success'
  },
  {
    title: 'Gpay',
    avatar: gpay,
    subcontent: '-2000',
    price: '$210,000',
    percentage: '- 30.6',
    color: 'error'
  },
  {
    title: 'Phone Pay',
    avatar: phonePay,
    subcontent: '-2000',
    price: '$210,000',
    percentage: '-30.6',
    color: 'error'
  }
]);
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Payment History</h5>
        <v-btn color="secondary" aria-label="add" variant="text" icon rounded="md" size="small">
          <SvgSprite name="custom-plus" style="width: 20px; height: 20px" />
        </v-btn>
      </div>
    </v-card-text>
    <v-card-item class="pa-0">
      <v-list border rounded="lg" class="py-0 border-0" aria-label="history" aria-busy="true">
        <v-list-item class="py-2 px-6" v-for="(item, i) in historyData" :key="i">
          <template v-slot:prepend>
            <v-avatar size="40" variant="text" rounded="md">
              <img :src="item.avatar" width="24" alt="Julia" />
            </v-avatar>
          </template>
          <span class="text-body-1 mb-0">{{ item.title }}</span>
          <h6 class="text-subtitle-1">
            {{ item.subcontent }}
            <span :class="'text-caption text-' + item.color">{{ item.percentage }}%</span>
          </h6>
          <template v-slot:append>
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
          </template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="pa-6">
        <v-btn color="secondary" variant="outlined" rounded="md" block>View all</v-btn>
      </div>
    </v-card-item>
  </v-card>
</template>
