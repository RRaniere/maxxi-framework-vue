<script setup lang="ts">
import SvgSprite from '@/components/shared/SvgSprite.vue';

// assets
import imageEmpty from '@/assets/images/e-commerce/empty.png';
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <v-row class="justify-center align-center text-lg-start text-center pt-16 pb-6">
        <v-col lg="6" md="8" cols="8" class="text-center">
          <v-img :src="imageEmpty" alt="cover" width="70%" class="mx-auto" />
        </v-col>
        <v-col lg="6" md="8" cols="12">
          <h1 class="text-lg-h1 text-h3 mb-1">Add items to your cart</h1>
          <p class="text-h5 text-lightText">Explore around to add items in your shopping bag.</p>
          <v-btn class="mt-3" to="/ecommerce/products" rounded="md" variant="flat" size="large" color="primary">
            Explore your bag
            <template v-slot:append>
              <SvgSprite name="custom-chevron-outline" style="width: 18px; height: 18px" />
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
