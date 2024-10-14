<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import SuccessWithLoader from '@/components/buttons/SuccessWithLoader.vue';
import MessageDisplay from '@/components/shared/MessageDisplay.vue'; 
import { useRouter } from 'vue-router';
import { recover } from '@/services/passwordRecover';
import { useRoute } from 'vue-router';

const route = useRoute();

const token = Array.isArray(route.params.token) ? route.params.token[0] : route.params.token;

const valid = ref(false);
const isLoaded = ref(false);
const passwordReseted = ref(false);
const logform = ref();
const password = ref('12345678AAa');
const confirmPassword = ref('12345678AAa')
const errors = ref<{ error?: string }>({});

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
    confirmPassword.value &&
    confirmPassword.value == password.value
  );
});



async function validate() {

    logform.value.validate();
    if (valid) {

        const response = await recover(password.value, token);

        if (response.status === true) {
            passwordReseted.value = true;
        }

        if (response.status === false) {
            errors.value = { error: response.message };
        }


    }
}

function loaded() {
  isLoaded.value = true;
}
</script>

<template>
    <div v-if="!passwordReseted || !isLoaded" class="pa-sm-10 pa-4 loginBox">
        <div class="d-flex justify-space-between align-center">
            <h3 class="text-h3 text-center mb-0">Reset Password</h3>
        </div>
        <v-form ref="logform" lazy-validation v-model="valid" @submit.prevent="validate" class="mt-7 loginForm">
            <v-row>
                <v-col cols="12" sm="12">
                    <v-text-field v-model="password" :rules="passwordRules" placeholder="Password" required
                        variant="outlined" color="primary" hide-details="auto" type="password" class="pwdInput">
                    </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                    <v-text-field v-model="confirmPassword" :rules="confirmPasswordRules" placeholder="Confirm Password"
                        required variant="outlined" color="primary" hide-details="auto" type="password"
                        class="pwdInput">
                    </v-text-field>
                </v-col>
            </v-row>

            <MessageDisplay  v-if="isLoaded" class="mt-4 mb-0"
              :errorMessage="errors.error" 
            />

            <SuccessWithLoader 
                color="primary" 
                size="large" 
                class="mt-6"
                rounded="md" 
                text="Reset Password"
                textInLoading="Resetting" 
                :disabled="!isFormValid"      
                @loading="validate" 
                @loaded="loaded"
                block 
                />
        </v-form>
    </div>
    <div v-else-if="passwordReseted && isLoaded">
      <div class="d-flex align-center justify-center">
            <v-row justify="center">
            <v-col cols="12">
                <div class="pa-sm-9 pa-6 loginBox">
                <h3 class="text-h3">All set!</h3>
                <p class="text-h6 mt-2"> 
                    Your password has been successfully reset!
                </p>
                <v-btn color="primary" block class="mt-2" variant="flat" rounded="md" size="large" :to="{ path: '/login' }">Login</v-btn>
                </div>
            </v-col>
            </v-row>
        </div>
    </div>
</template>
