<script setup lang="ts">

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import PageLoader from '@/components/shared/PageLoader.vue';
import Timer from '@/components/shared/Timer.vue';
import PaymentHistoryDialog from './components/PaymentHistoryDialog.vue';

import { ref, onMounted, shallowRef } from 'vue';
import QrcodeVue from 'qrcode.vue';
import { getPendingInvoices, cancelInvoice } from '@/services/shopping/shoppingService';
import useClipboard from 'vue-clipboard3';
import { useRouter } from 'vue-router';


const router = useRouter();
const page = ref({ title: 'Invoice' });
const breadcrumbs = shallowRef([{ title: 'Shopping', disabled: true, href: '#' }, { title: 'Invoice', disabled: true, href: '#' }]);


interface InvoiceItem {
  product: {
    name: string;
    price: number;
  };
}

interface Invoice {
  items: InvoiceItem[];
  due_date: string
}


const snackbar = ref(false);
const invoice = ref<Invoice | null>(null);
const loading = ref(true);
const payment = ref('credit');

const btcAddress = ref('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
const usdtAddress = ref('0x589cdce0e7b1c40cf97da3bd87c5abbdfbc350e8');
const ethAddress = ref('0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5');

onMounted(async () => {
    try {
        const response = await getPendingInvoices();
        if (response.status) {
            invoice.value = response.invoice;
        }
    } catch (error) {
        console.error('Erro ao carregar invoice:', error);
    } finally {
        loading.value = false;
    }
});

const { toClipboard } = useClipboard();

const copy = async (address : string) => {
    try {
        await toClipboard(address);
        snackbar.value = true;
    } catch (e) {
        console.error(e);
    }
};

async function handleInvoiceCancellation(){ 

    const response = await cancelInvoice();
    if (response.status === true) {
        router.push({ name: 'Shopping'});
    }

}

</script>

<template>

    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <PageLoader v-if="loading" />

    <v-row v-else-if="invoice">
        <v-col lg="9" cols="12" md="12">
            <v-card variant="outlined" class="bg-surface" rounded="md">
                <v-card-item class="pa-5">
                    <div class="d-flex align-center justify-space-between">
                        <h5 class="text-subtitle-1 mb-0">Payment Method</h5>
                        <v-btn color="secondary" variant="flat" @click="handleInvoiceCancellation">Cancel</v-btn>
                    </div>
                  </v-card-item>
                <v-divider></v-divider>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-radio-group v-model="payment" hide-details>
                                <v-row>
                                    <v-col cols="12" lg="4" sm="12">
                                        <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                                            <v-radio value="credit" color="primary" class="label-op-1">
                                                <template v-slot:label>
                                                    <div class="d-flex align-start w-100">
                                                        <div class="d-flex justify-space-between align-center">
                                                            <h6 class="text-subtitle-1 text-darkText mb-1">Bitcoin</h6>
                                                            <div class="ps-4 my-auto">
                                                                <img src="@/assets/images/icons/crypto/bitcoin.svg"
                                                                    width="25" alt="mg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </v-radio>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" lg="4" sm="12">
                                        <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                                            <v-radio value="paypal" color="primary" class="label-op-1">
                                                <template v-slot:label>
                                                    <div class="d-flex align-start w-100">
                                                        <div class="d-flex justify-space-between align-center">
                                                            <h6 class="text-subtitle-1 text-darkText mb-1">USDT</h6>
                                                            <div class="ps-4 my-auto">
                                                                <img src="@/assets/images/icons/crypto/usdt.svg"
                                                                    width="25" alt="mg" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                            </v-radio>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" lg="4" sm="12">
                                        <div class="py-5 px-4 pe-6 border payment-method rounded-md">
                                            <v-radio value="cash" color="primary" class="label-op-1">
                                                <template v-slot:label>
                                                    <div class="d-flex align-start w-100">
                                                        <div class="d-flex justify-space-between align-center">
                                                            <h6 class="text-subtitle-1 text-darkText mb-1">Ethereum</h6>
                                                            <div class="ps-4 my-auto">
                                                                <img src="@/assets/images/icons/crypto/ethereum.svg"
                                                                    width="25" alt="mg" />
                                                            </div>
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
                            <v-card variant="outlined" rounded="md" class="object-card overflow-hidden bg-containerBg"
                                v-if="payment == 'credit'">
                                <v-card-text>
                                    <div id="qr-code" class="d-flex justify-center">
                                        <qrcode-vue :value="btcAddress" :size="200" class="mb-6" :margin="1" />
                                    </div>

                                    <div>
                                        <v-text-field color="primary" label="Website" variant="outlined"
                                            density="comfortable" single-line hide-details v-model="btcAddress"
                                            class="center-text">
                                            <template v-slot:append-inner>
                                                <v-btn variant="text" aria-label="copy" icon rounded="md"
                                                    @click="copy(btcAddress)">
                                                    <SvgSprite name="custom-copy" class="text-lightText"
                                                        style="width: 20px; height: 20px" />
                                                </v-btn>
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <v-card elevation="0" variant="text" rounded="md"
                                class="object-card overflow-hidden bg-containerBg" v-if="payment == 'paypal'">

                                <v-card-text>
                                    <div id="qr-code" class="d-flex justify-center">
                                        <qrcode-vue :value="usdtAddress" :size="200" class="mb-6" :margin="1" />
                                    </div>

                                    <div>
                                        <v-text-field color="primary" label="Website" variant="outlined"
                                            density="comfortable" single-line hide-details v-model="usdtAddress"
                                            class="center-text">
                                            <template v-slot:append-inner>
                                                <v-btn variant="text" aria-label="copy" icon rounded="md"
                                                    @click="copy(usdtAddress)">
                                                    <SvgSprite name="custom-copy" class="text-lightText"
                                                        style="width: 20px; height: 20px" />
                                                </v-btn>
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-card-text>
                            </v-card>
                            <v-card elevation="0" variant="text" rounded="md"
                                class="object-card overflow-hidden bg-containerBg" v-if="payment == 'cash'">
                                <v-card-text>
                                    <div id="qr-code" class="d-flex justify-center">
                                        <qrcode-vue :value="ethAddress" :size="200" class="mb-6" :margin="1" />
                                    </div>

                                    <div>
                                        <v-text-field color="primary" label="Website" variant="outlined"
                                            density="comfortable" single-line hide-details v-model="ethAddress"
                                            class="center-text">
                                            <template v-slot:append-inner>
                                                <v-btn variant="text" aria-label="copy" icon rounded="md"
                                                    @click="copy(ethAddress)">
                                                    <SvgSprite name="custom-copy" class="text-lightText"
                                                        style="width: 20px; height: 20px" />
                                                </v-btn>
                                            </template>
                                        </v-text-field>
                                    </div>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-progress-linear aria-label="progressbar" color="primary" indeterminate></v-progress-linear>
            </v-card>
        </v-col>
        <v-col lg="3" cols="12" md="12">
            <v-row>
                <v-col cols="12">
                    <v-card elevation="0">
                        <v-card variant="outlined" class="text-center">
                            <v-card-text class="pt-6">
                                <div class="pa-6 rounded-md bg-lightprimary">
                                    <!-- <v-chip variant="flat" size="small" v-if="plan.active" class="mb-6" color="success" rounded="md">Popular</v-chip> -->
                                    <h1 class="mb-0 text-h3 pb-5">{{invoice.items[0].product.name}}</h1>
                                    <p class="pb-5 text-h2 mb-0"><span>$ </span>{{ Math.floor(invoice.items[0].product.price) }}</p>
                                    <span class="text-h5 text-lightText">Lifetime</span>
                                </div>
                                <v-list class="PricingList mt-5" aria-label="price list" aria-busy="true">
                                    <v-list-item border class="px-0 text-disabled" density="compact">
                                        <v-row>
                                            <v-col cols="3" class="text-end">
                                                <SvgSprite name="custom-square-check-outline" class="text-success me-2"
                                                    style="width: 20px; height: 20px" />
                                            </v-col>
                                            <v-col cols="9" class="text-start">
                                                5.00% Direct Bonus
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                    <v-list-item border class="px-0 text-disabled" density="compact">
                                        <v-row>
                                            <v-col cols="3" class="text-end">
                                                <SvgSprite name="custom-square-check-outline" class="text-success me-2"
                                                    style="width: 20px; height: 20px" />
                                            </v-col>
                                            <v-col cols="9" class="text-start">
                                                5.00% Binary Bonus
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                    <v-list-item border class="px-0 text-disabled" density="compact">
                                        <v-row>
                                            <v-col cols="3" class="text-end">
                                                <SvgSprite name="custom-square-check-outline" class="text-success me-2"
                                                    style="width: 20px; height: 20px" />
                                            </v-col>
                                            <v-col cols="9" class="text-start">
                                                $1000 Binary Max Daily Gain
                                            </v-col>
                                        </v-row>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <Timer :endDate = "invoice.due_date" />
                    <PaymentHistoryDialog />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" color="success" variant="flat" min-width="153" :timeout="3000"
        location="bottom right" rounded="md">
        <v-icon class="me-1" size="small" icon="$checkboxMarkedCircleOutline"></v-icon>
        Text Copied!
    </v-snackbar>

</template>


<style>
.center-text input {
    text-align: center;
}
</style>