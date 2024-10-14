<script setup lang="ts">
import completed from '@/assets/images/e-commerce/completed.png';
</script>

<template>
  <v-card>
    <v-card-item class="py-8 text-center">
      <img :src="completed" alt="Thankyou" class="my-6 thank-you-image" />
      <h1 class="text-md-h1 text-h3">Thank you for Purchase!</h1>
      <p class="text-h6 text-lightText mt-3 mb-0">We will send a process notification, before it delivered.</p>
      <p class="text-h6 text-lightText">
        Your order id: <span class="text-subtitle-1 text-primary">841da56c-c650-563b-a7bc-d0ee99ad3a32</span>
      </p>
      <h5 class="text-h5 mt-8 mb-8">(219) 404-5468</h5>
      <div class="d-flex align-center justify-center ga-4 mt-5 mb-5">
        <v-btn color="secondary" variant="outlined" to="/ecommerce/products">Continue Shopping</v-btn>
        <v-btn color="primary" variant="flat">Download Invoice</v-btn>
      </div>
    </v-card-item>
  </v-card>
</template>
<style lang="scss">
.thank-you-image {
  width: 500px;
  @media (max-width: 767px) {
    width: 350px;
  }
}
</style>
