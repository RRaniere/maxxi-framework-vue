<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { requestEmailVerification } from '@/services/authentication/emailVerificationService';
import EmailVerification from '@/views/profile/components/EmailVerification.vue';
import { updateFinancialData } from '@/services/profile/profileService';

const authStore = useAuthStore();

const btcAddress = ref(authStore.user.user.btc_address);
const usdtAddress = ref(authStore.user.user.usdt_address);
const ethAddress = ref(authStore.user.user.eth_address);

// UI state references
const isLoading = ref(false);
const emailSent = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
const snackbarIcon = ref('');

const isFormValid = computed(() => {
  const hasChanges = btcAddress.value != authStore.user.user.btc_address || usdtAddress.value != authStore.user.user.usdt_address || ethAddress.value != authStore.user.user.eth_address
  return hasChanges;
});


function showSnackbar(color: string, message: string, icon:string) {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  snackbar.value = true;
  snackbarIcon.value = icon
}

async function submit() {
  isLoading.value = true;

  try {
    const response = await requestEmailVerification();
    if (response.status) {
      emailSent.value = true;
    }
  } catch (error) {
    showSnackbar('error', 'Failed to send verification email', "$closeCircle");
  } finally {
    isLoading.value = false;
  }
}

async function handleUpdateFinancialData(otp: number) { 

  const data = { 
    btcAddress : btcAddress.value,
    usdtAddress : usdtAddress.value,
    ethAddress : ethAddress.value,

  }

  const response = await updateFinancialData(data, otp);

  if (response.status) {
    showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
    authStore.updateFinancialData({
      btcAddress : btcAddress.value,
      usdtAddress : usdtAddress.value,
      ethAddress : ethAddress.value,
    });
    emailSent.value = false;
  } else {
    showSnackbar('error', response.message, "$closeCircle");
  }

}




</script>

<template>

    <v-form v-if="!emailSent">
      <v-row>
        <v-col cols="12" md="12">
          <v-label class="mb-2">BTC Address</v-label>
          <v-text-field
            type="text"
            color="primary"
            single-line
            density="comfortable"
            v-model="btcAddress"
            placeholder="BTC Address"
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
            v-model="usdtAddress"
            placeholder="USDT Address"
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
            v-model="ethAddress"
            placeholder="ETH Address"
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
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="submit"
        >
          Continue
        </v-btn>
      </div>
  </v-form>

  <EmailVerification v-if="emailSent" @codeFilled="handleUpdateFinancialData" />
  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    :timeout="3000"
    rounded="md"
    variant="flat"
    location="top right"
    min-width="300"
  >
    <v-icon class="me-1" size="small" :icon="snackbarIcon" />
    {{ snackbarMessage }}
  </v-snackbar>

</template>
