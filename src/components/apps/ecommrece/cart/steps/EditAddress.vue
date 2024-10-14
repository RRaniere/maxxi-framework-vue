<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const props = defineProps({
  name: String,
  destination: String,
  building: String,
  street: String,
  city: String,
  state: String,
  country: String,
  post: String,
  phone: String,
  isDefault: Boolean,
  showBtn: Boolean
});

const dialog = ref(false);

const radioGroup = ref('1');
</script>
<template>
  <v-card variant="outlined" rounded="lg">
    <v-card-text>
      <div class="d-flex align-center ga-2">
        <h6 class="text-subtitle-1 mb-0">{{ props.name }}</h6>
        <small class="text-lightText text-body-1">({{ props.destination }})</small>
        <div class="ms-auto">
          <v-dialog v-model="dialog" width="800">
            <template v-slot:activator="{ props }">
              <v-btn color="secondary" size="small" rounded="md" variant="outlined" v-bind="props">
                <template v-slot:prepend>
                  <SvgSprite name="custom-edit-outline" class="text-lightText" style="width: 16px; height: 16px" />
                </template>
                Change
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="py-4 d-flex justify-space-between align-center">
                <span class="text-subtitle-1">Edit Billing Address</span>
                <v-btn icon rounded="md" color="primary" aria-label="close" class="ms-auto" variant="text" @click="dialog = false">
                  <SvgSprite name="custom-close-circle-outline" style="width: 20px; height: 20px" />
                </v-btn>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="px-2">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Name</v-label>
                      <v-text-field
                        single-line
                        aria-label="name"
                        variant="outlined"
                        color="primary"
                        model-value="Andre Castillo"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Destination</v-label>
                      <v-radio-group inline hide-details v-model="radioGroup">
                        <v-radio color="primary" value="1" label="Home"></v-radio>
                        <v-radio color="primary" value="2" label="Office"></v-radio>
                      </v-radio-group>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Building No./Name</v-label>
                      <v-text-field
                        single-line
                        variant="outlined"
                        aria-label="building no"
                        color="primary"
                        model-value="1372 Lupeg Grv"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Street</v-label>
                      <v-text-field
                        single-line
                        aria-label="street"
                        variant="outlined"
                        color="primary"
                        model-value="1042 Dihda Way"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">City</v-label>
                      <v-text-field
                        single-line
                        aria-label="city"
                        variant="outlined"
                        color="primary"
                        model-value="Cijofkef"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">State</v-label>
                      <v-text-field
                        single-line
                        aria-label="state"
                        variant="outlined"
                        color="primary"
                        model-value="Idaho"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Country</v-label>
                      <v-text-field
                        single-line
                        aria-label="country"
                        variant="outlined"
                        color="primary"
                        model-value="Canada"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-label class="mb-2">Area Code</v-label>
                      <v-text-field
                        single-line
                        aria-label="area code"
                        variant="outlined"
                        color="primary"
                        model-value="TS0 0MC"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-label class="mb-2">Contact</v-label>
                      <v-text-field
                        single-line
                        aria-label="contact"
                        variant="outlined"
                        color="primary"
                        model-value="(713) 311-2815"
                        required
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-switch color="primary" :model-value="false" label="Default" hide-details></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" rounded="md" variant="text" @click="dialog = false"> Cancel </v-btn>
                <v-btn color="primary" rounded="md" variant="flat" @click="dialog = false"> Submit </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
      <div class="mt-1 text-body1">
        <p class="text-caption text-lightText">
          {{ props.building }}, {{ props.street }}, {{ props.city }}, {{ props.state }}, {{ props.country }} - {{ props.post }}
        </p>
        <p class="text-caption text-lightText mb-0">{{ props.phone }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>
