<script setup>
import { ref, shallowRef, onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import ProductItemVue from './ProductItem.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import { orderBy } from 'lodash';
import { useDisplay } from 'vuetify';
import ProductEmplty from './ProductEmplty.vue';
import ProductFilters from './ProductFilters.vue';
import FloatingCart from '../cart/FloatingCart.vue';

const store = useEcomStore();

onMounted(() => {
  store.fetchProducts();
});

const getProducts = computed(() => {
  return store.products;
});

const sortbyname = shallowRef(['Price:High to Low', 'Price:Low to High', 'Popularity', 'Fresh Arrivals']);
const selected = ref('Price:Low to High');
const searchValue = ref('');
const sDrawer = ref(false);

const getVisibleProduct = (products, sortBy, search, gender, category) => {
  // SORT BY
  if (sortBy === 'Popularity') {
    products = orderBy(products, ['rating'], ['desc']);
  }
  if (sortBy === 'Price:High to Low') {
    products = orderBy(products, ['salePrice'], ['desc']);
  }
  if (sortBy === 'Price:Low to High') {
    products = orderBy(products, ['salePrice'], ['asc']);
  }
  if (sortBy === 'Fresh Arrivals') {
    products = orderBy(products, ['created'], ['asc']);
  }
  if (gender) {
    products = products.filter((product) => {
      return product.gender.includes(gender);
    });
  }
  if (category !== 'all') {
    products = products.filter((product) => {
      return product.categories.includes(category);
    });
  }
  if (search) {
    products = products.filter((product) => {
      return product.name.toLowerCase().includes(search.value.toLowerCase());
    });
  }

  return products;
};

const filteredProducts = computed(() => {
  return getVisibleProduct(getProducts.value, selected.value, searchValue, store.gender, store.category);
});
const toggleSide = ref(false);
const { lgAndUp } = useDisplay();
const handleToggle = () => {
  toggleSide.value = !toggleSide.value;
};
const handleMobileDrawer = () => {
  sDrawer.value = !sDrawer.value;
};

function AddCart(p) {
  store.AddToCart(p);
}
</script>

<template>
  <v-row>
    <v-col v-if="!toggleSide && lgAndUp" class="filterSidebar">
      <v-card variant="outlined" class="bg-surface" rounded="lg">
        <v-card-item class="py-3">
          <v-card-title class="text-subtitle-1">Filter</v-card-title>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text class="pa-5"> <ProductFilters /> </v-card-text>
      </v-card>
    </v-col>
    <v-col cols>
      <v-card variant="outlined" class="bg-surface mb-6" rounded="lg">
        <v-card-item>
          <div class="d-flex ga-2 align-center">
            <v-btn variant="text" rounded="md" color="dark" @Click="!lgAndUp ? handleMobileDrawer() : handleToggle()">
              <SvgSprite name="custom-filter" class="me-1 text-secondary" style="width: 18px; height: 18px" />
              Filter</v-btn
            >
            <v-text-field
              variant="outlined"
              v-model="searchValue"
              persistent-placeholder
              density="comfortable"
              placeholder="Search Product"
              hide-details
              color="primary"
              style="max-width: 250px"
            >
              <template v-slot:prepend-inner>
                <SvgSprite name="custom-search" class="text-lightText" style="width: 18px; height: 18px" />
              </template>
            </v-text-field>
            <div v-if="lgAndUp" class="ms-auto">
              <v-select
                :items="sortbyname"
                role="link"
                color="primary"
                variant="outlined"
                hide-details
                density="comfortable"
                v-model="selected"
              ></v-select>
            </div>
          </div>
        </v-card-item>
      </v-card>
      <v-row v-if="filteredProducts.length >= 1">
        <v-col :xl="toggleSide ? '3' : '4'" :lg="toggleSide ? '3' : '6'" md="3" v-for="product in filteredProducts" :key="product.id">
          <ProductItemVue
            :name="product.name"
            :image="product.image"
            :desc="product.description"
            :salePrice="product.salePrice"
            :offerPrice="product.offerPrice"
            :rating="product.rating"
            :goto="product.id"
            @handlecart="AddCart(product)"
          />
        </v-col>
      </v-row>
      <ProductEmplty v-else />
    </v-col>
  </v-row>
  <v-navigation-drawer temporary location="left" v-model="sDrawer" width="300" top v-if="!lgAndUp">
    <v-card-text class="pa-5">
      <ProductFilters />
    </v-card-text>
  </v-navigation-drawer>
  <FloatingCart />
</template>
<style>
.filterSidebar {
  max-width: 350px;
}
</style>
