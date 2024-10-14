<script setup lang="ts">
import { onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import 'vue3-carousel/dist/carousel.css';
import FloatingCart from '../cart/FloatingCart.vue';

const store = useEcomStore();

onMounted(() => {
  store.fetchProducts();
});

const getProducts = computed(() => {
  return store.products;
});
</script>

<template>
  <v-card variant="outlined" class="bg-surface overflow-hidden" rounded="lg">
    <v-card-item>
      <v-card-title class="text-subtitle-1 pa-0"> Related Products </v-card-title>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text class="pa-0">
      <perfect-scrollbar style="height: 265px">
        <v-list class="relatedCar py-0" aria-label="product list" aria-busy="true">
          <v-list-item v-for="(product, i) in getProducts" :value="product.name" class="py-2 pt-4" :key="i" border>
            <div class="d-flex">
              <v-avatar size="62" rounded="md" variant="outlined" color="borderLight" class="bg-containerBg">
                <img :src="product.image" alt="product" width="62" style="min-width: 62px" />
              </v-avatar>
              <div class="ms-3">
                <h5 class="text-subtitle-1 text-lightText mb-0">{{ product.name }}</h5>
                <p class="text-h6 text-lightText text-truncate mb-1">{{ product.description }}</p>
                <h5 class="text-h5 text-lightText mb-1">${{ product.salePrice }}</h5>
                <v-rating color="inputBorder" size="small" active-color="warning" half-increments :model-value="3.5" density="compact">
                </v-rating>
              </div>
            </div>

            <template v-slot:append>
              <v-btn icon variant="text" aria-label="wishlist" color="lightText" rounded="md">
                <SvgSprite name="custom-heart-outline" style="width: 20px; height: 20px" />
              </v-btn>
            </template>
          </v-list-item>
          <v-list-item class="pa-6">
            <v-btn color="secondary" rounded="md" variant="outlined" block>View all products</v-btn>
          </v-list-item>
        </v-list>
      </perfect-scrollbar>
    </v-card-text>
  </v-card>

  <FloatingCart />
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
