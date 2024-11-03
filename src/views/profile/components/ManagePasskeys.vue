<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { getPasskeys, removePasskey } from '@/services/profile/passkeyService';
import { usePasskeyStore } from '@/stores/profile/passkeys';
import type { RefSymbol } from '@vue/reactivity';

const passkeysStore = usePasskeyStore();

const isLoading = ref(false);
const dialog = ref(false);

const passkeyName = ref('');

const validName = computed(() => {
  const valid = passkeyName.value != '';
  return valid
});

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('');
const snackbarIcon = ref('');

async function openDialog() { 
    isLoading.value = true
    try{ 
        await passkeysStore.fetchPasskeys();
    }finally{ 
        isLoading.value = false;
    }
    dialog.value = true;

}

async function handleRemovePasskey(name: string) { 

    const response = await passkeysStore.removePasskey(name);
    if(response.status) { 
        showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
    }

    if(!response.status) { 
        showSnackbar('error', response.message, "$closeCircle");
    }
   
}


async function handleAddPasskey() { 

    isLoading.value = true

    const response = await passkeysStore.addPasskey(passkeyName.value);
    isLoading.value = false;
    if(response.status) { 
        passkeyName.value = '';
        showSnackbar('success', response.message, "$checkboxMarkedCircleOutline");
    }
    if(!response.status) { 
        showSnackbar('error', response.message, "$closeCircle");
    }

}

function showSnackbar(color: string, message: string, icon:string) {
  snackbarColor.value = color;
  snackbarMessage.value = message;
  snackbar.value = true;
  snackbarIcon.value = icon
}

</script>

<template> 
<v-row>
      <v-col cols="12" md="10" lg="10"> 
    <div>
        <div class="text-h5"><SvgSprite name="custom-fingerprint" class="v-icon--start" style="width: 25px; height: 25px"/>Manage Passkeys</div>
        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Passkeys allow for a more secure, seamless authentication experience on supported devices.</span>
    </div>
    </v-col>
    <v-col cols="12" md="2" lg="2"> 
    <v-btn color="secondary" block variant="flat" rounded="md" :loading="isLoading" @click="openDialog">Manage</v-btn>
    </v-col>
</v-row>



<v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-item class="pa-5">
        <div class="text-h5"><SvgSprite name="custom-fingerprint" class="v-icon--start" style="width: 25px; height: 25px"/>Passkeys</div>
      </v-card-item>
      <v-divider></v-divider>
      <v-card-text >
        <v-row class="mb-2"> 
            <v-col cols="12" class="pb-0">
                <v-label class="mb-2">Passkey Name</v-label>
                <v-text-field
                v-model="passkeyName"
                placeholder="Passkey Name"
                color="primary"
                variant="outlined"
                single-line
                density="comfortable"
                />
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn color="primary" block variant="flat" rounded="md" @click="handleAddPasskey" :loading="isLoading" :disabled="!validName"> Add Passkey </v-btn>
            </v-col>
        </v-row> 
        <v-divider></v-divider>
        <v-row class="mt-2" v-if="passkeysStore.passkeys.length > 0">
            <v-col cols="12"> 
                <div class="text-h5">Your Passkeys</div>
            </v-col>
            <v-col cols="12"> 
                <v-row class="mb-1" v-for="passkey in passkeysStore.passkeys" >
                    <v-col cols="8">
                        <div class="text-h6">{{ passkey.name }}</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">{{passkey.created_at_human}}</span>
                    </v-col>
                    <v-col cols="4">
                        <v-btn color="error"  variant="flat" rounded="md" block @click="handleRemovePasskey(passkey.name)">Remove</v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row v-else class="mt-4">
            <v-col cols="12" class="text-center">
                <div class="text-h6"> You don't have any passkey. </div>
            </v-col>
        </v-row>
        
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
</v-dialog>


<v-snackbar
v-model="snackbar"
:color="snackbarColor"
:timeout="3000"
rounded="md"
variant="flat"
location="top right"
min-width="300"
>
<v-icon class="me-1" size="small" :icon="snackbarIcon" />
{{ snackbarMessage }}
</v-snackbar>

</template>


