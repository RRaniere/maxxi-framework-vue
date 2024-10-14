<script setup lang="ts">
import { ref } from 'vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';

// import components
import ChartCards from './components/ChartCards.vue';
import IncomeOverview from './components/IncomeOverview.vue';
import IncomeCompare from './components/IncomeCompare.vue';
import SalesReport from './components/SalesReport.vue';
import AcquisitionChannels from './components/AcquisitionChannels.vue';
import RepeatCustomer from './components/RepeatCustomer.vue';
import ProjectOverview from './components/ProjectOverview.vue';
import TotalEarning from './components/TotalEarning.vue';
import TotalEarning2 from './components/TotalEarning2.vue';
import NewOrder from './components/NewOrder.vue';
import NewUser from './components/NewUser.vue';
import NewUser2 from './components/NewUser2.vue';
import OverviewTab from './components/OverviewTab.vue';
import OverviewCard from './components/OverviewCard.vue';
import TotalIncome from './components/TotalIncome.vue';
import LanguageSupport from './components/LanguageSupport.vue';
import MonthlyReport from './components/MonthlyReport.vue';

const page = ref({ title: 'Charts' });
const breadcrumbs = ref([
  {
    title: 'Widget',
    disabled: false,
    href: '#'
  },
  {
    title: 'Charts',
    disabled: true,
    href: '#'
  }
]);
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

  <ChartCards />

  <v-row class="mb-0">
    <v-col cols="12" xl="9" md="8">
      <v-row>
        <v-col cols="12">
          <RepeatCustomer />
        </v-col>
        <v-col cols="12">
          <ProjectOverview />
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <IncomeOverview />
        </v-col>
        <v-col cols="12" md="6" sm="6">
          <v-row>
            <v-col cols="12">
              <TotalEarning />
            </v-col>
            <v-col cols="12">
              <TotalEarning2 />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" xl="3" md="4">
      <v-row>
        <v-col cols="12">
          <NewOrder />
        </v-col>
        <v-col cols="12" md="12" sm="6">
          <NewUser />
        </v-col>
        <v-col cols="12" md="12" sm="6">
          <NewUser2 />
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row class="mb-0">
    <v-col cols="12">
      <OverviewTab />
    </v-col>
  </v-row>

  <v-row class="mb-0">
    <v-col cols="12" md="6">
      <OverviewCard />
    </v-col>
    <v-col cols="12" md="6">
      <TotalIncome />
    </v-col>
  </v-row>

  <v-row class="mb-0">
    <v-col cols="12" md="4">
      <LanguageSupport />
    </v-col>
    <v-col cols="12" md="8">
      <MonthlyReport />
    </v-col>
  </v-row>

  <v-row class="mb-0">
    <v-col cols="12" md="8">
      <SalesReport />
    </v-col>
    <v-col cols="12" md="4">
      <AcquisitionChannels />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" md="8">
      <IncomeCompare />
    </v-col>
  </v-row>
</template>
