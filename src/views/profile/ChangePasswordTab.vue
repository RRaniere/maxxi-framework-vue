<script setup lang="ts">
import { ref } from 'vue';

const textcpass = ref('textcmpass');
const textnpass = ref(' 2345');
const textcmpass = ref('12345');
</script>

<template>
  <div>
    <v-row class="mt-1">
      <v-col cols="12" lg="6">
        <v-label class="mb-2">Current Password</v-label>
        <v-text-field
          type="password"
          density="comfortable"
          single-line
          v-model="textcpass"
          placeholder="Enter Current Password"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="mt-3">
      <v-col cols="12" lg="6">
        <v-label class="mb-2">New Password</v-label>
        <v-text-field
          type="password"
          density="comfortable"
          single-line
          v-model="textnpass"
          placeholder="Enter New Password"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="6">
        <v-label class="mb-2">Confirm Password</v-label>
        <v-text-field
          type="password"
          density="comfortable"
          single-line
          v-model="textcmpass"
          placeholder="Enter Confirm Password"
          variant="outlined"
          hide-details
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-btn color="primary" variant="outlined" rounded="md" size="large" class="text-subtitle-1 mt-4">Change Password</v-btn>
  </div>
</template>
