<script setup>
import { ref, onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { useRoute } from 'vue-router';
import ProductCarousel from './ProductCarousel.vue';

const store = useEcomStore();
const route = useRoute();
const setColor = ref(1);
onMounted(() => {
  store.fetchProducts();
});

const getProduct = computed(() => {
  const productId = Number(route.params.id);
  // Assuming product IDs start from 1
  return store.products.find((product) => product.id === productId);
});

function selectColor(e) {
  setColor.value = e;
}
</script>
<template>
  <div v-if="getProduct">
    <v-row>
      <v-col md="4" sm="12" cols="12">
        <ProductCarousel />
      </v-col>
      <v-col md="8" sm="12" cols="12">
        <div class="d-flex align-top">
          <div>
            <div class="text-medium-emphasis align-center d-flex mb-1 ga-2">
              <v-rating color="inputBorder" active-color="warning" half-increments v-model="getProduct.rating" density="compact">
              </v-rating>
              <small>({{ getProduct.rating }}+)</small>
            </div>
            <h3 class="text-h3 mb-3">{{ getProduct.name }} <v-chip color="info" variant="outlined" size="small"> New</v-chip></h3>
            <v-chip color="success" size="small" label v-if="getProduct.isStock"> In Stock </v-chip>
            <v-chip color="error" size="small" label v-else> Out of Stock </v-chip>
          </div>
        </div>
        <p class="v-col-lg-10 px-0 mb-0 text-h6 text-lightText">{{ getProduct.description }}</p>
        <v-row>
          <v-col lg="12" cols="12">
            <div class="productCustomize">
              <h6 class="text-h6 text-lightText">Colors</h6>
              <template v-for="(color, i) in getProduct.colors" :key="i">
                <v-avatar
                  @click="selectColor(i)"
                  :class="setColor == i ? 'avatar-border' : ''"
                  variant="flat"
                  :color="color"
                  size="x-small"
                  class="me-1 cursor-pointer"
                >
                </v-avatar>
              </template>
            </div>
            <div class="pt-6">
              <h6 class="text-h6 text-lightText mb-1">Quantity</h6>
              <v-btn-toggle variant="outlined" rounded="0" size="small" divided color="primary">
                <v-btn size="small" style="width: 260px">
                  {{ getProduct.qty }}
                </v-btn>
                <div style="width: 25px" class="qty-icons">
                  <v-btn
                    block
                    icon
                    color="secondary"
                    aria-label="add"
                    rounded="0"
                    class="py-1"
                    @click="store.incrementQty(getProduct, store.cart)"
                  >
                    <SvgSprite name="custom-plus" style="width: 18px; height: 18px" />
                  </v-btn>
                  <v-btn
                    block
                    icon
                    color="secondary"
                    aria-label="remove"
                    rounded="0"
                    class="py-1"
                    @click="store.decrementQty(getProduct.id)"
                  >
                    <SvgSprite name="custom-line" style="width: 18px; height: 18px" />
                  </v-btn>
                </div>
              </v-btn-toggle>
            </div>
            <div class="d-flex align-end ga-2 mb-3 mt-4">
              <h3 class="text-h3 mb-n1">${{ getProduct.salePrice }}</h3>
              <p class="text-decoration-line-through text-medium-emphasis mb-0">${{ getProduct.offerPrice }}</p>
              <small class="text-medium-emphasis">(Inclusive of all taxes)</small>
            </div>
          </v-col>
          <v-col lg="12">
            <div class="d-flex flex-wrap ga-4">
              <v-btn color="primary" size="large" rounded="md" variant="flat" to="/ecommerce/checkout" @click="store.AddToCart(getProduct)">
                <template v-slot:prepend>
                  <SvgSprite name="custom-shopping-cart" style="width: 18px; height: 18px" />
                </template>
                Buy Now
              </v-btn>
              <v-btn color="secondary" rounded="md" size="large" variant="outlined" @click="store.AddToCart(getProduct)">
                <template v-slot:prepend>
                  <SvgSprite name="custom-add-cart" style="width: 18px; height: 18px" />
                </template>
                Add To Cart
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<style lang="scss">
.avatar-border {
  border: 3px solid rgba(var(--v-theme-darkText), 0.2);
}
.productCustomize tr td {
  padding: 15px 20px;
  vertical-align: center;
}
.qty-icons {
  .v-btn {
    border: 1px solid rgb(var(--v-theme-borderLight));
    height: 24px !important;
  }
}
</style>
