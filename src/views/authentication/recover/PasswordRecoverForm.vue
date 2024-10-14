<script setup lang="ts">
import { ref } from 'vue';
import { requestRecover } from '@/services/passwordRecover'; 
import SuccessWithLoader from '@/components/buttons/SuccessWithLoader.vue';

const valid = ref(false);
const emailSent = ref(false); // Estado para controlar se o email foi enviado
const isLoading = ref(false);
const isLoaded = ref(false);
const logform = ref();
const username = ref('');
const usernameRules = ref([(v: string) => !!v || 'Username is required']);

// Função para validar o formulário e enviar a solicitação
async function validate() {
  logform.value.validate();

  if (valid.value) {
    const response = await requestRecover(username.value);

    if (response.status === true) {
      emailSent.value = true; // Exibe a mensagem de confirmação
    }
  }

}

function loaded() {
  isLoading.value = false;
  isLoaded.value = true;
}
</script>

<template>
  <div v-if="!isLoaded" class="pa-sm-10 pa-4 loginBox">
    <!-- Exibe o formulário se o e-mail ainda não foi enviado -->
      <div class="d-flex justify-space-between align-center">
        <h3 class="text-h3 text-center mb-0">Forgot Password</h3>
        <router-link to="/login" class="text-primary text-decoration-none">Back to Login</router-link>
      </div>
      <v-form ref="logform" lazy-validation v-model="valid" @submit.prevent="validate" class="mt-7 loginForm">
        <v-label>Username</v-label>
        <v-text-field
          v-model="username"
          :rules="usernameRules"
          placeholder="Username"
          class="mt-2 mb-6"
          required
          density="comfortable"
          hide-details="auto"
          variant="outlined"
          color="primary"
        ></v-text-field>

        <h6 class="text-caption">Do not forget to check your SPAM box.</h6>

        <!-- Botão com carregamento -->
        <SuccessWithLoader 
          color="primary" 
          size="large" 
          rounded="md" 
          text="Send Password Reset Email"
          textInLoading="Sending..." 
          :disabled="!valid"      
          @loading="validate" 
          @loaded="loaded"
          block 
        />
      </v-form>
    </div>

    <div v-else-if="emailSent && isLoaded">
      <div class="d-flex align-center justify-center">
            <v-row justify="center">
            <v-col cols="12">
                <div class="pa-sm-9 pa-6 loginBox">
                <h3 class="text-h3">All set!</h3>
                <p class="text-h6 mt-4"> 
                  If an account exists for this username, a password reset email has been sent. 
                </p>
                <h6 class="text-caption mt-4">Do not forget to check your SPAM box.</h6>
                <v-btn color="primary" block class="mt-2" variant="flat" rounded="md" size="large" :to="{ path: '/login' }">Login</v-btn>
                </div>
            </v-col>
            </v-row>
        </div>
    </div>
</template>

<style scoped>
/* Adicione seus estilos aqui, se necessário */
</style>
