<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// UI state references
const isLoading = ref(false);
const emailSent = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
const snackbarIcon = ref('');


function showSnackbar(color: string, message: string, icon:string) {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  snackbar.value = true;
  snackbarIcon.value = icon
}


async function submit() {
  isLoading.value = true;


}
</script>

<template>
  <v-form>
    <v-row>
      <v-col cols="12" lg="6">
        <v-label class="mb-2">Current Password</v-label>
        <v-text-field
          type="password"
          density="comfortable"
          single-line
          v-model="password"
          placeholder="Enter Current Password"
          variant="outlined"
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
          v-model="newPassword"
          placeholder="Enter New Password"
          variant="outlined"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" lg="6">
        <v-label class="mb-2">Confirm Password</v-label>
        <v-text-field
          type="password"
          density="comfortable"
          single-line
          v-model="confirmNewPassword"
          placeholder="Enter Confirm Password"
          variant="outlined"
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
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="submit"
        >
          Continue
        </v-btn>
      </div>
  </v-form>
</template>
