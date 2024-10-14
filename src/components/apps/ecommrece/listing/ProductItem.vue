<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
const props = defineProps({
  name: String,
  image: String,
  desc: String,
  rating: Number,
  salePrice: Number,
  offerPrice: Number,
  goto: Number || String || Object || Array
});
const emit = defineEmits(['handlecart', 'handlewishlist']);
const successsnackbar = ref(false);
const isInWishlist = ref(false);
const successsnackbar2 = ref(false);
const rate = ref(props.rating);

function toggleWishlist() {
  isInWishlist.value = !isInWishlist.value;
  emit('handlewishlist', isInWishlist.value);
  successsnackbar2.value = true;
}
</script>

<template>
  <v-card variant="outlined" rounded="lg" class="white bg-surface overflow-hidden">
    <router-link :to="`/ecommerce/product/detail/${goto}`">
      <img alt="product" :src="image" class="w-100" />
    </router-link>
    <v-btn icon color="secondary" aria-label="wishlist" variant="text" class="wishlist-icon" rounded="md" @click="toggleWishlist">
      <SvgSprite
        :name="isInWishlist ? 'custom-heart-fill' : 'custom-heart-outline'"
        :class="isInWishlist ? 'text-error' : 'text-lightText'"
        style="width: 18px; height: 18px"
      />
    </v-btn>
    <v-divider></v-divider>
    <v-card-item class="pb-2 px-4 pt-3">
      <v-card-title class="text-h5">{{ name }}</v-card-title>
      <p class="text-lightText mb-3 text-h6 descriptionH">{{ desc }}</p>
    </v-card-item>

    <v-card-text>
      <div class="d-flex align-end ga-2 justify-space-between flex-wrap">
        <div>
          <div class="d-flex align-center">
            <h4 class="text-h5 mb-0">${{ salePrice }}</h4>
            <p class="text-decoration-line-through text-lightText text-h6 mb-0 ms-2">${{ offerPrice }}</p>
          </div>
          <div class="text-medium-emphasis align-center d-flex ga-2">
            <v-rating color="inputBorder" active-color="warning" half-increments size="small" v-model="rate" density="compact"> </v-rating>
            <small>({{ rating }}+)</small>
          </div>
        </div>
        <v-btn
          icon
          rounded="md"
          color="primary"
          aria-label="cart"
          variant="flat"
          size="small"
          @click="$emit('handlecart', (successsnackbar = true))"
        >
          <SvgSprite name="custom-shopping-cart" style="width: 18px; height: 18px" />
        </v-btn>
      </div>
    </v-card-text>
    <v-snackbar
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
      v-model="successsnackbar"
    >
      <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
      Add To cart success
    </v-snackbar>
    <v-snackbar
      variant="flat"
      location="top right"
      min-width="100"
      color="success"
      rounded="md"
      class="text-surface"
      v-model="successsnackbar2"
    >
      <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
      {{ isInWishlist ? 'Added to favourites' : 'Removed from favourites' }}
    </v-snackbar>
  </v-card>
</template>
<style>
.descriptionH {
  height: 40px;
  overflow: hidden;
}
.wishlist-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
}
</style>
