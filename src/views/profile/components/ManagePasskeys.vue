<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const isLoading = ref(false);


async function handleRequestEmailVerification(optionParam:string) {

isLoading.value = true;


}

</script>

<template> 
<v-row>
      <v-col cols="12" md="10" lg="10"> 
    <div>
        <div class="text-h5"><SvgSprite name="custom-security-safe" class="v-icon--start" style="width: 25px; height: 25px"/>Manage Passkeys</div>
        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Passkeys allow for a more secure, seamless authentication experience on supported devices.</span>
    </div>
    </v-col>
    <v-col cols="12" md="2" lg="2"> 
    <v-btn color="secondary" block variant="flat" rounded="md" :loading="isLoading" >Manage</v-btn>
    </v-col>
</v-row>

</template>


