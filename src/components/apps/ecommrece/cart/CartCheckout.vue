<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useEcomStore } from '@/stores/apps/eCommerce';
import StepFirst from './steps/StepFirst.vue';
import StepSecond from './steps/StepSecond.vue';
import Payment from './steps/PaymentCard.vue';
import CartEmpty from './CartEmpty.vue';
import OrderSummary from './steps/OrderSummary.vue';
import PromoCode from './steps/PromoCode.vue';
import OrderInformation from './steps/OrderInformation.vue';
import Thankyou from './steps/ThankYouDialog.vue';

const thankyou = ref(false);

const tab = ref('tab-1');
function changeTab(e: string) {
  tab.value = e;
}

const store = useEcomStore();
const getCart = computed(() => {
  return store.cart;
});
</script>
<template>
  <v-row>
    <v-col>
      <v-card class="bg-surface mb-4" variant="outlined" rounded="lg">
        <v-card-text class="pa-0">
          <v-tabs v-model="tab" color="primary" class="custom-tab" hide-slider>
            <v-tab value="tab-1" rounded="md" class="text-left py-4">
              <v-avatar size="24" color="primary" variant="tonal" class="me-2"> 1 </v-avatar>
              Cart
            </v-tab>

            <v-tab value="tab-2" rounded="md" class="text-left py-4" :disabled="store.cart.length < 1">
              <v-avatar size="24" color="primary" variant="tonal" class="me-2"> 2 </v-avatar>
              Shipping information
            </v-tab>

            <v-tab value="tab-3" rounded="md" class="text-left py-4" :disabled="store.cart.length < 1">
              <v-avatar size="24" color="primary" variant="tonal" class="me-2"> 3 </v-avatar>
              Payment
            </v-tab>
          </v-tabs>
        </v-card-text>
      </v-card>
      <v-window v-model="tab" class="mx-n6 px-6">
        <v-window-item value="tab-1">
          <v-row v-if="getCart.length > 0">
            <v-col md="8" cols="12">
              <StepFirst />
            </v-col>
            <v-col md="4" cols="12">
              <PromoCode />
              <OrderSummary />
              <v-btn
                color="primary"
                class="mt-4"
                rounded="md"
                variant="flat"
                block
                @click="changeTab('tab-2')"
                v-if="store.cart.length >= 1"
                >Process to checkout</v-btn
              >
            </v-col>
          </v-row>
          <div v-else class="d-flex justify-center w-100">
            <CartEmpty />
          </div>
        </v-window-item>
        <v-window-item value="tab-2" class="pa-1">
          <v-row>
            <v-col md="8" cols="12">
              <StepSecond />
              <v-row class="mt-3">
                <v-col cols="12" class="text-end">
                  <v-btn color="secondary" variant="text" @click="changeTab('tab-1')">
                    <SvgSprite
                      name="custom-chevron-outline"
                      class="text-lightText me-1"
                      style="width: 18px; height: 18px; transform: rotate(180deg)"
                    />
                    Back to cart
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col md="4" cols="12">
              <PromoCode />
              <OrderInformation />
              <v-btn class="mt-6" rounded="md" block variant="flat" color="primary" @click="changeTab('tab-3')">Process to Checkout</v-btn>
            </v-col>
          </v-row>
        </v-window-item>
        <v-window-item value="tab-3" class="pa-1">
          <v-row>
            <v-col lg="9" cols="12" md="8">
              <Payment />
              <v-row class="mt-3">
                <v-col cols="12" class="text-end">
                  <v-btn color="secondary" rounded="md" variant="text" @click="changeTab('tab-2')">
                    <SvgSprite
                      name="custom-chevron-outline"
                      class="text-lightText me-1"
                      style="width: 18px; height: 18px; transform: rotate(180deg)"
                    />
                    Back to shipping information
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col lg="3" cols="12" md="4">
              <PromoCode />
              <OrderInformation />
              <v-btn block variant="flat" rounded="md" color="primary" class="mt-4" @click="thankyou = true">Process to checkout</v-btn>
              <!-- Modal -->
              <v-dialog v-model="thankyou" fullscreen>
                <Thankyou />
              </v-dialog>
            </v-col>
          </v-row>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>
<style lang="scss">
.custom-tab.v-tabs {
  --v-tabs-height: unset;
  .v-tab--selected {
    .v-tab__slider {
      opacity: 0;
    }
  }
}
</style>
