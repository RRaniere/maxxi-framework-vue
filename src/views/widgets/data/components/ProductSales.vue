<script setup lang="ts">
import { shallowRef } from 'vue';

const products = shallowRef([
  {
    sales: '2136',
    name: 'HeadPhone',
    price: '926.23'
  },
  {
    sales: '2546',
    name: 'Iphone 6',
    price: '485.85'
  },
  {
    sales: '2681',
    name: 'Jacket',
    price: '786.4'
  },
  {
    sales: '2756',
    name: 'Head Phone',
    price: '563.45'
  },
  {
    sales: '8765',
    name: 'Sofa',
    price: '769.45'
  },
  {
    sales: '3652',
    name: 'Iphone X',
    price: '754.45'
  },
  {
    sales: '7456',
    name: 'Jacket',
    price: '743.23'
  },
  {
    sales: '6502',
    name: 'T-Shirt',
    price: '642.23'
  }
]);
</script>

<template>
  <div class="pa-4">
    <v-row>
      <v-col cols="12" sm="4" class="text-center pb-sm-3 pb-0">
        <span class="text-lightText text-subtitle-2">Earning</span>
        <h4 class="text-h4 mt-1 mb-0">20,569$</h4>
      </v-col>
      <v-col cols="12" sm="4" class="text-center pb-sm-3 pb-0">
        <span class="text-lightText text-subtitle-2">Yesterday</span>
        <h4 class="text-h4 mt-1 mb-0">580$</h4>
      </v-col>
      <v-col cols="12" sm="4" class="text-center">
        <span class="text-lightText text-subtitle-2">This Week</span>
        <h4 class="text-h4 mt-1 mb-0">5,789$</h4>
      </v-col>
    </v-row>
  </div>
  <v-divider></v-divider>
  <perfect-scrollbar v-bind:style="{ height: '312px' }">
    <v-table class="bordered-table" hover density="comfortable">
      <thead class="bg-containerBg">
        <tr>
          <th class="text-start ps-6 text-caption font-weight-bold text-uppercase">Last Sales</th>
          <th class="text-start text-caption font-weight-bold text-uppercase">Product Name</th>
          <th class="text-end pe-6 text-caption font-weight-bold text-uppercase">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.name">
          <td class="ps-6">{{ item.sales }}</td>
          <td>{{ item.name }}</td>
          <td class="text-end pe-6" style="min-width: 105px">$ {{ item.price }}</td>
        </tr>
      </tbody>
    </v-table>
  </perfect-scrollbar>
</template>
