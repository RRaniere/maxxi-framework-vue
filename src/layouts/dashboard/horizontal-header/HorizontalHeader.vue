<script setup lang="ts">
import { ref, watch } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useCustomizerStore } from '../../../stores/customizer';
import Logo from '../logo/LogoMain.vue';
// dropdown imports
import LanguageDD from '../vertical-header/LanguageDD.vue';
import NotificationDD from '../vertical-header/NotificationDD.vue';
import ProfileDD from '../vertical-header/ProfileDD.vue';
import MegaMenuDD from '../vertical-header/MegaMenuDD.vue';
import Searchbar from '../vertical-header/SearchBarPanel.vue';

// assets
import message1 from '@/assets/images/widget/message/message1.svg';
import message2 from '@/assets/images/widget/message/message2.svg';
import message3 from '@/assets/images/widget/message/message3.svg';
import message4 from '@/assets/images/widget/message/message4.svg';

const messagedrawer = ref(false);

const customizer = useCustomizerStore();
const priority = ref(customizer.isHorizontalLayout ? 0 : 0);
watch(priority, (newPriority) => {
  // yes, console.log() is a side effect
  priority.value = newPriority;
});
</script>

<template>
  <v-app-bar elevation="0" :priority="priority" height="74" class="px-sm-10 px-5">
    <div class="py-5 pe-16 hidden-md-and-down">
      <Logo />
    </div>
    <v-btn
      class="hidden-lg-and-up text-secondary"
      color="darkText"
      icon
      rounded="sm"
      variant="text"
      @click.stop="customizer.SET_SIDEBAR_DRAWER"
      size="small"
    >
      <SvgSprite name="custom-menu-outline" style="width: 24px; height: 24px" />
    </v-btn>

    <!-- search mobile -->
    <v-menu :close-on-content-click="false" class="hidden-lg-and-up" offset="10, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="hidden-lg-and-up text-secondary ms-1" color="secondary" icon rounded="sm" variant="text" size="small" v-bind="props">
          <div class="text-lightText d-flex align-center">
            <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
          </div>
        </v-btn>
      </template>
      <v-sheet class="search-sheet v-col-12 pa-0" width="320">
        <v-text-field persistent-placeholder placeholder="Search here.." color="primary" variant="solo" hide-details>
          <template v-slot:prepend-inner>
            <div class="text-lightText d-flex align-center">
              <SvgSprite name="custom-search" style="width: 16px; height: 16px" />
            </div>
          </template>
        </v-text-field>
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Search part -->
    <!-- ---------------------------------------------- -->
    <v-sheet class="d-none d-lg-block bg-transparent" width="250">
      <Searchbar />
    </v-sheet>

    <!---/Search part -->

    <v-spacer />
    <!-- ---------------------------------------------- -->
    <!---right part -->
    <!-- ---------------------------------------------- -->

    <!-- ---------------------------------------------- -->
    <!-- Messages -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="10, 320">
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          class="text-secondary hidden-sm-and-down d-lg-block d-none"
          color="secondary"
          rounded="sm"
          variant="text"
          v-bind="props"
        >
          <SvgSprite name="custom-window" />
        </v-btn>
      </template>
      <v-sheet width="1024" height="325" rounded="md" class="d-lg-block d-none">
        <MegaMenuDD />
      </v-sheet>
    </v-menu>
    <!-- ---------------------------------------------- -->
    <!-- translate -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" location="bottom" offset="6, 80">
      <template v-slot:activator="{ props }">
        <v-btn icon class="ms-sm-2 ms-1" color="secondary" rounded="sm" v-bind="props">
          <SvgSprite name="custom-translation" />
        </v-btn>
      </template>
      <v-sheet rounded="md" width="200">
        <LanguageDD />
      </v-sheet>
    </v-menu>

    <!-- ---------------------------------------------- -->
    <!-- Notification -->
    <!-- ---------------------------------------------- -->
    <NotificationDD />

    <!-- ---------------------------------------------- -->
    <!-- Message -->
    <!-- ---------------------------------------------- -->
    <v-btn icon class="ms-sm-2 ms-1" color="secondary" rounded="sm" @click.stop="messagedrawer = !messagedrawer">
      <SvgSprite name="custom-message-note" />
    </v-btn>

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false" offset="8, 0">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn me-0" variant="text" rounded="circle" icon v-bind="props">
          <v-avatar class="py-2" size="40" rounded="circle">
            <img src="@/assets/images/users/avatar-6.png" class="rounded-circle" alt="profile" />
          </v-avatar>
        </v-btn>
      </template>
      <v-sheet rounded="md" width="290">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
  <v-navigation-drawer
    app
    temporary
    elevation="24"
    location="end"
    border="0"
    v-model="messagedrawer"
    width="474"
    class="message-drawer"
    style="z-index: 1075 !important"
  >
    <perfect-scrollbar style="height: calc(100vh - 100px)">
      <v-row class="ma-0">
        <v-col cols="12" class="pa-0">
          <div class="py-4 px-5 d-flex justify-space-between align-center">
            <div class="text-h5 font-weight-medium">What’s new announcement?</div>
            <v-btn variant="text" color="secondary" icon rounded="md" @click="messagedrawer = !messagedrawer">
              <SvgSprite name="custom-close" style="width: 18px; height: 18px; transform: rotate(45deg)" />
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-list class="px-5" aria-label="message list" aria-busy="true">
        <v-list-item-title class="text-h6 mb-2">Today</v-list-item-title>
        <v-list-item class="px-0">
          <v-card variant="outlined">
            <v-card-text>
              <v-chip color="success" variant="tonal" size="small">New Feature</v-chip>
              <span class="ms-2 text-caption">just now</span>
              <v-badge dot color="warning" size="small" inline></v-badge>
              <h6 class="text-subtitle-1 my-3">Select Business Unit</h6>
              <p class="text-h6 mb-2">
                You can use the Analytics Dashboard to explore how many new users download reports daily and monthly
              </p>
              <v-img :src="message1" alt="cover" width="100%" />
              <v-row class="mt-2">
                <v-col cols="6" sm="6">
                  <v-btn color="secondary" rounded="md" variant="outlined" block>Skip intro</v-btn>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-btn color="primary" variant="flat" rounded="md" block>Next</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-list-item>
        <v-list-item class="px-0 pt-2">
          <v-card variant="outlined">
            <v-card-text>
              <v-chip color="warning" variant="tonal" size="small">Meeting</v-chip>
              <span class="ms-2 text-caption">2 min ago</span>
              <v-badge dot color="warning" size="small" inline></v-badge>
              <h6 class="text-subtitle-1 my-3">General Meeting for update</h6>
              <p class="text-h6 mb-2">You can use the Dashboard to explore how many new users download reports daily and monthly</p>
              <v-img :src="message2" alt="cover" width="100%" />
            </v-card-text>
          </v-card>
        </v-list-item>
        <v-list-item-title class="text-h6 mb-2 mt-4">Yesterday</v-list-item-title>
        <v-list-item class="px-0">
          <v-card variant="outlined">
            <v-card-text>
              <v-chip color="primary" variant="tonal" size="small">Improvement</v-chip>
              <span class="ms-2 text-caption">2 hours ago</span>
              <v-badge dot color="warning" size="small" inline></v-badge>
              <h6 class="text-subtitle-1 my-3">Widgets update</h6>
              <p class="text-h6 mb-2">We've made some updates to the emendable widget which we think you are going to love.</p>
              <v-img :src="message3" alt="cover" width="100%" />
            </v-card-text>
          </v-card>
        </v-list-item>
        <v-list-item class="px-0 pt-2 pb-4">
          <v-card variant="outlined">
            <v-card-text>
              <v-chip color="primary" variant="tonal" size="small">Improvement</v-chip>
              <span class="ms-2 text-caption">1 day ago</span>
              <v-badge dot color="warning" size="small" inline></v-badge>
              <h6 class="text-subtitle-1 my-3">Coming soon dark mode</h6>
              <p class="text-h6 mb-2">We've made some updates to the emendable widget which we think you are going to love.</p>
              <v-img :src="message4" alt="cover" width="100%" />
            </v-card-text>
          </v-card>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
