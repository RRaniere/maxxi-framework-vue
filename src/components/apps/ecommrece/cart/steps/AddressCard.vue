<script setup lang="ts">
const props = defineProps({
  name: String,
  destination: String,
  building: String,
  street: String,
  city: String,
  state: String,
  country: String,
  post: String,
  phone: String,
  isDefault: Boolean,
  showBtn: Boolean
});
</script>
<template>
  <v-card variant="outlined" rounded="lg">
    <v-card-text>
      <div class="d-flex align-center ga-2">
        <h6 class="text-subtitle-1 mb-0">{{ props.name }}</h6>
        <small class="text-lightText text-body-1">({{ props.destination }})</small>
      </div>
      <div class="mt-1 text-body1">
        <p class="text-body-2 text-lightText">
          {{ props.building }}, {{ props.street }}, {{ props.city }}, {{ props.state }}, {{ props.country }} - {{ props.post }}
        </p>
        <p class="text-caption text-lightText mb-0">{{ props.phone }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>
