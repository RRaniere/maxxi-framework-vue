<script setup lang="ts">
import { ref } from 'vue'; // Importa 'ref' para declarar estados reativos
import Logo from '@/layouts/dashboard/logo/LogoMain.vue';
import RegisterForm from './RegisterForm.vue';
import RegisterSuccess from './RegisterSuccess.vue';
import RegisterEmailVerification from './RegisterEmailVerification.vue';

import leftImg from '@/assets/images/auth/img-auth-sideimg.png';

const emailRequested = ref(false);
const registrationSuccess = ref(false);

// Método para alternar o estado quando o registro for bem-sucedido
const handleEmailRequested = () => {
  emailRequested.value = true;
};

const handleSuccess = () => {
  registrationSuccess.value = true;
  emailRequested.value = false; // Oculta a página de verificação de e-mail quando o registro for bem-sucedido
};
</script>

<template>
  <v-row class="bg-surface position-relative" no-gutters>
    <v-col cols="12" lg="7" md="6" class="d-md-block d-none">
      <v-img :src="leftImg" alt="banner" height="100%" cover />
    </v-col>
    <!---Register Part-->
    <v-col cols="12" lg="5" md="6" class="d-flex align-center">
      <v-container>
          <!---Register Form-->
          <RegisterForm v-if="!emailRequested && !registrationSuccess" @emailRequested="handleEmailRequested" />
          <!---Send Email Verification-->
          <RegisterEmailVerification v-if="emailRequested && !registrationSuccess" @registrationSuccess="handleSuccess" />
          <!---Register Success-->
          <RegisterSuccess v-if="registrationSuccess" />
      </v-container>
    </v-col>
    <!---Register Part-->
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
