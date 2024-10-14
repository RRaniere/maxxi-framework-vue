<script setup lang="ts">
import { computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import { useEcomStore } from '@/stores/apps/eCommerce';

const store = useEcomStore();
const getCart = computed(() => {
  return store.cart;
});
</script>
<template>
  <v-btn color="warning" variant="tonal" large class="cartBtn" to="/ecommerce/checkout">
    <v-badge color="error" :content="getCart?.length" offset-x="-5" offset-y="-5">
      <SvgSprite name="custom-shopping-cart-bulk" style="width: 24px; height: 24px" />
    </v-badge>
  </v-btn>
</template>
<style lang="scss">
.cartBtn.v-btn {
  height: 52px;
  position: fixed;
  right: -2px;
  top: 70%;
  z-index: 9;
  border-radius: 50%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background: rgb(var(--v-theme-surface));
  box-shadow: var(--v-card-shadow);
  [dir='rtl'] & {
    right: unset;
    left: -2px;
    border-radius: 50%;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  &.v-btn--variant-tonal {
    .v-btn__underlay {
      opacity: 0;
    }
  }
}
</style>
