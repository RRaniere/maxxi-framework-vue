<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { maskEmail } from '@/utils/helpers/mask-email';
import { requestEmailVerification } from '@/services/authentication/emailVerificationService'; 


const emit = defineEmits(['codeFilled']);
const authStore = useAuthStore();

const isLoading = ref(false);
const logform = ref();
const otp = ref('');
const resendTimer = ref(0);
const canResendCode = ref(true); 

const maskedEmail = maskEmail(authStore.user.user.email);

const isFormValid = computed(() => otp.value.length === 4 && /^[0-9]+$/.test(otp.value));

async function submit() {
  emit('codeFilled', otp.value);
}


async function resendVerificationCode() {
  isLoading.value = true;

  try {
    const response = await requestEmailVerification();
    if (response.status) {
      startResendTimer(); 
    }
  } catch (error: any) {
    console.log(error)
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

watch(otp, () => {
  if (isFormValid.value) {
    submit();
  }
});

</script>

<template>
  <v-row justify="center">
    <v-col cols="12" lg="12" xl="12" md="12">
      <h3 class="text-h3 mb-2">Enter Verification Code</h3> 
      <p class="text-h6 text-lightText">We sent it to your email.</p>
      <p class="text-h6 my-6">We’ve sent you a code at {{maskedEmail}}</p>
      <v-form ref="logform" lazy-validation>
        <v-otp-input 
          type="number" 
          v-model="otp" 
          length="4" 
          class="mb-5" 
          rounded="md" 
          single-line 
          height="80">
        </v-otp-input>
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
    </v-col>
  </v-row>
</template>
