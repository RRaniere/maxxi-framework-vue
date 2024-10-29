<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import SuccessWithLoader from '@/components/buttons/SuccessWithLoader.vue';
import MessageDisplay from '@/components/shared/MessageDisplay.vue'; 
import { useRegisterStore } from '@/stores/registerStore';
import { maskEmail } from '@/utils/helpers/mask-email';
import { requestEmailVerification } from '@/services/registerService'; 
import axios from 'axios';

const emit = defineEmits(['registrationSuccess']);

const baseUrl = `${import.meta.env.VITE_API_URL}`;
const registerStore = useRegisterStore();

const valid = ref(false);
const isLoading = ref(false);
const logform = ref();
const otp = ref('');
const errors = ref<{ error?: string }>({});
const infos = ref<{ info?: string }>({});
const resendTimer = ref(0);
const canResendCode = ref(true); 

const maskedEmail = maskEmail(registerStore.userData.email);

const isFormValid = computed(() => otp.value.length === 4 && /^[0-9]+$/.test(otp.value));

function clearMessages() {
  errors.value = {};
  infos.value = {};
}

async function submit() {
  clearMessages(); 

  const userData = { ...registerStore.userData, verification_code: otp.value };

  try {
    const response = await axios.post(`${baseUrl}/register`, userData);
    if (response.data.status) {
      emit('registrationSuccess');
    } else {
      handleError(response.data.message);
    }
  } catch (error) {
    handleError('Something went wrong, try again');
  }
}

function handleError(message: string) {
  errors.value = { error: message };
}

async function resendVerificationCode() {

  clearMessages(); 

  isLoading.value = true;

  try {
    const response = await requestEmailVerification({ email: registerStore.userData.email });
    if (response.status) {
      infos.value = { info: "We've just sent you a new email!" };
      startResendTimer(); 
    } else {
      handleError(response.message);
    }
  } catch (error: any) {
    handleError(error.message || 'Error when resending the verification code.');
  } finally {
    isLoading.value = false;
  }
}

function startResendTimer() {
  canResendCode.value = false;
  resendTimer.value = 30; 

  const interval = setInterval(() => {
    resendTimer.value -= 1; 
    if (resendTimer.value <= 0) {
      clearInterval(interval); 
      canResendCode.value = true; 
    }
  }, 1000); 
}

watch(otp, clearMessages);

</script>

<template>
  <v-row class="bg-surface position-relative" no-gutters>
    <v-container>
      <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
        <v-row justify="center">
          <v-col cols="12" lg="12" xl="8" md="10">
            <v-card-text class="pa-sm-9 pa-6 loginBox">
              <h3 class="text-h3 mb-2">Enter Verification Code</h3> 
              <p class="text-h6 text-lightText">We sent it to your email.</p>
              <p class="text-h6 my-6">We’ve sent you a code at {{maskedEmail}}</p>

              <v-form ref="logform" lazy-validation v-model="valid" class="mt-7 loginForm">
                <v-otp-input 
                  type="number" 
                  v-model="otp" 
                  length="4" 
                  class="mb-5" 
                  rounded="md" 
                  single-line 
                  height="46">
                </v-otp-input>

                <MessageDisplay class="mb-4"
                  :errorMessage="errors.error" 
                  :infoMessage="infos.info" 
                />
                <SuccessWithLoader 
                  color="primary" 
                  size="large" 
                  rounded="md" 
                  text="Verify Code"
                  :disabled="!isFormValid"      
                  textInLoading="Checking..." 
                  @loaded="submit()" 
                  block 
                />
              </v-form>

              <v-row class="mt-4 align-center">
                <v-col cols="8">
                  <div class="text-subtitle-1 font-weight-regular">You didn't get it?</div>
                </v-col>
                <v-col cols="4">
                  <v-btn
                    variant="text"
                    color="primary"
                    class="text-capitalize my-0 p-0"
                    :loading="isLoading"
                    :disabled="!canResendCode"
                    @click="resendVerificationCode"
                  >
                    <template v-if="!canResendCode">
                      Resend Code in {{ resendTimer }}s
                    </template>
                    <template v-else>
                      Resend Code
                    </template>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-row>
</template>


<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}

.loginForm {
  .v-otp-input {
    padding: 0;
    .v-otp-input__content {
      max-width: 100%;
      padding: 0;
    }
    .v-otp-input__field {
      font-size: 13px;
    }
  }
}
</style>
