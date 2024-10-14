<script setup lang="ts">
import { ref } from 'vue';
import ProductDescription from './ProductDescription.vue';
import ProductReview from './ProductReview.vue';
import ProductSpecification from './ProductSpecification.vue';

const tab = ref(null);
</script>

<template>
  <v-tabs v-model="tab" color="primary" class="border-bottom">
    <v-tab value="one">Features</v-tab>
    <v-tab value="two">Specifications</v-tab>
    <v-tab value="three">Overview</v-tab>
    <v-tab value="four">Review <v-chip color="secondary" size="small" class="ms-1">275</v-chip></v-tab>
  </v-tabs>
  <div class="mt-5">
    <v-window v-model="tab" class="mx-n6 px-6">
      <v-window-item value="one">
        <ProductDescription />
      </v-window-item>
      <v-window-item value="two">
        <ProductSpecification />
      </v-window-item>
      <v-window-item value="three">
        <p class="text-h6 text-lightText">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text
          ever since the 1500s, <b>“When an unknown printer took a galley of type and scrambled it to make a type specimen book.”</b> It has
          survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
          popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
          publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        <p class="text-h6 text-lightText mb-0">
          It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
          desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
      </v-window-item>
      <v-window-item value="four">
        <ProductReview />
      </v-window-item>
    </v-window>
  </div>
</template>
