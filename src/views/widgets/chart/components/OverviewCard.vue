<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue';
import { useTheme } from 'vuetify';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const theme = useTheme();
const secondaryColor = theme.current.value.colors.secondary;
const darksecondaryColor = theme.current.value.colors.darksecondary;

const overviewList = shallowRef([
  {
    name: 'Apps',
    subcontent: '10+'
  },
  {
    name: 'Other',
    subcontent: '5+'
  },
  {
    name: 'Widgets',
    subcontent: '150+'
  },
  {
    name: 'Forms',
    subcontent: '50+'
  },
  {
    name: 'Components',
    subcontent: '200+'
  },
  {
    name: 'Pages',
    subcontent: '150+'
  }
]);

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'pie',
      height: 350,
      width: 350,
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-darkText), var(--v-high-opacity))'
    },
    labels: ['Components', 'Widgets', 'Pages', 'Forms', 'Other', 'Apps'],
    colors: [
      'rgba(var(--v-theme-darkprimary), var(--v-high-opacity))',
      'rgba(var(--v-theme-primary), var(--v-half-opacity))',
      secondaryColor,
      darksecondaryColor,
      'rgba(var(--v-theme-darksecondary), var(--v-high-opacity))',
      'rgba(var(--v-theme-darkText), var(--v-high-opacity))'
    ],
    legend: {
      show: false
    },
    fill: {
      opacity: [1, 0.5, 0.3, 0.8, 1, 1]
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: 250,
            height: 250
          },
          legend: {
            show: false
          }
        }
      },
      {
        breakpoint: 960,
        options: {
          legend: {
            show: false
          }
        }
      },
      {
        breakpoint: 1280,
        options: {
          legend: {
            show: false
          }
        }
      },
      {
        breakpoint: 1550,
        options: {
          legend: {
            show: false
          }
        }
      }
    ]
  };
});
const pieChart = {
  series: [40, 20, 10, 15, 5, 10]
};
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Project overview</h5>
        <v-menu width="150" location="start">
          <template v-slot:activator="{ props }">
            <v-btn icon color="secondary" aria-label="menu" variant="text" rounded="md" size="small" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px; transform: rotate(90deg)" />
            </v-btn>
          </template>
          <v-list elevation="24" class="pa-3" rounded="md" aria-label="menu" aria-busy="true">
            <v-list-item density="compact" rounded="md" color="secondary" v-for="(item, index) in menulist" :key="index" :value="index">
              <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-text>
    <v-card-item class="pt-0 px-0">
      <div class="apexchart-center">
        <apexchart type="pie" height="350" :options="chartOptions" :series="pieChart.series"> </apexchart>
      </div>
      <v-row class="mt-2 mx-0 px-3">
        <v-col cols="12" xl="4" md="6" sm="4" v-for="(item, index) in overviewList" :key="index">
          <v-card variant="outlined" rounded="lg">
            <v-card-item class="py-3">
              <div class="d-flex justify-center">
                <v-avatar size="6" color="darkText" variant="flat" class="mt-2 me-3"> </v-avatar>
                <div>
                  <p class="text-body-1 mb-0">
                    {{ item.name }}
                  </p>
                  <h6 class="text-subtitle-1 mb-0">{{ item.subcontent }}</h6>
                </div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-btn color="secondary" variant="outlined" rounded="md" block>View all</v-btn>
        </v-col>
        <v-col cols="6" class="ps-0">
          <v-btn color="primary" variant="flat" rounded="md" block>Create new page</v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
