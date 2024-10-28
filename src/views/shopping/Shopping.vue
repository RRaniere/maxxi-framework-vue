<script setup lang="ts">

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PageLoader from '@/components/shared/PageLoader.vue';
import {shallowRef, ref, onMounted} from 'vue';
import {fetchProducts, createInvoice} from '@/services/shopping/shoppingService';
import { useRouter } from 'vue-router';

const page = ref({ title: 'Shopping' });
const breadcrumbs = shallowRef([{ title: 'Shopping', disabled: true, href: '#' }]);

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  is_recurring: boolean;
}

const products = shallowRef<Product[]>([]);
const router = useRouter();
const loading = ref<boolean[]>([]);
const pageLoader = ref(true)


onMounted(async () => {
  try {
    const response = await fetchProducts();
    products.value = response.products; 
    loading.value = Array(products.value.length).fill(false);

  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
  }
  pageLoader.value = false
});

async function buyNow(productId : number, index : number) {

    loading.value[index] = true;

    try {
        const response = await createInvoice(productId);

        if (response.status === true) {
            router.push({ name: 'Invoice'});
        } else {
        console.error('Erro ao criar a invoice');
        }
    } catch (error) {
        console.error('Erro ao processar a compra:', error);
    }

    loading.value[index] = false;

}

</script>

<template>
  
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <PageLoader v-if="pageLoader" />
  
    
  <v-row class="align-center" v-if="!pageLoader">
    <v-col cols="12" md="4" sm="6" v-for="(product, index) in products" v-bind:key="index">
      <v-card elevation="0">
        <v-card variant="outlined" class="text-center">
          <v-card-text class="pt-6">
            <div class="pa-6 rounded-md bg-lightprimary" >
              <!-- <v-chip variant="flat" size="small" v-if="plan.active" class="mb-6" color="success" rounded="md">Popular</v-chip> -->
              <h1 class="mb-0 text-h3 pb-5">{{ product.name }}</h1>
                <p class="pb-5 text-h2 mb-0"><span>$ </span>{{ Math.floor(product.price) }}</p>
              <span class="text-h5 text-lightText">Lifetime</span>
              <v-btn
                variant="flat"
                color="primary"
                class="mt-6 mb-3"
                rounded="md"
                block
                :loading="loading[index]"
                @click="buyNow(product.product_id, index)"
                >Buy Now</v-btn
              >
            </div>
            <v-list class="PricingList mt-5" aria-label="price list" aria-busy="true">
              <v-list-item  
                border
                class="px-0 text-disabled"
                density="compact"
              >
              <v-row>
                <v-col cols="3" class="text-end">
                    <SvgSprite name="custom-square-check-outline" class="text-success me-2" style="width: 20px; height: 20px" />
                </v-col>
                <v-col cols="9" class="text-start">
                    5.00% Direct Bonus
                </v-col>
              </v-row>
              </v-list-item>
              <v-list-item  
                border
                class="px-0 text-disabled"
                density="compact"
              >
              <v-row>
                <v-col cols="3" class="text-end">
                    <SvgSprite name="custom-square-check-outline" class="text-success me-2" style="width: 20px; height: 20px" />
                </v-col>
                <v-col cols="9" class="text-start">
                    5.00% Binary Bonus
                </v-col>
              </v-row>
              </v-list-item>
              <v-list-item  
                border
                class="px-0 text-disabled"
                density="compact"
              >
              <v-row>
                <v-col cols="3" class="text-end">
                    <SvgSprite name="custom-square-check-outline" class="text-success me-2" style="width: 20px; height: 20px" />
                </v-col>
                <v-col cols="9" class="text-start">
                    $1000 Binary Max Daily Gain
                </v-col>
              </v-row>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>

<style>
.loader-container {
  height: 50vh; 
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>