<script setup lang="ts">
import AuthForgotPwd from './PasswordRecoverForm.vue';

import leftImg from '@/assets/images/auth/img-auth-sideimg.png';
</script>

<template>
  <v-row class="bg-surface position-relative" no-gutters>
    <v-col cols="12" lg="7" md="6" class="d-md-block d-none">
      <v-img :src="leftImg" alt="banner" height="100%" cover />
    </v-col>
    <!---Forgot pwd Part-->
    <v-col cols="12" lg="5" md="6" class="d-flex align-center">
      <v-container>
        <div class="d-flex align-center justify-center" style="min-height: calc(100vh - 148px)">
          <v-row justify="center">
            <v-col cols="12" lg="12">
              <div class="pa-sm-10 pa-4 loginBox">
                <div class="d-flex justify-space-between align-center">
                  <h3 class="text-h3 text-center mb-0">Forgot Password</h3>
                  <router-link to="/login" class="text-primary text-decoration-none">Back to Login</router-link>
                </div>

                <!---Forgot pwd Form-->
                <AuthForgotPwd />
                <!---Forgot pwd Form-->
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-col>
    <!---Forgot pwd Part-->
  </v-row>
</template>
<style lang="scss">
.loginBox {
  max-width: 475px;
  margin: 0 auto;
}
</style>
