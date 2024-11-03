<script setup lang="ts">
import { ref } from 'vue';
import twoFactor from '../twoFactor/TwoFactor.vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useAuthStore } from '@/stores/auth';
import { Form, useIsSubmitting } from 'vee-validate';
import type { number } from 'yup';

const checkbox = ref(false);
const valid = ref(false);
const show1 = ref(false);
const password = ref('');
const username = ref('');
const twoFa = ref(false);
const error = ref(false);
const totp = ref<any>();
const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
]);

async function validate(values: any, { setErrors }: any) {
  const authStore = useAuthStore();
  try {

    const response = await authStore.login(username.value, password.value, totp.value);

    if (response.status && response.two_factor_enabled) { 
      twoFa.value = response.status;
    }
   
  } catch (errorMsg) {
    error.value = true
    setErrors({ apiError: errorMsg });
  }
}
</script>

<template>
  <div class="d-flex justify-space-between align-center mt-4">
    <h3 class="text-h3 text-center mb-0">Login</h3>
    <router-link to="/register" class="text-primary text-decoration-none">Don't Have an account?</router-link>
  </div>
  <Form @submit="validate" class="mt-7 loginForm" v-slot="{ errors, isSubmitting }">
    <div class="mb-6">
      <v-label>Username</v-label>
      <v-text-field
        aria-label="username"
        v-model="username"
        class="mt-2"
        density="comfortable"
        required
        hide-details="auto"
        variant="outlined"
        color="primary"
        placeholder="Username" 
      ></v-text-field>
    </div>
    <div>
      <v-label>Password</v-label>
      <v-text-field
        aria-label="password"
        v-model="password"
        :rules="passwordRules"
        required
        variant="outlined"
        density="comfortable"
        color="primary"
        hide-details="auto"
        :type="show1 ? 'text' : 'password'"
        class="pwdInput mt-2"
        placeholder="Password" 
  
      >
        <template v-slot:append-inner>
          <v-btn color="secondary" aria-label="icon" icon rounded variant="text">
            <SvgSprite name="custom-eye-invisible" style="width: 20px; height: 20px" v-if="show1 == false" @click="show1 = !show1" />
            <SvgSprite name="custom-eye" style="width: 20px; height: 20px" v-if="show1 == true" @click="show1 = !show1" />
          </v-btn>
        </template>
      </v-text-field>
    </div>

    <div class="d-flex align-center mt-4 mb-7 mb-sm-0">
     
      <div class="ms-auto">
        <router-link to="/password-recover" class="text-darkText link-hover">Forgot Password?</router-link>
      </div>
    </div>
    <div v-if="errors.apiError" class="mt-2">
      <v-alert color="error">{{ errors.apiError }}</v-alert>
    </div>
    
    <v-btn
      color="primary"
      :loading="isSubmitting"
      block
      class="mt-5"
      variant="flat"
      size="large"
      rounded="md"
      :disabled="valid"
      type="submit"
    >
      Login</v-btn
    >
  </Form>
    
  <v-dialog v-model="twoFa" max-width="500">
    <Form  @submit="validate" v-slot="{ errors, isSubmitting }">
    <v-card>
      <v-card-item class="pa-5">
        <div class="text-h5"><SvgSprite name="custom-shield" class="v-icon--start" style="width: 25px; height: 25px"/>2FA Authentication</div>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text>
        <v-row justify="center">
          <v-col cols="12" lg="12" xl="12" md="12">
              <v-otp-input 
                type="number" 
                v-model="totp" 
                class="mb-5 mt-5" 
                rounded="md" 
                single-line 
                >
              </v-otp-input>
          </v-col>
          <div v-if="errors.apiError" class="mb-6 text-subtitle-1 text-error">
            {{ errors.apiError }}
          </div>
          <span class="text-subtitle-1 text-disabled font-weight-medium d-block">Enter the six digit from your authentication app.</span>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          block
          :loading = isSubmitting
          variant="flat"
          size="large"
          rounded="md"
          :disabled="valid"
          type="submit"
        >
          Verify</v-btn
        >
      </v-card-actions>
    </v-card>
  </Form>
  </v-dialog>

</template>
