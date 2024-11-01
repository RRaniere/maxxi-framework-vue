<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import EmailVerification from '@/views/profile/components/EmailVerification.vue';
import { requestEmailVerification } from '@/services/authentication/emailVerificationService';
import { requestTwoFaCredentials, enableTwoFa, disableTwoFa} from '@/services/profile/profileService';
import QrcodeVue from 'qrcode.vue';

const authStore = useAuthStore();

const isLoading = ref(false);
const dialog = ref(false);
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
            dialog.value = true;
        }
    } catch (error) {
    } finally {
        isLoading.value = false;
    }

}


async function handleRequestOption(otp:number) { 

    if(option.value === 'enable') { 
        handleRequestTwoFaCredentials(otp)
    }

    if(option.value === 'disable') { 
        handleDisableTwoFa(otp)
    }

}


async function handleRequestTwoFaCredentials(otp:number) {


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
} 

}


async function handleEnableTwoFa() {

isLoading.value = true;

try {
  const response = await enableTwoFa(twoFactorSecret.value);
  if (response.status) {
      showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
      dialog.value = false
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
      dialog.value = false
      emailSent.value = false
      dialog.value = false
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
<v-row>
      <v-col cols="12" md="10" lg="10"> 
    <div>
        <div class="text-h5"><SvgSprite name="custom-shield" class="v-icon--start" style="width: 25px; height: 25px"/>Manage 2FA Authentication</div>
        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Use applications like Google Authenticator to further secure your account and transactions.</span>
    </div>
    </v-col>
    <v-col cols="12" md="2" lg="2"> 
    <v-btn color="primary" block variant="flat" rounded="md" @click="handleRequestEmailVerification('enable')" :loading="isLoading" v-if="!authStore.user.user.two_factor_enabled">Enable</v-btn>
    <v-btn color="error" block variant="flat" rounded="md" @click="handleRequestEmailVerification('disable')" :loading="isLoading" v-if="authStore.user.user.two_factor_enabled">Disable</v-btn>
    </v-col>
</v-row>


<v-dialog v-model="dialog" max-width="500">
    <Form >
    <v-card>
      <v-card-item class="pa-5">
        <div class="text-h5"><SvgSprite name="custom-shield" class="v-icon--start" style="width: 25px; height: 25px"/>2FA Authentication</div>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text >
        <EmailVerification  @codeFilled="handleRequestOption" v-if="emailSent && !twoFactorQrCode"/>
        <v-row v-if="twoFactorQrCode != ''" class="d-flex justify-center">
            <v-col cols="12" md="9" lg="9" >
                <div class="text-h5"><SvgSprite name="custom-shield" class="v-icon--start" style="width: 25px; height: 25px"/>Enable 2FA Authenticator</div>
                <span class="text-subtitle-1 text-disabled font-weight-medium d-block">Scan this QR code in the Authenticator App.</span>
            </v-col>

            <v-col cols="12" md="3" lg="3" >
                <v-btn color="success" block variant="flat" rounded="md" @click="handleEnableTwoFa">Done</v-btn>
            </v-col>

            
            <v-col cols="12" class="mt-8">
            <div id="qr-code" class="d-flex justify-center">
                <qrcode-vue :value="twoFactorQrCode" :size="200" class="mb-6" :margin="1" /> 
            </div>
            </v-col>
            <v-col cols="8" class="">
                <v-text-field color="primary" label="Website" variant="outlined"
                    density="comfortable" single-line hide-details v-model="twoFactorSecret"
                    class="center-text">
                    <template v-slot:append-inner>
                        <v-btn variant="text" aria-label="copy" icon rounded="md"
                            @click="">
                            <SvgSprite name="custom-copy" class="text-lightText"
                                style="width: 20px; height: 20px" />
                        </v-btn>
                    </template>
                </v-text-field>
            </v-col>
            <v-col cols="12" class="text-center">
                <span class="text-subtitle-1 text-disabled font-weight-medium d-block">If you can't scan the QR code, please enter it manually in the app.</span>
            </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </Form>


</v-dialog>

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


