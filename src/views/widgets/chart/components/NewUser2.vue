<script setup lang="ts">
import { ref, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useTheme } from 'vuetify';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const theme = useTheme();
const warningColor = theme.current.value.colors.warning;

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'rangeBar',
      height: 90,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: { enabled: true },
      toolbar: {
        show: false
      }
    },
    colors: [warningColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    stroke: {
      curve: 'smooth',
      width: 1
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        borderRadius: 5,
        horizontal: false
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
const rangeChart1 = {
  series: [
    {
      data: [
        {
          x: 'Rejected',
          y: [1, 6]
        },
        {
          x: 'Pending',
          y: [3, 7]
        },
        {
          x: 'New',
          y: [4, 8]
        },
        {
          x: 'Verified',
          y: [5, 9]
        },
        {
          x: 'Store',
          y: [4, 8]
        },
        {
          x: 'Deleted',
          y: [4, 7]
        },
        {
          x: 'Block',
          y: [2, 5]
        }
      ]
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
      <apexchart type="rangeBar" height="90" :options="chartOptions1" :series="rangeChart1.series"> </apexchart>
      <div class="d-flex ga-2 justify-center pt-1 pb-4">
        <h6 class="text-subtitle-1 mb-0">$30,200</h6>
        <p class="text-body-1 text-error mb-0">
          <SvgSprite name="custom-fall-outline" style="width: 16px; height: 16px; transform: rotate(45deg); vertical-align: -3px" />
          30.6%
        </p>
      </div>
      <v-btn color="secondary" variant="outlined" rounded="md" block>View More</v-btn>
    </v-card-text>
  </v-card>
</template>
