<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const SuccessColor = theme.current.value.colors.success;

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 100,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bar: {
        columnWidth: '85%'
      }
    },
    labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    colors: SuccessColor,
    stroke: {
      curve: 'smooth'
    },
    fill: {
      opacity: 0.85
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        bottom: -15
      }
    },
    tooltip: {
      x: {
        show: false
      }
    }
  };
});

// chart 1
const barChart1 = {
  series: [
    {
      name: 'Users',
      data: [10, 30, 40, 20, 60, 50, 20, 15, 20, 25, 30, 25]
    }
  ]
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between">
        <div>
          <v-avatar size="40" variant="tonal" color="secondary" rounded="md">
            <SvgSprite name="custom-dollar-circle-outline" style="width: 20px; height: 20px" />
          </v-avatar>
          <h6 class="text-subtitle-1 mb-0 mt-3">$30,200.00</h6>
          <span class="text-caption">Income</span>
        </div>
        <v-menu width="150" location="start">
          <template v-slot:activator="{ props }">
            <v-btn icon color="secondary" aria-label="menu" variant="text" rounded="md" size="small" v-bind="props">
              <SvgSprite name="custom-more-outline" style="width: 20px; height: 20px; transform: rotate(90deg)" />
            </v-btn>
          </template>
          <v-list elevation="24" class="pa-3" rounded="md" aria-label="menu" aria-busy="true">
            <v-list-item
              density="compact"
              rounded="md"
              color="secondary"
              aria-label="menu"
              aria-busy="true"
              v-for="(item, index) in menulist"
              :key="index"
              :value="index"
            >
              <v-list-item-title class="text-h6 text-lightText">{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <apexchart type="bar" height="80" class="mb-n3" :options="chartOptions1" :series="barChart1.series"> </apexchart>
    </v-card-text>
  </v-card>
</template>
