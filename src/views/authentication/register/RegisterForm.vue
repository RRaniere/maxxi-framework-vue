<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRegisterStore } from '@/stores/registerStore';
import SuccessWithLoader from '@/components/buttons/SuccessWithLoader.vue';
import MessageDisplay from '@/components/shared/MessageDisplay.vue'; 
import { verifyRegisterData, requestEmailVerification } from '@/services/registerService'; 

const emit = defineEmits(['emailRequested']);

const registerStore = useRegisterStore();

// Definir estados
const agreeToTerms = ref(true);
const username = ref('ramonraniere');
const sponsor = ref('genesis');
const password = ref('12345678Aa');
const confirmPassword = ref('12345678Aa');
const email = ref('ramonranieremkt@gmail.com');
const firstname = ref('Ramon');
const lastname = ref('Raniere');
const isLoading = ref(false);
const isLoaded = ref(false);
const emailRequested = ref(false);
const errors = ref<{ error?: string }>({});

// Definir validações

const firstRules = ref([(v: string) => !!v || 'First Name is required']);
const lastRules = ref([(v: string) => !!v || 'Last Name is required']);
const usernameRules = ref([(v: string) => !!v || 'Username is required']);
const sponsorRules = ref([(v: string) => !!v || 'Sponsor is required']);
const emailRules = ref([
  (v: string) => !!v || 'E-mail is required',
  (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
]);

const passwordRules = ref([
  (v: string) => !!v || 'Password is required',
  (v: string) => (v && v.length >= 8) || 'Password must be greater than 8 characters',
]);

const confirmPasswordRules = ref([
  (v: string) => !!v || 'Password confirmation is required',
  (v: string) => v === password.value || 'Passwords must match',
]);


watch(password, () => {
  confirmPasswordRules.value = [
    (v: string) => !!v || 'Password confirmation is required',
    (v: string) => v === password.value || 'Passwords must match',
  ];
});

const isFormValid = computed(() => {
  return (
    agreeToTerms.value &&
    username.value &&
    sponsor.value &&
    password.value &&
    confirmPassword.value &&
    confirmPassword.value == password.value &&
    email.value &&
    firstname.value &&
    lastname.value
  );
});


async function loading() {

  isLoaded.value = false;
  isLoading.value = true;
  
  try {
    await submit();
  } catch (error: any) {
    errors.value = { error: error.message };
  } finally {
    isLoading.value = false;
  }
}

// Função que é chamada após o carregamento
function loaded() {
  isLoaded.value = true;
  if (emailRequested.value) {
    emit("emailRequested");
  }
}

async function submit() {
  const userData = {
    username: username.value,
    email: email.value,
    password: password.value,
    sponsor: sponsor.value,
    firstname: firstname.value,
    lastname: lastname.value,
  };

  registerStore.setUserData(userData);

  try {
    const response = await verifyRegisterData(userData);
    if (response.status) {
      await handleEmailVerification(userData);
    } else {
      throw new Error(response.erro);
    }
  } catch (error: any) {
    throw error;
  }
}

async function handleEmailVerification(userData: any) {
  try {
    const response = await requestEmailVerification(userData); 
    if (response.status) {
      emailRequested.value = true;
    } else {
      throw new Error(response.erro);
    }
  } catch (error: any) {
    throw error;
  }
}
</script>

<template>

  <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <div class="pa-sm-10 pa-6 loginBox">
          <div class="text-center">
          </div>
          <!---Register Form-->

          <div class="d-flex justify-space-between align-center">
            <h3 class="text-h3 text-center mb-0">Sign up</h3>
            <router-link to="/login" class="text-primary text-decoration-none">Already have an account?</router-link>
          </div>
          <v-form ref="Regform" class="mt-7 loginForm">
            <v-row class="">
              <v-col cols="12" sm="6" >
                <v-text-field
                  hide-details="auto" 
                  variant="outlined" 
                  :rules="usernameRules" 
                  color="primary" 
                  placeholder="Username"
                  v-model="username" 
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model="sponsor"
                  :rules="sponsorRules"
                  hide-details="auto"
                  required
                  variant="outlined"
                  color="primary"
                  placeholder="Sponsor"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" >
                <v-text-field 
                  v-model="email" 
                  :rules="emailRules" 
                  placeholder="Email Address" 
                  required
                  hide-details="auto" 
                  variant="outlined" 
                  color="primary">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model="firstname"
                  :rules="firstRules"
                  hide-details="auto"
                  required
                  variant="outlined"
                  color="primary"
                  placeholder="First Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" >
                <v-text-field
                  v-model="lastname"
                  :rules="lastRules"
                  hide-details="auto"
                  required
                  variant="outlined"
                  color="primary"
                  placeholder="Last Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" >
                <v-text-field 
                  v-model="password" 
                  :rules="passwordRules" 
                  placeholder="Password" 
                  required 
                  variant="outlined"
                  color="primary" 
                  hide-details="auto"  
                  type="password"
                  class="pwdInput">
                  
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" >
                <v-text-field 
                  v-model="confirmPassword" 
                  :rules="confirmPasswordRules" 
                  placeholder="Confirm Password" 
                  required 
                  variant="outlined"
                  color="primary" 
                  hide-details="auto" 
                  type="password"
                  class="pwdInput">
                </v-text-field>
              </v-col>
            </v-row>

            <MessageDisplay  v-if="isLoaded" class="mt-4 mb-0"
              :errorMessage="errors.error" 
            />
            
            <div class="d-sm-inline-flex align-center mt-2 mb-0 mb-sm-0 font-weight-bold">
              <v-checkbox color="primary" name="agreeToTerms" :label="'I agree to all the Terms & Conditions'"  v-model="agreeToTerms" />
            </div>

            <SuccessWithLoader 
              color="primary" 
              size="large" 
              rounded="md" 
              text="Create Account"
              textInLoading="Checking..." 
              :disabled="!isFormValid"      
              @loading="loading" 
              @loaded="loaded"
              block 
            />
          </v-form>
        </div>
      </v-col>
    </v-row>
  </div>

</template>
