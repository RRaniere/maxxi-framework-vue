<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <v-label class="text-caption mb-2">Have a Promo Code?</v-label>
      <div class="d-flex ga-4">
        <v-text-field
          single-line
          density="comfortable"
          hide-details
          variant="outlined"
          color="primary"
          placeholder="Enter promo code"
        ></v-text-field>
        <v-btn color="primary" rounded="md" variant="flat" style="height: 50px">Apply</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>
