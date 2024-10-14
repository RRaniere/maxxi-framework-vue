<script setup lang="ts">
// assets
import imageEmpty from '@/assets/images/e-commerce/empty.png';
</script>

<template>
  <v-card variant="outlined" class="bg-surface">
    <v-card-text>
      <v-row class="justify-center align-center">
        <v-col lg="6" cols="12" class="text-center">
          <v-img :src="imageEmpty" alt="cover" style="max-width: 450px" class="mx-auto" cover />
        </v-col>
        <v-col lg="6" cols="12">
          <h1 class="text-sm-h1 text-h2 mb-0 mt-4">There is no Product</h1>
          <p class="text-h5 text-lightText">Try checking your spelling or use more general terms</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
