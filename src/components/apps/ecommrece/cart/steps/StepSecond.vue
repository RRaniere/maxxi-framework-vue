<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import AddressCard from './AddressCard.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';

const store = useEcomStore();
onMounted(() => {
  store.fetchAddress();
});

const selected = ref(['shipping']);
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pa-0">
      <h4 class="text-subtitle-1 pa-4">Shipping information</h4>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col sm="6" cols="12" v-for="address in store.addresses" :key="address.id">
          <AddressCard
            :name="address.name"
            :destination="address.destination"
            :isDefault="address.isDefault"
            :building="address.building"
            :street="address.street"
            :city="address.city"
            :state="address.state"
            :country="address.country"
            :post="address.post"
            :phone="address.phone"
            :showBtn="true"
          />
        </v-col>
        <v-col lg="12">
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>First Name :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-text-field
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter your first name"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>Last Name :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-text-field
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter your last name"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>Email Id :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-text-field
                hide-details
                density="comfortable"
                color="primary"
                type="email"
                placeholder="Enter email id"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>Date of Birth :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-row class="align-center">
                <v-col cols="3" class="pe-0">
                  <v-text-field hide-details density="comfortable" color="primary" type="number" placeholder="31" variant="outlined">
                  </v-text-field>
                </v-col>
                <v-col class="pa-0 text-center"> / </v-col>
                <v-col cols="3" class="px-0">
                  <v-text-field hide-details density="comfortable" color="primary" type="number" placeholder="12" variant="outlined">
                  </v-text-field>
                </v-col>
                <v-col class="pa-0 text-center"> / </v-col>
                <v-col cols="4" class="ps-0">
                  <v-text-field hide-details density="comfortable" color="primary" type="number" placeholder="2023" variant="outlined">
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>Phone number :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-row>
                <v-col cols="3" sm="2" class="pe-0">
                  <v-text-field
                    hide-details
                    density="comfortable"
                    color="primary"
                    type="number"
                    placeholder="+91"
                    variant="outlined"
                  ></v-text-field>
                </v-col>
                <v-col cols="9" sm="10">
                  <v-text-field hide-details density="comfortable" color="primary" type="number" placeholder="31" variant="outlined">
                    <template v-slot:append-inner>
                      <SvgSprite name="custom-phone-outline-1" class="text-lightText" style="width: 24px; height: 24px; opacity: 0.5" />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="align-center mb-sm-n3 mb-n1">
            <v-col cols="12" sm="3" class="pb-sm-3 pb-1">
              <v-label>City :</v-label>
            </v-col>
            <v-col cols="12" sm="9" class="pt-sm-3 pt-0">
              <v-text-field
                hide-details
                density="comfortable"
                color="primary"
                placeholder="Enter city name"
                variant="outlined"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox
            class="mt-3"
            v-model="selected"
            label="Save this new address for future shipping"
            color="primary"
            value="shipping"
            hide-details
          ></v-checkbox>
          <v-row class="mt-2">
            <v-col cols="12" class="text-end">
              <v-btn color="secondary" rounded="md" class="me-2" variant="outlined">Cancel</v-btn>
              <v-btn color="primary" rounded="md" variant="flat">Save</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
