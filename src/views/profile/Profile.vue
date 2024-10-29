<script setup lang="ts">
import { ref } from 'vue';
// common components
import SvgSprite from '@/components/shared/SvgSprite.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

// tabs import
import ProfileTab from './ProfileTab.vue';
import BillingTab from './BillingTab.vue';
import FinancialTab from './FinancialTab.vue';
import SecurityTab from './SecurityTab.vue';

// theme breadcrumb
const page = ref({ title: 'Profile' });
const breadcrumbs = ref([
  {
    title: 'Profile',
    disabled: false,
    href: '#'
  }
]);

// tabs data
const tab = ref('tab-profile');
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <v-col cols="12">
      <v-card variant="flat" rounded="lg">
        <v-card variant="outlined" rounded="lg">
          <v-card-item>
            <v-card-title class="text-h6">Account Settings</v-card-title>
          </v-card-item>
          <v-divider></v-divider>
          <div class="my-3">
            <v-row class="d-flex flex-row">
              <v-col cols="12" md="4" sm="5" class="border-sm-right pe-sm-0 py-sm-0">
                <v-card-text>
                  <v-tabs v-model="tab" direction="vertical" color="primary">
                    <v-tab value="tab-profile" rounded="md" class="text-start overflow-hidden" height="70">
                      <SvgSprite name="custom-user-outline" class="v-icon--start" style="width: 16px; height: 16px" />
                      <div>
                        <div>Profile</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Profile Settings</span>
                      </div>
                    </v-tab>
                    <v-tab value="tab-financial" rounded="md" class="text-start overflow-hidden" height="70">
                      <SvgSprite name="custom-wallet-outline" class="v-icon--start" style="width: 16px; height: 16px" />
                      <div>
                        <div>Financial</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Financial Settings</span>
                      </div>
                    </v-tab>
                    <v-tab value="tab-security" rounded="md" class="mb-3 text-start overflow-hidden" height="70">
                      <SvgSprite name="custom-key-outline" class="v-icon--start" style="width: 16px; height: 16px" />
                      <div>
                        <div>Security</div>
                        <span class="text-subtitle-2 text-disabled font-weight-medium d-block">Update Profile Security</span>
                      </div>
                    </v-tab>
                  </v-tabs>
                </v-card-text>
                <v-divider class="px-4 d-sm-none"></v-divider>
              </v-col>

              <v-col cols="12" md="8" sm="7" class="ps-sm-0 py-sm-0">
                <v-card-text>
                  <v-window v-model="tab">
                    <v-window-item value="tab-profile">
                      <ProfileTab />
                    </v-window-item>
                    <v-window-item value="tab-financial">
                      <FinancialTab />
                    </v-window-item>
                    <v-window-item value="tab-security">
                      <SecurityTab />
                    </v-window-item>
                  </v-window>
                </v-card-text>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
