<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();

const currentTheme = ref(theme.current.value.colors);
const warningColor = theme.current.value.colors.warning;

// Watch for changes in primary
watch(
  () => theme.current.value.colors.primary,
  (newColors) => {
    // Update currentTheme values when changes are detected
    currentTheme.value = {
      ...currentTheme.value,
      primary: newColors
    };
  }
);

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary;

  return {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: false
      },
      fontFamily: `inherit`,
      foreColor: 'rgba(var(--v-theme-secondary), var(--v-high-opacity))'
    },
    colors: ['rgba(var(--v-theme-darkprimary), var(--v-high-opacity))', primaryColor, primaryColor, warningColor],
    plotOptions: {
      bar: {
        columnWidth: '80%'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },

    xaxis: {
      categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    fill: {
      opacity: [1, 0.5, 0.2, 0.2]
    },
    grid: {
      strokeDashArray: 4,
      borderColor: 'rgba(var(--v-theme-borderLight), var(--v-high-opacity))'
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      }
    },
    legend: {
      show: false
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          yaxis: {
            show: false
          }
        }
      }
    ]
  };
});

const columnChart = {
  series: [
    {
      name: 'Deals',
      data: [44, 55, 41, 67, 52, 53, 13, 23, 20, 8, 13, 27]
    },
    {
      name: 'Income Report',
      data: [13, 23, 20, 8, 13, 27, 21, 7, 25, 13, 22, 8]
    },
    {
      name: 'Customer',
      data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14]
    },
    {
      name: 'Profits',
      data: [21, 7, 25, 13, 22, 3, 44, 55, 41, 67, 22, 12]
    }
  ]
};
</script>

<template>
  <v-card variant="outlined" elevation="0" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center mb-5">
        <h5 class="text-h5 mb-0">Monthly Report</h5>
        <v-autocomplete
          id="autocomplete-input"
          model-value="Today"
          :items="menulist"
          color="primary"
          variant="outlined"
          hide-details
          density="compact"
          style="max-width: 120px"
        ></v-autocomplete>
      </div>
      <apexchart type="bar" height="350" :options="chartOptions" :series="columnChart.series"> </apexchart>
    </v-card-text>
  </v-card>
</template>
