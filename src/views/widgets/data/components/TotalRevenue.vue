<script setup lang="ts">
import { shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const revenues = shallowRef([
  {
    name: 'Bitcoin',
    price: 145.58
  },
  {
    name: 'Ethereum',
    price: 6.368
  },
  {
    name: 'Ripple',
    price: 458.63
  },
  {
    name: 'Neo',
    price: 5.631
  },
  {
    name: 'Ethereum',
    price: 6.368
  },
  {
    name: 'Ripple',
    price: 458.63
  },
  {
    name: 'Neo',
    price: 5.631
  },
  {
    name: 'Ethereum',
    price: 6.368
  },
  {
    name: 'Ripple',
    price: 458.63
  },
  {
    name: 'Neo',
    price: 5.631
  }
]);
</script>

<template>
  <perfect-scrollbar v-bind:style="{ height: '335px' }">
    <v-list class="py-0" aria-label="revenue list" aria-busy="true" border>
      <v-list-item v-for="(revenue, i) in revenues" class="px-6" :key="i" :value="revenue" color="primary">
        <template v-slot:prepend>
          <SvgSprite
            name="custom-chevron-up-fill"
            class="me-12 text-success"
            v-if="revenue.price > 145"
            style="width: 20px; height: 20px"
          />
          <SvgSprite name="custom-chevron-down" class="me-12 text-error" style="width: 20px; height: 20px" v-else />
        </template>
        <div class="d-inline-flex align-center justify-space-between w-100">
          <h6 class="text-h6 mb-0">{{ revenue.name }}</h6>
          <div class="ms-auto text-subtitle-1 text-success" v-if="revenue.price > 145">+ ${{ revenue.price }}</div>
          <div class="ms-auto text-subtitle-1 text-error" v-else>- ${{ revenue.price }}</div>
        </div>
      </v-list-item>
    </v-list>
  </perfect-scrollbar>
</template>
