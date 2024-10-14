<script setup lang="ts">
import { useRouter } from 'vue-router'; // Importa o hook do router


const router = useRouter();

const reloadRegister = () => {
  router.push({ path: '/register' }).then(() => {
    router.go(0); 
  });
};
</script>

<template>
    <v-container>
        <div class="d-flex align-center justify-center">
            <v-row justify="center">
            <v-col cols="12">
                <div class="pa-sm-9 pa-6 loginBox">
                <h3 class="text-h3">Welcome!</h3>
                <p class="text-lightText text-h6">We have sent you an email with further instructions.</p>
                <v-btn color="primary" block class="mt-2" variant="flat" rounded="md" size="large" :to="{ path: '/login' }">Login</v-btn>
                <v-btn color="primary" block class="mt-2 custom-btn" variant="outlined" rounded="md" size="large" @click="reloadRegister">Keep registering</v-btn>

                </div>
            </v-col>
            </v-row>
        </div>
    </v-container>
</template>

