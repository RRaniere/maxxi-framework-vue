<script setup lang="ts">
import { onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import { useEcomStore } from '@/stores/apps/eCommerce';

const store = useEcomStore();
onMounted(() => {
  store.getsubTotal();
  store.getTotal();
  store.getDiscount();
});

const getCart = computed(() => {
  return store.cart;
});
</script>
<template>
  <v-card variant="outlined" class="my-6 bg-surface" rounded="lg">
    <h6 class="text-subtitle-1 pa-4 mb-0">Order Summary</h6>
    <v-divider></v-divider>
    <v-list class="relatedCar py-0" aria-label="order list" aria-busy="true">
      <v-list-item v-for="(item, i) in getCart" :value="i" :key="i" class="py-3" border>
        <div class="d-flex align-center">
          <v-avatar size="50" variant="outlined" color="borderLight" rounded class="bg-containerBg">
            <img :src="item.image" alt="product" width="50" style="min-width: 50px" />
          </v-avatar>
          <div class="ms-3">
            <h5 class="text-subtitle-1 mb-1">{{ item.name }}</h5>
            <h5 class="text-body-1 text-lightText mb-0">${{ item.salePrice }}</h5>
          </div>
        </div>

        <template v-slot:append>
          <v-btn icon variant="text" aria-label="delete" rounded="md">
            <SvgSprite name="custom-trash" class="text-lightText" style="width: 18px; height: 18px; opacity: 0.5" />
          </v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-table density="compact" class="py-1">
      <tbody>
        <tr>
          <td class="text-h6 border-0">Sub Total</td>
          <td class="text-end text-subtitle-1 border-0">${{ store.subTotal }}</td>
        </tr>
        <tr>
          <td class="text-h6 border-0">Coupon Discount 5%</td>
          <td class="text-end text-body-1 border-0">- ${{ store.discount }}</td>
        </tr>
        <tr>
          <td class="text-h6 border-0">Shipping Charges</td>
          <td class="text-end text-body-1 border-0">-</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
  <v-card variant="outlined" rounded="lg">
    <v-table class="py-2">
      <tbody>
        <tr>
          <td class="text-subtitle-1">Total</td>
          <td class="text-end text-subtitle-1">${{ store.total }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
<style lang="scss">
.relatedCar {
  .v-list-item {
    .v-list-item__append {
      align-self: flex-start;
    }
    .text-truncate {
      white-space: unset !important;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
