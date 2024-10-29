<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profileStore';
import EmailVerification from '@/views/profile/components/EmailVerification.vue';
import { requestEmailVerification } from '@/services/authentication/emailVerificationService';
import { updatePersonalData } from '@/services/profile/profileService';

const authStore = useAuthStore();
const profileStore = useProfileStore();

// Reactive references for form fields
const firstname = ref(authStore.user.user.first_name);
const lastname = ref(authStore.user.user.last_name);
const email = ref(authStore.user.user.email);

// UI state references
const isLoading = ref(false);
const emailSent = ref(false);
const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');

// Validation rules
const rules = {
  firstName: [
    (v: string) => !!v || 'First Name is required',
    (v: string) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v) || 'First Name must contain only letters',
  ],
  lastName: [
    (v: string) => !!v || 'Last Name is required',
    (v: string) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(v) || 'Last Name must contain only letters',
  ],
  email: [
    (v: string) => !!v || 'E-mail is required',
    (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
  ],
};

// Form validation
const isFormValid = computed(() => {
  const firstNameValid = rules.firstName.every((rule) => rule(firstname.value) === true);
  const lastNameValid = rules.lastName.every((rule) => rule(lastname.value) === true);
  const emailValid = rules.email.every((rule) => rule(email.value) === true);

  return firstNameValid && lastNameValid && emailValid;
});

// Submission methods
async function submit() {
  isLoading.value = true;

  profileStore.setUserData({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
  });

  try {
    const response = await requestEmailVerification();
    if (response.status) {
      emailSent.value = true;
    }
  } catch (error) {
    showSnackbar('error', 'Failed to send verification email');
  } finally {
    isLoading.value = false;
  }
}

async function handleUpdatePersonalData(otp: number) {
  const response = await updatePersonalData(otp);

  if (response.status) {
    showSnackbar('success', response.message);
    authStore.updateUserData({
      firstName: profileStore.userData.firstname,
      lastName: profileStore.userData.lastname,
      email: profileStore.userData.email,
    });
    emailSent.value = false;
  } else {
    showSnackbar('error', response.message);
  }
}

// Utility to handle Snackbar messages
function showSnackbar(color: string, message: string) {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  snackbar.value = true;
}
</script>

<template>
  <v-form v-if="!emailSent">
    <v-row>
      <v-col cols="12" md="6">
        <v-label class="mb-2">First Name</v-label>
        <v-text-field
          v-model="firstname"
          :rules="rules.firstName"
          placeholder="Enter First Name"
          color="primary"
          variant="outlined"
          single-line
          density="comfortable"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-label class="mb-2">Last Name</v-label>
        <v-text-field
          v-model="lastname"
          :rules="rules.lastName"
          placeholder="Enter Last Name"
          color="primary"
          variant="outlined"
          single-line
          density="comfortable"
        />
      </v-col>
      <v-col cols="12">
        <v-label class="mb-2">Email Address</v-label>
        <v-text-field
          v-model="email"
          :rules="rules.email"
          placeholder="Enter Email Address"
          color="primary"
          variant="outlined"
          single-line
          density="comfortable"
        />
      </v-col>
    </v-row>
    <div class="text-end mt-4">
      <v-divider />
      <v-btn
        :disabled="!isFormValid"
        :loading="isLoading"
        color="primary"
        rounded="md"
        variant="flat"
        class="mt-4"
        @click="submit"
      >
        Continue
      </v-btn>
    </div>
  </v-form>

  <EmailVerification v-if="emailSent" @codeFilled="handleUpdatePersonalData" />

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    :timeout="3000"
    rounded="md"
    variant="flat"
    location="top right"
    min-width="300"
  >
    <v-icon class="me-1" size="small" icon="$closeCircle" />
    {{ snackbarMessage }}
  </v-snackbar>
</template>
