<script setup lang="ts">
import { onMounted, watch, computed } from 'vue';
import { useTheme } from 'vuetify';
import { RouterView } from 'vue-router';
import LoaderWrapper from './LoaderWrapper.vue';
import VerticalSidebarVue from './vertical-sidebar/VerticalSidebar.vue';
import VerticalHeaderVue from './vertical-header/VerticalHeader.vue';
import { useCustomizerStore } from '../../stores/customizer';
import { DirAttrSet, HexToRgb } from '@/utils/utils';
const customizer = useCustomizerStore();
const theme = useTheme();

// Set the initial direction attribute when the component is mounted
onMounted(() => {
  DirAttrSet(customizer.isRtl ? 'rtl' : 'ltr');
});

// Watch for changes in the isRtl property and update the direction attribute accordingly
watch(
  () => customizer.isRtl,
  (newValue) => {
    DirAttrSet(newValue ? 'rtl' : 'ltr');
  }
);

// Define the computed property to calculate the dynamic style object
const dynamicStyle = computed(() => ({
  '--v-theme-primary': HexToRgb(theme.current.value.colors.primary),
  '--v-theme-darkprimary': HexToRgb(theme.current.value.colors.darkprimary),
  '--v-theme-lightprimary': HexToRgb(theme.current.value.colors.lightprimary)
}));

// Method to conditionally apply the preset class
const getStyleObject = () => {
  // Define your condition here, for example:
  const condition = true; // Replace this with your actual condition

  return condition ? dynamicStyle.value : {};
};
</script>

<template>
  <v-locale-provider :rtl="customizer.isRtl">
    <v-app
      :style="getStyleObject()"
      :theme="customizer.actTheme"
      :class="[
        customizer.actTheme,
        customizer.fontTheme,
        customizer.miniSidebar ? 'mini-sidebar' : '',
        customizer.isHorizontalLayout ? 'horizontalLayout' : 'verticalLayout',
        customizer.inputBg ? 'inputWithbg' : '',
        customizer.themeContrast ? 'contrast' : ''
      ]"
    >
      <Customizer />
      <VerticalSidebarVue v-if="!customizer.isHorizontalLayout" />
      <VerticalHeaderVue v-if="!customizer.isHorizontalLayout" />
      <HorizontalHeader v-if="customizer.isHorizontalLayout" />
      <HorizontalSidebar v-if="customizer.isHorizontalLayout" />
      <v-main class="page-wrapper">
        <v-container fluid>
          <div :class="customizer.boxed ? 'maxWidth' : ''">
            <!-- Loader start -->
            <LoaderWrapper />
            <!-- Loader end -->
            <RouterView />
          </div>
        </v-container>
       
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
