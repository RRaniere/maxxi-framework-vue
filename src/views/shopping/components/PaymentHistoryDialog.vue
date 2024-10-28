<script setup lang="ts">
import { ref, shallowRef} from 'vue';
import { getPendingInvoicePaymentHistory} from '@/services/shopping/shoppingService';
import PageLoader from '@/components/shared/PageLoader.vue';


interface Payment {
  method: string;
  transaction_id: string;
  amount: number;
}

const payments = shallowRef<Payment[]>([]);
const loading = ref(false);
const dialog = ref(false);
const message = ref('');

async function openDialog() {
    dialog.value = true;
    loading.value = true;
    try {
        const response = await getPendingInvoicePaymentHistory();
        if (response.status) {
            payments.value = response.payments;
        }

        message.value = response.message
        
    } catch (error) {
        console.error('Erro ao carregar invoice:', error);
    } finally {
        loading.value = false;
    }
}

function closeDialog() {
    dialog.value = false;
}


</script>

<template>
 
 <v-btn color="primary" block @click="openDialog">Payment History</v-btn>

    <v-dialog v-model="dialog">

     <PageLoader v-if="loading"/>

      <v-card v-if="!loading">
        <v-card-item class="pa-5">
        <div class="d-flex align-center justify-space-between">
            <h5 class="text-subtitle-1 mb-0">Payment History</h5>
        </div>
        </v-card-item>
        <v-divider></v-divider>
        <v-card-text>
            <v-row >
                <v-col cols="12" v-if="payments.length > 0">
                    <v-table class="bordered-table rounded-0" hover>
                    <thead class="bg-containerBg">
                        <tr>
                        <th class="text-start text-uppercase text-caption font-weight-bold">Currency</th>
                        <th class="text-start text-uppercase text-caption font-weight-bold">Transaction Hash</th>
                        <th class="text-start text-uppercase text-caption font-weight-bold">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="text-lighttext" v-for="payment in payments">
                        <td class="text-subtitle-1 font-weight-regular">{{payment.method}}</td>
                        <td class="text-subtitle-1 font-weight-regular">{{payment.transaction_id}}</td>
                        <th class="text-start text-uppercase text-caption font-weight-bold">{{payment.amount}}</th>
                        </tr>
                    </tbody>
                    </v-table>
                    <v-divider></v-divider>
                </v-col>
                <v-col cols="12" class="text-center mt-4 mb-4" v-if="!(payments.length > 0) || !payments">
                    {{ message }}
                </v-col>

            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
