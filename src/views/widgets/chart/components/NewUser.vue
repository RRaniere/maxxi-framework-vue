<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const theme = useTheme();
const successColor = theme.current.value.colors.success;

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 80,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      toolbar: {
        show: false
      }
    },
    colors: [successColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    stroke: {
      curve: 'smooth',
      width: 1
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    grid: {
      show: false,
      padding: {
        top: -28,
        bottom: -15,
        left: -10
      }
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      },
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: {
          formatter: () => ''
        }
      }
    }
  };
});

// chart 1
const areaChart1 = {
  series: [
    {
      name: 'Income',
      data: [1, 1, 60, 1, 1, 50, 1, 1, 40, 1, 1, 25, 0]
    }
  ]
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center mb-5">
        <h5 class="text-h5 mb-0">New Users</h5>
        <v-autocomplete
          id="autocomplete-input"
          model-value="Monthly"
          aria-label="select"
          :items="menulist"
          color="primary"
          variant="outlined"
          hide-details
          density="compact"
          style="max-width: 120px"
        ></v-autocomplete>
      </div>
      <apexchart type="area" height="80" :options="chartOptions1" :series="areaChart1.series"> </apexchart>
      <div class="d-flex ga-2 justify-center pt-1 pb-4">
        <h6 class="text-subtitle-1 mb-0">$30,200</h6>
        <p class="text-body-1 text-success mb-0">
          <SvgSprite name="custom-rise-outline" style="width: 16px; height: 16px; transform: rotate(45deg)" />
          30.6%
        </p>
      </div>
      <v-btn color="secondary" variant="outlined" rounded="md" block>View More</v-btn>
    </v-card-text>
  </v-card>
</template>
