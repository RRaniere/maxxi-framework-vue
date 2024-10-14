<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import { useEcomStore } from '@/stores/apps/eCommerce';
import { useCustomizerStore } from '@/stores/customizer';
import EditAddress from './EditAddress.vue';

const payment = ref('credit');

const customizer = useCustomizerStore();
const store = useEcomStore();

const imageStyle = computed(() => ({
  filter: customizer.actTheme === 'dark' ? 'invert(1)' : 'unset'
}));
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-item>
      <h5 class="text-subtitle-1 mb-0">Payment Method</h5>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <div v-for="address in store.addresses" :key="address.id">
        <div v-if="address.isDefault">
          <EditAddress
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
            :showBtn="false"
          />
        </div>
      </div>
      <v-row class="mt-3">
        <v-col cols="12">
          <v-radio-group v-model="payment" hide-details>
            <v-row>
              <v-col cols="12" lg="auto" sm="6">
                <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                  <v-radio value="credit" color="primary" class="label-op-1">
                    <template v-slot:label>
                      <div class="d-flex align-center w-100">
                        <div class="flex-1-1">
                          <div class="d-flex justify-space-between">
                            <h6 class="text-subtitle-1 text-darkText mb-1">Credit Card</h6>
                            <div class="ms-auto">
                              <img src="@/assets/images/e-commerce/card.png" width="50" alt="img" />
                            </div>
                          </div>
                          <span class="d-block text-caption text-lightText text-wrap">10% off with master card</span>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </div>
              </v-col>
              <v-col cols="12" lg="auto" sm="6">
                <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                  <v-radio value="paypal" color="primary" class="label-op-1">
                    <template v-slot:label>
                      <div class="d-flex align-start w-100">
                        <div>
                          <h6 class="text-subtitle-1 text-darkText mb-1">Pay with PayPal</h6>
                          <span class="d-block text-caption text-lightText text-wrap">5% off on first payment</span>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/paypal.png" width="55" alt="img" />
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </div>
              </v-col>
              <v-col cols="12" lg="auto" sm="6">
                <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                  <v-radio value="cash" color="primary" class="label-op-1">
                    <template v-slot:label>
                      <div class="d-flex align-center w-100">
                        <div>
                          <h6 class="text-subtitle-1 text-darkText mb-1">Cash on Delivery</h6>
                          <span class="d-block text-caption text-lightText text-wrap">When you use this payment</span>
                        </div>
                      </div>
                    </template>
                  </v-radio>
                </div>
              </v-col>
            </v-row>
          </v-radio-group>
        </v-col>
        <v-col cols="12">
          <v-card elevation="0" rounded="lg" variant="text" :disabled="payment !== 'credit'" v-if="payment == 'credit'">
            <v-card-item class="py-3 px-0">
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Card Number :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the 16 digit card number on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/master-card.png" width="20" alt="img" />
                    </template>
                    <template v-slot:append-inner>
                      <SvgSprite name="custom-circle-check-outline" class="text-lightText" style="width: 24px; height: 24px" />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Expiry Date :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the expiration on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-row class="align-center">
                    <v-col cols="5" class="pe-0">
                      <v-text-field
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="12"
                        variant="outlined"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="pa-0 text-center"> / </v-col>
                    <v-col cols="5" class="ps-0">
                      <v-text-field
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="2021"
                        variant="outlined"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>CVV Number :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the 3 or 4 digit number on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/cvv.png" :style="imageStyle" width="20" alt="img" />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Password :</v-label>
                  <span class="text-caption text-lightText d-block">Enter your dynamic password</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/lock.png" :style="imageStyle" width="20" alt="img" />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="text-end">
                  <v-btn variant="outlined" rounded="md" class="me-2" color="secondary">Cancel</v-btn>
                  <v-btn variant="flat" rounded="md" color="primary">Save</v-btn>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-divider />
                  <div class="px-2">OR</div>
                  <v-divider />
                </v-col>
              </v-row>
            </v-card-item>
            <v-card-text class="mt-4 px-0 pb-0">
              <v-row>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" rounded="lg" class="object-card overflow-hidden">
                    <v-card-text class="top-object pa-4">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">John Smith</h5>
                          <h6 class="text-h5">**** **** **** 6790</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/mastercard.png" width="42" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" rounded="lg" class="object-card overflow-hidden">
                    <v-card-text class="top-object pa-4">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">Jennifer winget</h5>
                          <h6 class="text-h5">**** **** **** 5674</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/visa.png" width="24" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card elevation="0" variant="text" rounded="lg" v-if="payment == 'paypal'">
            <v-card-item class="py-3 px-0">
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Card Number :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the 16 digit card number on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/paypal.png" width="40" alt="img" />
                    </template>
                    <template v-slot:append-inner>
                      <SvgSprite name="custom-circle-check-outline" class="text-lightText" style="width: 24px; height: 24px" />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Expiry Date :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the expiration on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-row class="align-center">
                    <v-col cols="5" class="pe-0">
                      <v-text-field
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="12"
                        variant="outlined"
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2" class="pa-0 text-center"> / </v-col>
                    <v-col cols="5" class="ps-0">
                      <v-text-field
                        single-line
                        density="comfortable"
                        type="number"
                        placeholder="2021"
                        variant="outlined"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>CVV Number :</v-label>
                  <span class="text-caption text-lightText d-block">Enter the 3 or 4 digit number on the card</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/cvv.png" :style="imageStyle" width="20" alt="img" />
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="mb-md-n3 mb-n1">
                <v-col md="5" cols="12" class="pb-md-3 pb-1">
                  <v-label>Password :</v-label>
                  <span class="text-caption text-lightText d-block">Enter your dynamic password</span>
                </v-col>
                <v-col md="7" cols="12" class="pt-md-3 pt-0">
                  <v-text-field single-line density="comfortable" variant="outlined" hide-details>
                    <template v-slot:prepend-inner>
                      <img src="@/assets/images/e-commerce/lock.png" :style="imageStyle" width="20" alt="img" />
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="text-end">
                  <v-btn variant="outlined" rounded="md" class="me-2" color="secondary">Cancel</v-btn>
                  <v-btn variant="flat" rounded="md" color="primary">Save</v-btn>
                </v-col>
                <v-col cols="12" class="d-flex align-center">
                  <v-divider />
                  <div class="px-2">OR</div>
                  <v-divider />
                </v-col>
              </v-row>
            </v-card-item>
            <v-card-text class="mt-4 px-0 pb-0">
              <v-row>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" class="object-card overflow-hidden">
                    <v-card-text class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">John Smith</h5>
                          <h6 class="text-h5">**** **** **** 6790</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/mastercard.png" width="42" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" class="object-card overflow-hidden">
                    <v-card-text class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">Jennifer winget</h5>
                          <h6 class="text-h5">**** **** **** 5674</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/visa.png" width="24" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card elevation="0" variant="text" v-if="payment == 'cash'" disabled>
            <v-card-item class="py-3 px-0">
              <v-row class="mb-md-n3 mb-n1">
                <v-col cols="12" class="d-flex align-center">
                  <v-divider />
                  <div class="px-2">OR</div>
                  <v-divider />
                </v-col>
              </v-row>
            </v-card-item>
            <v-card-text class="mt-4 px-0 pb-0">
              <v-row>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" class="object-card overflow-hidden">
                    <v-card-text class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">John Smith</h5>
                          <h6 class="text-h5">**** **** **** 6790</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/mastercard.png" width="42" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">760</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">10/22</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col cols="12" sm="6" lg="5">
                  <v-card elevation="0" variant="outlined" class="object-card overflow-hidden">
                    <v-card-text class="top-object">
                      <div class="d-flex mb-12">
                        <div>
                          <h5 class="text-h5 mb-0">Jennifer winget</h5>
                          <h6 class="text-h5">**** **** **** 5674</h6>
                        </div>
                        <div class="ms-auto">
                          <img src="@/assets/images/e-commerce/visa.png" width="24" alt="img" />
                        </div>
                      </div>

                      <div class="d-flex align-center justify-space-between mt-3">
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">CVV</span>
                          <span class="text-caption d-block">678</span>
                        </div>
                        <div class="d-flex align-center">
                          <span class="text-medium-emphasis text-caption opacity-50 me-2">Expire Date</span>
                          <span class="text-caption d-block">3/25</span>
                        </div>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<style lang="scss">
.object-card {
  position: relative;
  background-color: rgb(var(--v-theme-containerBg));
}
html .label-op-1 label {
  opacity: 1 !important;
}
</style>
