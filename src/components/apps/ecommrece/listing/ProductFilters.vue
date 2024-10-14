<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import ColorsOptions from './colorsOption';
import { useEcomStore } from '@/stores/apps/eCommerce';

const range = shallowRef([0, 300]);

const store = useEcomStore();

const selectedGender = ref('');
store.SelectGender(selectedGender);

const selectedCategory = ref('all');
store.SelectCategory(selectedCategory);

const selectRating = ref(0);
const setColor = ref(1);

function selectColor(e: number) {
  setColor.value = e;
}
</script>
<template>
  <v-list lines="one" aria-label="gender list" aria-busy="true">
    <v-list-item-title class="text-h5">Gender</v-list-item-title>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Male" v-model="selectedGender" color="primary" value="male" hide-details> </v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Female" v-model="selectedGender" color="secondary" value="female" hide-details></v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0">
      <v-checkbox label="Kids" v-model="selectedGender" color="error" value="kids" hide-details></v-checkbox>
    </v-list-item>
  </v-list>
  <v-list lines="one" class="mb-3" aria-label="categories list" aria-busy="true">
    <v-list-item-title class="text-h5">Categories</v-list-item-title>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="All" v-model="selectedCategory" color="primary" value="all" hide-details> </v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Electronics" v-model="selectedCategory" color="primary" value="electronics" hide-details></v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Fashion" v-model="selectedCategory" color="primary" value="fashion" hide-details></v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Books" v-model="selectedCategory" color="primary" value="books" hide-details></v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Toys" v-model="selectedCategory" color="primary" value="toys" hide-details></v-checkbox>
    </v-list-item>
    <v-list-item class="pa-0 mb-n2">
      <v-checkbox label="Kitchen" v-model="selectedCategory" color="primary" value="kitchen" hide-details></v-checkbox>
    </v-list-item>
  </v-list>
  <div class="mb-3">
    <h5 class="text-h5 mb-0">Colors</h5>
    <div class="d-flex ga-2 flex-wrap v-col-11 px-0">
      <template v-for="(catcolor, i) in ColorsOptions" :key="i">
        <v-avatar
          class="cursor-pointer"
          :class="setColor == i ? 'avatar-border' : ''"
          :color="catcolor.value"
          variant="flat"
          size="small"
          @click="selectColor(i)"
        >
        </v-avatar>
      </template>
    </div>
  </div>
  <div class="mb-3">
    <h5 class="text-h5">Price</h5>
    <v-row>
      <v-col cols="6">
        <v-label class="mb-2 text-lightText">Min</v-label>
        <v-text-field v-model="range[0]" aria-label="min" hide-details single-line type="number" variant="outlined"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-label class="mb-2 text-lightText">Max</v-label>
        <v-text-field v-model="range[1]" aria-label="max" hide-details single-line type="number" variant="outlined"></v-text-field>
      </v-col>
    </v-row>
    <div aria-label="Select a value within the range of 0 to 1000">
      <v-range-slider
        v-model="range"
        color="primary"
        thumb-size="16"
        track-color="secondary200"
        track-size="4"
        tick-size="4"
        :max="1000"
        :min="0"
        :step="1"
        hide-details
        class="mt-2"
      ></v-range-slider>
    </div>
  </div>
  <div>
    <h5 class="text-h5 mb-0">Rating</h5>
    <div class="d-flex align-center">
      <v-rating
        hover
        half-increments
        v-model="selectRating"
        class="ma-2"
        density="compact"
        color="inputBorder"
        active-color="warning"
      ></v-rating>
      <pre class="mb-0 text-h6">({{ selectRating }})</pre>
    </div>
  </div>
  <v-btn color="primary" rounded="md" variant="text" block class="mt-5">Reset all filters</v-btn>
</template>
<style lang="scss">
.avatar-border {
  border: 3px solid rgba(var(--v-theme-darkText), 0.2);
}
.custom-accordion {
  padding: 18px 2px;

  min-height: 30px !important;
  .v-expansion-panel-title__overlay {
    background-color: transparent;
  }
}
.acco-body {
  .v-expansion-panel-text__wrapper {
    padding: 5px 0;
  }
}
.custom-radio-box {
  .v-selection-control-group {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .v-selection-control {
    flex: 50%;
  }
}
</style>
