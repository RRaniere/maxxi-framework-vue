<script setup lang="ts">
import { ref, computed } from 'vue';
import SuccessWithLoader from '@/components/buttons/SuccessWithLoader.vue';
import { useRegisterStore } from '@/stores/registerStore'; // Importe sua store
import { maskEmail } from '@/utils/helpers/mask-email';
import { requestEmailVerification } from '@/services/registerService'; // Importe o serviço para reenviar o código
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

const resendTimer = ref(0); // Tempo restante para reenviar o código
const canResendCode = ref(true); // Flag para habilitar/desabilitar o botão de reenvio

// Máscara de email para exibição
const maskedEmail = maskEmail(registerStore.userData.email);

// Validação do formulário
const isFormValid = computed(() => {
  return otp.value.length === 4 && /^[0-9]+$/.test(otp.value);
});

// Função para envio do formulário com o código de verificação
async function submit() {
  const userData = {
    username: registerStore.userData.username,
    email: registerStore.userData.email,
    password: registerStore.userData.password,
    sponsor: registerStore.userData.sponsor,
    firstname: registerStore.userData.firstname,
    lastname: registerStore.userData.lastname,
    verification_code: otp.value
  };

  try {
    const response = await axios.post(`${baseUrl}/register`, userData);
    if (response.data.status) {
      emit('registrationSuccess');
    } else {
      errors.value = { error: response.data.message };
    }
  } catch (error) {
    console.error(error);
  }
}

// Função para reenviar o código de verificação
async function resendVerificationCode() {

  isLoading.value = true;

  try {
    const userData = {
      email: registerStore.userData.email,
    };
    const response = await requestEmailVerification(userData);
    if (response.status) {
      infos.value = { info: "We've just sent you a new email!" };
      startResendTimer(); // Iniciar o contador de 30 segundos
    } else {
      throw new Error(response.message);
    }
  } catch (error: any) {
    errors.value = { error: error.message || 'Error when resending the verification code.' };
  }

  isLoading.value = false;

}

// Função que inicia o temporizador de 30 segundos para habilitar o botão novamente
function startResendTimer() {
  canResendCode.value = false; // Desabilitar o botão
  resendTimer.value = 30; // Definir o tempo inicial (30 segundos)

  const interval = setInterval(() => {
    resendTimer.value -= 1; // Reduzir o contador a cada segundo
    if (resendTimer.value <= 0) {
      clearInterval(interval); // Parar o temporizador quando chegar a 0
      canResendCode.value = true; // Habilitar o botão novamente
    }
  }, 1000); // Executa a cada segundo
}
</script>

<template>
  <v-row class="bg-surface position-relative" no-gutters>
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" lg="12" xl="8" md="10">
              <v-card-text class="pa-sm-9 pa-6 loginBox">
                <h3 class="text-h3 mb-2">Enter Verification Code</h3> 
                <p class="text-h6 text-lightText">We send you on mail.</p>
                <p class="text-h6 my-6">We’ve send you code on {{maskedEmail}}</p>
                <v-form ref="logform" lazy-validation v-model="valid" class="mt-7 loginForm">
                    <v-otp-input type="number" v-model="otp" length="4" class="mb-5" rounded="md" single-line height="46"></v-otp-input>
                    <div v-if="errors.error" class="mt-2 mb-5">
                      <v-alert color="error">{{ errors.error }}</v-alert>
                    </div>
                    <div v-if="infos.info" class="mt-2 mb-5">
                      <v-alert color="success">{{ infos.info }}</v-alert>
                    </div>
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
                  <v-col cols="8" >
                    <div class="text-subtitle-1 font-weight-regular">You didn't get it?</div>
                  </v-col>
                  <v-col cols="4" >
                    <v-btn
                      variant="text"
                      color="primary"
                      class="text-capitalize my-0 p-0"
                      :loading = isLoading
                      :disabled="!canResendCode"
                      @click="resendVerificationCode"
                    >
                      <!-- Mostrar o contador se o botão estiver desabilitado -->
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
