<script setup lang="ts">
import { ref } from 'vue';

const textblock = ref('16657');
const textaname = ref(' Dardan Ranch');
const textstreet1 = ref('Nathaniel Ports');
const textstreet2 = ref('nr. Oran Walks');
const textpostcode = ref('395005');

const city = ref(['Los Angeles', 'Chicago', 'Phoenix', 'San Antonoi']);
const country = ref(['India', 'France', 'USA', 'UAE']);

const textcity = ref<string>('Los Angeles');
const textcountry = ref<string>('Los Angeles');

const checkbox = ref(true);
</script>

<template>
  <div>
    <v-row class="mt-1">
      <v-col cols="12" md="6">
        <v-label class="mb-2">Block No#</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textblock"
          placeholder="Enter Block No#"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="mb-2">Apartment Name</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textaname"
          placeholder="Enter Apartment Name"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="mb-2">Street Line 1</v-label>
        <v-text-field
          type="email"
          color="primary"
          single-line
          density="comfortable"
          v-model="textstreet1"
          placeholder="Enter Street Line 1"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="mb-2">Street Line 2</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textstreet2"
          placeholder="Enter Street Line 2"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2">Post code</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textpostcode"
          placeholder="Enter Postcode"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2">City</v-label>
        <v-select
          color="primary"
          :items="city"
          role="link"
          single-line
          density="comfortable"
          placeholder="Select city"
          variant="outlined"
          v-model="textcity"
          hide-details
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-label class="mb-2">Country</v-label>
        <v-select
          color="primary"
          :items="country"
          role="link"
          single-line
          density="comfortable"
          placeholder="Select Country"
          variant="outlined"
          v-model="textcountry"
          hide-details
        >
        </v-select>
      </v-col>
      <v-col cols="12">
        <v-checkbox v-model="checkbox" color="primary" density="compact" label="Same as billing address"></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>
