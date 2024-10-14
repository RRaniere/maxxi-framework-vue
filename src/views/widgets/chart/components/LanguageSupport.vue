<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useTheme } from 'vuetify';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const theme = useTheme();

const currentTheme = ref(theme.current.value.colors);

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

const menulist = ref(['Name', 'Date', 'Rating', 'Unread']);

const overviewList = ref(['React', 'Angular', 'Bootstrap', 'MUI']);

const chartOptions = computed(() => {
  const primaryColor = currentTheme.value.primary;

  return {
    chart: {
      type: 'area',
      height: 130,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: { enabled: true },
      toolbar: {
        show: false
      }
    },
    colors: [primaryColor],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    stroke: {
      curve: 'smooth',
      width: 1.5
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        bottom: 0,
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
const areaChart = {
  series: [
    {
      name: 'Income',
      data: [100, 140, 100, 250, 115, 125, 90, 100, 140, 100, 230, 115, 215, 90, 190, 100, 120, 180]
    }
  ]
};
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text>
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Languages support</h5>
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
    <v-card-item class="pt-0">
      <div class="d-flex align-center mb-2">
        <v-avatar color="secondary" size="32" rounded="md" variant="tonal">
          <SvgSprite name="custom-fall-outline" style="width: 18px; height: 18px" />
        </v-avatar>
        <h6 class="text-subtitle-1 mb-0 ms-3">
          Update version
          <v-chip color="success" variant="flat" class="ms-3" rounded="md" size="small">v1.1.0</v-chip>
        </h6>
      </div>
      <apexchart type="area" height="130" :options="chartOptions" :series="areaChart.series"> </apexchart>
      <v-row class="mt-2">
        <v-col cols="6" md="6" sm="3" v-for="(item, index) in overviewList" :key="index">
          <v-btn color="secondary" variant="outlined" rounded="md" block>
            {{ item }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-item>
  </v-card>
</template>
