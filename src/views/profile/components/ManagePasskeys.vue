<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
const authStore = useAuthStore();

const isLoading = ref(false);
const dialog = ref(false);

async function handleRequestEmailVerification(optionParam:string) {

isLoading.value = true;


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
    <v-btn color="secondary" block variant="flat" rounded="md" :loading="isLoading" @click="dialog = true">Manage</v-btn>
    </v-col>
</v-row>



<v-dialog v-model="dialog" max-width="500">
    <Form >
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
                placeholder="Passkey Name"
                color="primary"
                variant="outlined"
                single-line
                density="comfortable"
                />
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn color="primary" block variant="flat" rounded="md"> Add Passkey</v-btn>
            </v-col>
        </v-row> 
        <v-divider></v-divider>
        <v-row class="mt-2">
            <v-col cols="12"> 
                <div class="text-h5">Your Passkeys</div>
            </v-col>
            <v-col cols="12"> 

                <v-row class="mb-1">
                    <v-col cols="8">
                        <div class="text-h6">My Passkey</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Added 14 hours ago</span>
                    </v-col>
                    <v-col cols="4">
                        <v-btn color="error"  variant="flat" rounded="md" block>Delete</v-btn>
                    </v-col>
                </v-row>

                <v-row class="mb-1">
                    <v-col cols="8">
                        <div class="text-h6">My Passkey</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Added 14 hours ago</span>
                    </v-col>
                    <v-col cols="4">
                        <v-btn color="error"  variant="flat" rounded="md" block>Delete</v-btn>
                    </v-col>
                </v-row>


            </v-col>
        </v-row>
        
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </Form>

</v-dialog>


</template>


