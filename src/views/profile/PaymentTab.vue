<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const textcardname = ref('Selena Litten');
const textcardnumber = ref('4012 8888 8888 1881');
const textdate = ref('10/22');

</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <v-label class="mb-2">BTC Adress</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textcardname"
          placeholder="Name on Card"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-label class="mb-2">USDT Address</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textcardnumber"
          placeholder="Enter Card Number"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" md="12">
        <v-label class="mb-2">ETH Address</v-label>
        <v-text-field
          type="text"
          color="primary"
          single-line
          density="comfortable"
          v-model="textdate"
          placeholder="Enter Expiry Date"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
    <div class="text-end mt-4">
      <v-divider />
      <v-btn
        color="primary"
        rounded="md"
        variant="flat"
        class="mt-4"
      >
        Continue
      </v-btn>
    </div>
  </div>
</template>
