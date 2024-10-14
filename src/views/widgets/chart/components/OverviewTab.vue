<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const overviewData = shallowRef([
  {
    color: 'error',
    icon: 'custom-graph-outline',
    name: 'Total Sales',
    price: '1,800',
    interest: '-245',
    rateicon: 'custom-fall-outline',
    rate: '10.6%'
  },
  {
    color: 'success',
    icon: 'custom-home-trending-outline',
    name: 'Revenue',
    price: '$5,667',
    interest: '+2,100',
    rateicon: 'custom-rise-outline',
    rate: '30.6%'
  },
  {
    color: 'warning',
    icon: 'custom-shopping-cart',
    name: 'Abandon Cart',
    price: '128',
    interest: '-26',
    rateicon: 'custom-bidirectional',
    rate: '5%'
  },
  {
    color: 'success',
    icon: 'custom-spent-outline',
    name: 'Ads Spent',
    price: '$2,500',
    interest: '+200',
    rateicon: 'custom-rise-outline',
    rate: '10.6%'
  }
]);

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 250,
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))',
      toolbar: {
        show: false
      }
    },
    colors: ['rgba(var(--v-theme-primary), var(--v-high-opacity))', 'rgba(var(--v-theme-darkprimary), var(--v-half-opacity))'],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
    },
    stroke: {
      show: true,
      width: 3,
      colors: ['transparent']
    },
    fill: {
      opacity: [1, 0.5]
    },
    grid: {
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))',
      strokeDashArray: 4,
      padding: {
        bottom: -10
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left'
    }
  };
});

// chart 1
const barChart1 = {
  series: [
    {
      name: 'Net Profit',
      data: [76, 85, 101, 98, 87, 105, 91]
    },
    {
      name: 'Revenue',
      data: [44, 55, 57, 56, 61, 58, 63]
    }
  ]
};

const barChart2 = {
  series: [
    {
      name: 'Net Profit',
      data: [80, 101, 90, 65, 120, 105, 85]
    },
    {
      name: 'Revenue',
      data: [45, 30, 57, 45, 78, 48, 63]
    }
  ]
};

const barChart3 = {
  series: [
    {
      name: 'Net Profit',
      data: [79, 85, 107, 95, 83, 115, 97]
    },
    {
      name: 'Revenue',
      data: [48, 56, 50, 54, 68, 53, 65]
    }
  ]
};

const barChart4 = {
  series: [
    {
      name: 'Net Profit',
      data: [90, 111, 105, 55, 70, 65, 75]
    },
    {
      name: 'Revenue',
      data: [55, 80, 57, 45, 38, 48, 43]
    }
  ]
};

const tab = ref(0);
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-item class="py-0">
      <v-tabs v-model="tab" color="primary" height="58">
        <v-tab value="one" class="me-1 py-6" rounded="0"> Overview </v-tab>
        <v-tab value="two" class="py-6" rounded="0"> Marketing </v-tab>
        <v-tab value="three" class="py-6" rounded="0"> Project </v-tab>
        <v-tab value="four" class="py-6" rounded="0"> Order </v-tab>
      </v-tabs>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text class="rounded-md overflow-hidden">
      <v-row>
        <v-col cols="12" class="text-end">
          <v-row>
            <v-col cols="12" md="8" sm="6" class="pb-sm-3 pb-0">
              <div class="d-flex justify-end ga-2 align-center mb-4">
                <v-autocomplete
                  id="autocomplete-input"
                  model-value="Today"
                  aria-label="select"
                  :items="menulist"
                  color="primary"
                  variant="outlined"
                  hide-details
                  density="compact"
                  style="max-width: 120px"
                ></v-autocomplete>
                <v-btn icon rounded="md" aria-label="tab" size="small" color="secondary" variant="outlined">
                  <SvgSprite name="custom-edit-outline" style="width: 18px; height: 18px" />
                </v-btn>
                <v-btn icon rounded="md" aria-label="tab" size="small" color="secondary" variant="outlined">
                  <SvgSprite name="custom-full-screen-outline" style="width: 18px; height: 18px" />
                </v-btn>
                <v-btn icon rounded="md" aria-label="tab" size="small" color="secondary" variant="outlined">
                  <SvgSprite name="custom-more-outline" style="width: 18px; height: 18px" />
                </v-btn>
              </div>
              <v-window v-model="tab">
                <v-window-item value="one">
                  <apexchart type="bar" height="250" :options="chartOptions1" :series="barChart1.series"> </apexchart>
                </v-window-item>
                <v-window-item value="two">
                  <apexchart type="bar" height="250" :options="chartOptions1" :series="barChart2.series"> </apexchart>
                </v-window-item>
                <v-window-item value="three">
                  <apexchart type="bar" height="250" :options="chartOptions1" :series="barChart3.series"> </apexchart>
                </v-window-item>
                <v-window-item value="four">
                  <apexchart type="bar" height="250" :options="chartOptions1" :series="barChart4.series"> </apexchart>
                </v-window-item>
              </v-window>
            </v-col>
            <v-col cols="12" md="4" sm="6" class="pt-sm-3 pt-0">
              <v-list border aria-label="overview list" aria-busy="true" class="py-0">
                <v-list-item v-for="(item, i) in overviewData" :key="i" class="py-5">
                  <template v-slot:prepend>
                    <v-avatar size="40" color="secondary" rounded="md" variant="tonal">
                      <SvgSprite :name="item.icon || ''" style="width: 20px; height: 20px" />
                    </v-avatar>
                  </template>
                  <div class="text-start">
                    <p class="text-body-1 mb-0 text-lightText">{{ item.name }}</p>
                    <h6 class="text-subtitle-1 mb-0">{{ item.price }}</h6>
                  </div>
                  <template v-slot:append>
                    <div>
                      <h6 class="text-subtitle-1 mb-0">{{ item.interest }}</h6>
                      <p :class="'mb-0 text-' + item.color">
                        <SvgSprite
                          :name="item.rateicon || ''"
                          style="width: 14px; height: 14px; vertical-align: -3px"
                          :style="item.rateicon == 'custom-bidirectional' ? '' : 'transform:rotate(45deg)'"
                        />
                        {{ item.rate }}
                      </p>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
