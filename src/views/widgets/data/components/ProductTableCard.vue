<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import type { Header } from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import product1 from '@/assets/images/widget/img-prod-1.jpg';
import product2 from '@/assets/images/widget/img-prod-2.jpg';
import product3 from '@/assets/images/widget/img-prod-3.jpg';
import product4 from '@/assets/images/widget/img-prod-4.jpg';

const searchField = ref('name');
const searchValue = ref('');

const headers: Header[] = [
  { text: 'Products', value: 'name', sortable: true },
  { text: 'Status', value: 'status', sortable: true },
  { text: 'Price', value: 'price', sortable: true },
  { text: 'Sales', value: 'sales', sortable: true },
  { text: 'Rating', value: 'rating', sortable: true }
];
const items = ref([
  {
    name: 'Angel Keller',
    image: product1,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '56',
    sales: '6642',
    rating: '2',
    number: '11',
    rate: '16.8',
    status: 3
  },
  {
    name: 'Bertha Douglas',
    image: product2,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '32',
    sales: '1214',
    rating: '1',
    number: '22',
    rate: '9.6',
    status: 1
  },
  {
    name: 'Catherine Johnston',
    image: product3,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '65',
    sales: '3125',
    rating: '3.5',
    number: '65',
    rate: '19.5',
    status: 3
  },
  {
    name: 'Chris Harvey',
    image: product4,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '21',
    sales: '185',
    rating: '2',
    number: '88',
    rate: '-6.3',
    status: 3
  },
  {
    name: 'Eugenia Johnson',
    image: product3,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '61',
    sales: '402',
    rating: '2.5',
    number: '80',
    rate: '18.3',
    status: 2
  },
  {
    name: 'Ian Butler',
    image: product2,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '23',
    sales: '3163',
    rating: '1',
    number: '68',
    rate: '-6.9',
    status: 3
  },
  {
    name: 'Marian Schultz',
    image: product1,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '60',
    sales: '3627',
    rating: '5',
    number: '51',
    rate: '18',
    status: 2
  },
  {
    name: 'Millie Alvarado',
    image: product2,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '19',
    sales: '3074',
    rating: '2.5',
    number: '59',
    rate: '-5.7',
    status: 3
  },
  {
    name: 'Millie Bennett',
    image: product1,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '60',
    sales: '8220',
    rating: '0.5',
    number: '59',
    rate: '18',
    status: 3
  },
  {
    name: 'Walter Richardson',
    image: product1,
    mail: 'Leather panels. Laces. Rounded toe.',
    price: '34',
    sales: '1571',
    rating: '1',
    number: '98',
    rate: '10.2',
    status: 2
  }
]);

const themeColor = ref('rgb(var(--v-theme-primary))');

const Menuitems = ref(['Today', 'Weekly', 'Monthly']);
const Menuitems1 = ref(['Products', 'Status', 'Price', 'Sales', 'Rating']);
</script>
<template>
  <v-card variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Products</h5>
        <div style="min-width: 130px; width: 130px">
          <label for="autocomplete-input" class="hidden-label">Choose an option:</label>
          <v-autocomplete
            id="autocomplete-input"
            model-value="Today"
            :items="Menuitems"
            color="primary"
            variant="outlined"
            hide-details
            density="compact"
          ></v-autocomplete>
        </div>
      </div>
    </v-card-text>
    <v-card-item class="pa-0">
      <v-row justify="space-between" class="align-center mb-2 px-6">
        <v-col cols="12" xl="3" md="5" sm="5">
          <v-text-field
            type="text"
            variant="outlined"
            density="comfortable"
            persistent-placeholder
            placeholder="Search 5 records..."
            v-model="searchValue"
            hide-details
          >
            <template v-slot:prepend-inner>
              <div class="text-lightText d-flex align-center">
                <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
              </div>
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" xl="3" md="4" sm="4">
          <div class="d-flex ga-2 justify-end">
            <v-autocomplete
              id="autocomplete-input"
              model-value="Sales"
              :items="Menuitems1"
              color="primary"
              variant="outlined"
              hide-details
              density="compact"
            ></v-autocomplete>
          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <EasyDataTable
        buttons-pagination
        :headers="headers"
        :items="items"
        table-class-name="customize-table product-table border-0"
        :theme-color="themeColor"
        :search-field="searchField"
        :search-value="searchValue"
        :rows-per-page="4"
      >
        <template #item-name="{ name, image, mail }">
          <div class="player-wrapper d-flex align-center">
            <v-avatar size="52" rounded="md">
              <img :src="image" width="52" alt="profile" />
            </v-avatar>
            <div class="ms-2">
              <h5 class="text-subtitle-1 mb-0">{{ name }}</h5>
              <p class="text-h6 text-lightText mb-0">{{ mail }}</p>
            </div>
          </div>
        </template>
        <template #item-status="{ status }">
          <v-chip color="success" variant="flat" rounded="md" label v-if="status === 1" size="small"> Active </v-chip>
          <v-chip color="warning" variant="flat" rounded="md" label v-if="status === 2" size="small"> Pending </v-chip>
          <v-chip color="error" variant="flat" rounded="md" label v-if="status === 3" size="small"> Close </v-chip>
        </template>
        <template #item-price="{ price }">
          <h6 class="text-subtitle-1 mb-0">${{ price }}</h6>
        </template>
        <template #item-sales="{ sales, rate }">
          <h6 class="text-subtitle-1 mb-0">
            {{ sales }}
            <span v-if="rate >= 0" class="text-success text-caption">
              +{{ rate }}
              <SvgSprite name="custom-rise-outline" style="width: 12px; height: 12px" />
            </span>
            <span v-else class="text-error text-caption">
              {{ rate }}
              <SvgSprite name="custom-fall-outline" style="width: 12px; height: 12px; transform: rotate(90deg)" />
            </span>
          </h6>
        </template>
        <template #item-rating="{ rating, number }">
          <div class="d-flex align-center">
            <SvgSprite name="custom-rating-star-fill" class="text-warning" style="width: 18px; height: 18px" />
            <span class="text-subtitle-1 px-1">{{ rating }}</span>
            <span class="text-body-1 text-lightText">({{ number }})</span>
          </div>
        </template>
      </EasyDataTable>
    </v-card-item>
  </v-card>
</template>
