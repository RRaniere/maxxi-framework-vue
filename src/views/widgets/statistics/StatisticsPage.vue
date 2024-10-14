<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

// import
import WidgetFive from './components/WidgetFive.vue';
import FundCard from './components/FundCard.vue';
import UserCard from './components/UserCard.vue';
import FeatureCard from './components/FeatureCard.vue';
import StorageCard from './components/StorageCard.vue';

const page = ref({ title: 'Statistics' });
const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#'
  },
  {
    title: 'Statistics',
    disabled: true,
    href: '#'
  }
]);

const cards = shallowRef([
  { earn: '$30200', text: 'All Earnings', icon: 'custom-graph-outline', color: 'secondary' },
  { earn: '145', text: 'Task', icon: 'custom-calendar-outline', color: 'error' },
  { earn: '290+', text: 'Page Views', icon: 'custom-document-text-outline', color: 'success' },
  { earn: '500', text: 'Downloads', icon: 'custom-document-2', color: 'primary' }
]);

const twocards = shallowRef([
  { title: 'Revenue', earn: '$4,500', text: '$50,032 Last Month', icon: 'custom-dollar-circle-fill', color: 'primary' },
  { title: 'Orders Received', earn: '486', text: '20% Increase', icon: 'custom-calendar-plus', color: 'warning' },
  { title: 'Total Sales', earn: '1641', text: '$1,055 Revenue Generated', icon: 'e-commerce-cart', color: 'success' }
]);

const threecards = shallowRef([
  { earn: '1165 +', text: 'Facebook Users', icon: 'custom-facebook-fill', color: 'primary' },
  { earn: '780 +', text: 'Dribbble Posts', icon: 'custom-dribble-fill', color: 'info' },
  { earn: '998 +', text: 'iOS Users', icon: 'custom-apple-fill', color: 'darksecondary' },
  { earn: '650 +', text: 'Youtube Videos', icon: 'custom-youtube-fill', color: 'error' }
]);

const fourcards = shallowRef([
  { earn: '1,563', text: 'Impressions', icon: 'custom-eye', color: 'primary', color2: 'lightprimary', duedate: 'May 23 - June 01 (2022)' },
  {
    earn: '30,564',
    text: 'Goal',
    icon: 'custom-goal-outline',
    color: 'success',
    color2: 'lightsuccess',
    duedate: 'May 28 - June 01 (2022)'
  },
  {
    earn: '42.6%',
    text: 'Impact',
    icon: 'custom-clock-outline',
    color: 'warning',
    color2: 'lightwarning',
    duedate: 'May 30 - June 01 (2022)'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 1 -->
  <!-- --------------------------------------------------------------------- -->
  <v-row class="mb-0">
    <v-col cols="12" sm="6" md="3" v-for="(card1, i) in cards" :key="i" :value="card1">
      <v-card elevation="0" rounded="lg">
        <v-card variant="outlined" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h3 class="text-h3 mb-1">{{ card1.earn }}</h3>
                <span class="text-lightText">{{ card1.text }}</span>
              </div>
              <span class="d-flex align-center">
                <SvgSprite :name="card1.icon || ''" style="width: 44px; height: 44px" :class="'text-' + card1.color" />
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 2 -->
  <!-- --------------------------------------------------------------------- -->
  <v-row class="mb-0">
    <v-col cols="12" sm="6" md="3" v-for="(card3, i) in threecards" :key="i" :value="card3">
      <v-card elevation="0" :class="'hover-icon-card bg-' + card3.color">
        <v-card elevation="0" :class="'bg-' + card3.color">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h3 class="text-h3 text-surface mb-0">{{ card3.earn }}</h3>
                <span class="text-h6 text-surface">{{ card3.text }}</span>
              </div>
              <span class="d-flex align-center">
                <SvgSprite :name="card3.icon || ''" style="width: 52px; height: 52px" class="text-surface opacity-50 hover-icon" />
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 3-->
  <!-- --------------------------------------------------------------------- -->
  <WidgetFive />

  <v-row class="mb-0">
    <v-col cols="12" md="4">
      <FundCard />
    </v-col>
    <v-col cols="12" md="4">
      <v-row>
        <v-col cols="12">
          <UserCard />
        </v-col>
        <v-col cols="12">
          <FeatureCard />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4">
      <StorageCard />
    </v-col>
  </v-row>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 4 -->
  <!-- --------------------------------------------------------------------- -->
  <v-row class="mb-0">
    <v-col cols="12" md="4" v-for="(card2, i) in twocards" :key="i" :value="card2">
      <v-card elevation="0" rounded="lg" :class="`bg-${card2.color} widget-gradient overflow-hidden`">
        <v-card variant="outlined" class="overflow-hidden" rounded="lg">
          <v-card-text class="px-md-9 py-md-8 px-5 py-5">
            <div class="d-flex justify-space-between">
              <span class="d-flex">
                <SvgSprite :name="card2.icon || ''" style="width: 52px; height: 52px" class="text-surface opacity-50" />
              </span>
              <div class="text-end">
                <h5 class="text-h5 font-weight-medium mb-2">{{ card2.title }}</h5>
                <h3 class="text-h3 mb-4">{{ card2.earn }}</h3>
                <span class="text-medium-emphasis text-h5 font-weight-regular text-surface">{{ card2.text }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>

  <!-- --------------------------------------------------------------------- -->
  <!-- Cards 5 -->
  <!-- --------------------------------------------------------------------- -->
  <v-row>
    <v-col cols="12" md="4" v-for="(card4, i) in fourcards" :key="i" :value="card4">
      <v-card elevation="0" rounded="lg">
        <v-card variant="outlined" rounded="lg">
          <v-card-text>
            <div class="d-flex align-items-center justify-space-between">
              <div>
                <h5 class="text-h5">{{ card4.text }}</h5>
                <h4 class="text-h4 my-2">{{ card4.earn }}</h4>
                <h6 class="text-subtitle-2 mb-0">{{ card4.duedate }}</h6>
              </div>
              <span class="d-flex align-center">
                <v-avatar variant="tonal" size="52" :color="card4.color" rounded="md">
                  <SvgSprite :name="card4.icon || ''" style="width: 28px; height: 28px" />
                </v-avatar>
              </span>
            </div>
          </v-card-text>
        </v-card>
      </v-card>
    </v-col>
  </v-row>
</template>
