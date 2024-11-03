<script setup lang="ts">

import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { requestEmailVerification } from '@/services/authentication/emailVerificationService';
import EmailVerification from '@/views/profile/components/EmailVerification.vue';
import { requestTwoFaCredentials, enableTwoFa, disableTwoFa} from '@/services/profile/profileService';
import QrcodeVue from 'qrcode.vue';
import ManageTwoFa from '@/views/profile/components/ManageTwoFa.vue';
import ManagePasskeys from './components/ManagePasskeys.vue';

const authStore = useAuthStore();

// UI state references
const isLoading = ref(false);
const emailSent = ref(false);
const option = ref('');
const twoFactorQrCode = ref('');
const twoFactorSecret = ref('');
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
const snackbarIcon = ref('');

async function handleRequestEmailVerification(optionParam:string) {

  option.value = optionParam;
  isLoading.value = true;

  try {
    const response = await requestEmailVerification();
    if (response.status) {
      emailSent.value = true;
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }

}

async function handleRequestOption(otp:number) { 

  if(option.value == 'enable-two-factor') { 
    handleRequestTwoFaCredentials(otp)
  }

  if(option.value == 'disable-two-factor') { 
    handleDisableTwoFa(otp)
  }

}

async function handleRequestTwoFaCredentials(otp:number) {

  isLoading.value = true;

  try {
    const response = await requestTwoFaCredentials(otp);
    if (response.status) {
      twoFactorQrCode.value = response.qr_code_url;
      twoFactorSecret.value = response.secret;
    }

    if (!response.status) {
      showSnackbar('error', response.message, "$closeCircle");
    }

  } catch (error) {
  } finally {
    isLoading.value = false;
  }

}

async function handleEnableTwoFa() {

  isLoading.value = true;

  try {
    const response = await enableTwoFa(twoFactorSecret.value);
    if (response.status) {
        showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
        emailSent.value = false
        twoFactorQrCode.value = '';
        twoFactorSecret.value = '';

        authStore.updateTwoFa(true);
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }

}


async function handleDisableTwoFa(otp:number) {

  isLoading.value = true;


  try {
    const response = await disableTwoFa(otp);
    if (response.status) {
        showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
        emailSent.value = false
        twoFactorQrCode.value = '';
        twoFactorSecret.value = '';
        authStore.updateTwoFa(false);
    }

    if (!response.status) {
      showSnackbar('error', response.message, "$closeCircle");
    }
  } catch (error) {
  } finally {
    isLoading.value = false;
  }

}

function showSnackbar(color: string, message: string, icon:string) {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  snackbar.value = true;
  snackbarIcon.value = icon
}


</script>

<template>
  <v-row v-if="!emailSent">
    
      <v-col cols="12">
        <ManageTwoFa />
      </v-col>
      <v-col cols="12">
        <ManagePasskeys />
      </v-col>


  </v-row>

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

<style>
.center-text input {
    text-align: center;
}
</style>