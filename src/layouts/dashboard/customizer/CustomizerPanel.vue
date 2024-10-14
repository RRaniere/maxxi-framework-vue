<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useCustomizerStore } from '@/stores/customizer';

// Store instance for customizer settings
const customizer = useCustomizerStore();

// Define an enum for theme values
enum Theme {
  Light = 'light',
  Dark = 'dark',
  System = 'system'
}

// Contrast state
const contrast = ref(true);

// RTL mode state
const rtlmode = ref(true);

// Define a type for theme color options
interface ThemeColor {
  bg: string;
  color: string;
  darkColor: string;
  lightcolor: string;
  lightcolorfordark: string;
  label: string;
}

// themes color options
const themeColors = ref<ThemeColor[]>([
  {
    bg: 'themeDefault',
    color: '#4680ff',
    darkColor: '#3F78FF',
    lightcolor: '#E9F0FF',
    lightcolorfordark: '#18243e',
    label: 'default'
  },
  {
    bg: 'themeLightTheme1',
    color: '#3366ff',
    darkColor: '#254EDB',
    lightcolor: '#D6E4FF',
    lightcolorfordark: '#1c2134',
    label: 'theme1'
  },
  {
    bg: 'themeLightTheme2',
    color: '#7265e6',
    darkColor: '#6A5DE3',
    lightcolor: '#EEEDFC',
    lightcolorfordark: '#222130',
    label: 'theme2'
  },
  {
    bg: 'themeLightTheme3',
    color: '#068e44',
    darkColor: '#006933',
    lightcolor: '#E6F3EC',
    lightcolorfordark: '#1a231f',
    label: 'theme3'
  },
  {
    bg: 'themeLightTheme4',
    color: '#3c64d0',
    darkColor: '#2947ab',
    lightcolor: '#f0f6ff',
    lightcolorfordark: '#1d212d',
    label: 'theme4'
  },
  {
    bg: 'themeLightTheme5',
    color: '#f27013',
    darkColor: '#cc5206',
    lightcolor: '#fff4e6',
    lightcolorfordark: '#32221a',
    label: 'theme5'
  },
  {
    bg: 'themeLightTheme6',
    color: '#2aa1af',
    darkColor: '#1a7b8a',
    lightcolor: '#e1f0ef',
    lightcolorfordark: '#1c2628',
    label: 'theme6'
  },
  {
    bg: 'themeLightTheme7',
    color: '#00a854',
    darkColor: '#008245',
    lightcolor: '#d1e8d99c',
    lightcolorfordark: '#1a2721',
    label: 'theme7'
  },
  {
    bg: 'themeLightTheme8',
    color: '#009688',
    darkColor: '#007069',
    lightcolor: '#c1d6d066',
    lightcolorfordark: '#1a2524',
    label: 'theme8'
  }
]);

// Get the Vuetify theme instance
const vuetifyTheme = useTheme();

// Define refs for primary and dark primary colors
const customPrimaryColor = ref<string>('#4680FF');
const customDarkPrimaryColor = ref<string>('#3F78FF');
const customLightPrimaryColor = ref<string>('#E9F0FF');
const customLightPrimaryColorForDark = ref<string>('#000000');

// Watch for changes in the primary colors and update the theme accordingly
watch(
  [customPrimaryColor, customDarkPrimaryColor, customLightPrimaryColor, customLightPrimaryColorForDark],
  ([newPrimaryColor, newDarkPrimaryColor, newLightPrimaryColor, newLightPrimaryColorForDark]) => {
    vuetifyTheme.themes.value.light.colors.primary = newPrimaryColor;
    vuetifyTheme.themes.value.light.colors.darkprimary = newDarkPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.primary = newPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.darkprimary = newDarkPrimaryColor;

    vuetifyTheme.themes.value.light.colors.lightprimary = newLightPrimaryColor;
    vuetifyTheme.themes.value.dark.colors.lightprimary = newLightPrimaryColorForDark;
  }
);

// Function to set primary and dark primary colors
const setPrimaryColors = (primaryColor: string, darkPrimaryColor: string, lightPrimaryColor: string, lightPrimaryColorForDark: string) => {
  customPrimaryColor.value = primaryColor;
  customDarkPrimaryColor.value = darkPrimaryColor;

  customLightPrimaryColor.value = lightPrimaryColor;
  customLightPrimaryColorForDark.value = lightPrimaryColorForDark;
};

// Ref for the selected color index
const selectedColorIndex = ref<number>(0);

// Set the default primary and dark primary colors
setPrimaryColors(
  themeColors.value[selectedColorIndex.value].color,
  themeColors.value[selectedColorIndex.value].darkColor,
  themeColors.value[selectedColorIndex.value].lightcolor,
  themeColors.value[selectedColorIndex.value].lightcolorfordark
);

// Function to select a color and update the primary and dark primary colors
const selectColor = (color: string, darkColor: string, lightcolor: string, lightcolorfordark: string, index: number) => {
  selectedColorIndex.value = index;
  setPrimaryColors(color, darkColor, lightcolor, lightcolorfordark);
};

// Define font family options
const fontFamily = ref<string[]>(['Inter-var', 'Inter', 'Roboto', 'Poppins', 'Public sans']);

// for system mode
// Function to update the theme based on the user's preferred color scheme
const updateTheme = () => {
  const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  if (customizer.actTheme === Theme.System) customizer.SET_THEME(preferredColorScheme);
};

// Call updateTheme on component mounted
onMounted(() => {
  updateTheme();

  // Watch for changes in the user's preferred color scheme
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme);
});

// Watch for changes in the customizer's theme setting
watch(
  () => customizer.actTheme,
  (newValue, oldValue) => {
    if (newValue === Theme.System && newValue !== oldValue) updateTheme();
  }
);

function clearoptions() {
  customizer.actTheme = 'light';
  customizer.isHorizontalLayout = false;
  customizer.inputBg = false;
  customizer.themeContrast = false;
  customizer.boxed = false;
  customizer.fontTheme = 'Inter-var';
  customizer.isRtl = false;

  // Reset the selected color index to default (0)
  selectedColorIndex.value = 0;

  // Set the default primary and dark primary colors
  setPrimaryColors(
    themeColors.value[0].color,
    themeColors.value[0].darkColor,
    themeColors.value[0].lightcolor,
    themeColors.value[0].lightcolorfordark
  );
}
</script>

<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>
  <v-btn
    class="customizer-btn ms-sm-2 ms-1"
    icon
    color="white"
    aria-label="customizer button"
    rounded="sm"
    variant="flat"
    @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.customizerDrawer)"
  >
    <div class="text-primary">
      <SvgSprite name="custom-setting-2" style="width: 28px; height: 28px" />
    </div>
  </v-btn>
  <v-navigation-drawer
    app
    temporary
    elevation="24"
    location="end"
    border="0"
    v-model="customizer.customizerDrawer"
    width="350"
    class="customizer-panel"
    style="z-index: 1075"
  >
    <v-row class="ma-0">
      <v-col cols="12" class="pa-0">
        <div class="pa-5 d-flex justify-space-between align-center">
          <div class="text-h5">Settings</div>
          <div>
            <v-btn
              variant="text"
              icon
              aria-label="close"
              color="error"
              rounded="md"
              density="compact"
              @click.stop="customizer.SET_CUSTOMIZER_DRAWER(!customizer.customizerDrawer)"
            >
              <SvgSprite name="custom-close" style="width: 18px; height: 18px; transform: rotate(45deg)" />
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
    <perfect-scrollbar style="height: calc(100vh - 69px)">
      <div>
        <v-row class="ma-0">
          <v-col cols="12" class="pa-0">
            <div class="px-6">
              <!------------------------------------->
              <!-- start Light/Dark/System Mode -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0">Theme Mode</h6>
              <p class="text-caption mb-0">Choose light or dark mode</p>
              <v-radio-group v-model="customizer.actTheme" class="custom-radio-icon custom-radio-with-label mx-n2 mt-1 mb-3" hide-details>
                <v-radio :value="Theme.Light" color="primary" class="ma-2 pa-1 text-center" label="Light" style="display: flex">
                  <SvgSprite name="custom-sun" style="width: 24px; height: 24px" />
                </v-radio>
                <v-radio :value="Theme.Dark" color="primary" class="ma-2 pa-1 text-center" label="Dark" style="display: flex">
                  <SvgSprite name="custom-moon-fill" class="text-darkText" style="width: 24px; height: 24px" />
                </v-radio>
                <v-radio :value="Theme.System" color="primary" class="ma-2 pa-1 text-center" label="Auto" style="display: flex">
                  <SvgSprite name="custom-setting-fill" class="text-darkText" style="width: 24px; height: 24px" />
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- end Light/Dark/System Mode -->
              <!------------------------------------->
              <!------------------------------------->
              <!-- Theme contrast -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Theme Contrast</h6>
              <p class="text-caption mb-0">Choose theme contrast/shadow</p>
              <v-radio-group
                v-model="customizer.themeContrast"
                class="custom-radio-icon custom-radio-with-label mx-n2 mt-1 mb-3"
                hide-details
              >
                <v-radio :value="contrast" color="primary" class="ma-2 pa-1 text-center" label="Contrast" style="display: flex">
                  <SvgSprite name="custom-contrast-fill" style="width: 24px; height: 24px" />
                </v-radio>
                <v-radio :value="false" color="primary" class="ma-2 pa-1 text-center" label="No shadow" style="display: flex">
                  <SvgSprite name="custom-contrast-outline" style="width: 24px; height: 24px" />
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- end Theme contrast -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Menu Orientation</h6>
              <p class="text-caption mb-0">Choose Vertical or Horizontal Menu Orientation</p>
              <!-- sidebar layout -->
              <v-radio-group class="custom-radio-with-label mx-n2 mt-2 mb-3" v-model="customizer.isHorizontalLayout" hide-details>
                <v-radio :value="false" color="primary" class="ma-2 text-center" label="Vertical">
                  <img src="@/assets/images/customizer/vertical.svg" alt="menu layout" />
                </v-radio>
                <v-radio :value="true" color="primary" class="ma-2 text-center" label="Horizontal">
                  <img src="@/assets/images/customizer/horizontal.svg" alt="menu layout" />
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- Preset color -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Color Scheme</h6>
              <p class="text-caption mb-0">Choose your primary theme color</p>
              <v-card-item class="pa-0 mt-3 mb-4">
                <v-card-text class="px-0 py-0 colors-scheme">
                  <v-item-group mandatory class="d-flex flex-wrap ga-1">
                    <v-item v-for="(theme, index) in themeColors" :key="theme.color">
                      <div
                        class="d-flex flex-column bg-primary rounded-md"
                        :value="{
                          primary: theme.color,
                          darkPrimary: theme.darkColor,
                          lightprimary: theme.lightcolor || theme.lightcolorfordark
                        }"
                        :class="{
                          Selected: vuetifyTheme.current.value.colors.primary === theme.color
                        }"
                        @click="selectColor(theme.color, theme.darkColor, theme.lightcolor, theme.lightcolorfordark, index)"
                      >
                        <div :class="theme.bg" style="padding: 8px; height: 68px; border-radius: 4px">
                          <div class="text-white d-flex flex-column align-center">
                            <SvgSprite
                              :class="{
                                'd-none': vuetifyTheme.current.value.colors.primary !== theme.color
                              }"
                              name="custom-checked"
                              style="width: 24px; height: 24px"
                            />
                            <span
                              class="text-caption"
                              :class="{
                                'd-none': vuetifyTheme.current.value.colors.primary !== theme.color
                              }"
                              >{{ theme.label }}</span
                            >
                          </div>
                        </div>
                      </div>
                    </v-item>
                  </v-item-group>
                </v-card-text>
              </v-card-item>
              <v-divider />
              <!------------------------------------->
              <!-- end Preset color -->
              <!------------------------------------->
              <!------------------------------------->
              <!-- RTL layout -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Theme Layout</h6>
              <p class="text-caption mb-0">Choose your layout</p>
              <v-radio-group v-model="customizer.isRtl" class="custom-radio-with-label mx-n2 mt-2 mb-3" hide-details>
                <v-radio :value="false" color="primary" class="ma-2 text-center" label="Default">
                  <img src="@/assets/images/customizer/vertical.svg" alt="layout" />
                </v-radio>
                <v-radio :value="rtlmode" color="primary" class="ma-2 text-center" label="RTL">
                  <img src="@/assets/images/customizer/rtl.svg" alt="layout" />
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!------------------------------------->
              <!-- Boxed Container -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Layout Width</h6>
              <p class="text-caption mb-0">Choose fluid or container layout</p>
              <v-radio-group class="custom-radio-with-label mx-n2 mt-2 mb-3" v-model="customizer.boxed" hide-details>
                <v-radio :value="false" color="primary" class="ma-2 text-center" label="Fluid">
                  <img src="@/assets/images/customizer/fluid.svg" alt="layout" />
                </v-radio>
                <v-radio :value="true" color="primary" class="ma-2 text-center" label="Container">
                  <img src="@/assets/images/customizer/container.svg" alt="layout" />
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- End Box Container -->
              <!------------------------------------->
              <!------------------------------------->
              <!-- Input Outlined With Filled -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Input Background</h6>
              <p class="text-caption mb-0">Choose option with background or without background for input</p>
              <v-radio-group class="custom-radio input-radio mx-n2 mt-2 mb-4" v-model="customizer.inputBg" hide-details>
                <v-radio :value="true" color="primary" class="ma-2 input-bg px-3" label="With Background"> </v-radio>
                <v-radio :value="false" color="primary" class="ma-2 without-bg px-3" label="No Background"> </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- End Input Outlined With Filled -->
              <!------------------------------------->
              <!------------------------------------->
              <!-- Font Family -->
              <!------------------------------------->
              <h6 class="text-subtitle-1 mb-0 mt-5">Font Family</h6>
              <p class="text-caption mb-0">Choose your font family.</p>
              <v-radio-group v-model="customizer.fontTheme" hide-details class="custom-font mt-2 mb-3">
                <v-radio v-for="font in fontFamily" :key="font" :value="font" color="primary" class="mb-2 text-center">
                  <template v-slot:label>
                    <h5 :class="`${font} text-h5 mb-0`">Aa</h5>
                    <span class="text-caption text-lightText">{{ font }}</span>
                  </template>
                </v-radio>
              </v-radio-group>
              <v-divider />
              <!------------------------------------->
              <!-- end Font Family -->
              <!------------------------------------->
              <!------------------------------------->
              <div class="d-flex py-4">
                <v-btn color="error" variant="tonal" rounded="md" block @click="clearoptions"> Reset </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
<style lang="scss">
@keyframes progress-circular-rotate {
  100% {
    transform: rotate(270deg);
  }
}
.customizer-btn {
  top: 14%;
  position: fixed;
  right: 0;
  z-index: 1002;
  padding: 17px;
  --v-btn-height: unset;
  border-top-left-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
  box-shadow: rgb(var(--v-card-shadow));
  [dir='rtl'] & {
    right: unset;
    left: 0;
    border-radius: 0 30px 30px 0 !important;
  }
  .pc-icon {
    animation: progress-circular-rotate 1.4s linear infinite;
    transform-origin: center center;
    transition: all 0.2s ease-in-out;
  }
}
.customizer-accordion {
  .v-expansion-panel-title {
    padding: 16px;
  }
  .v-expansion-panel {
    border-width: 0;
    border-top: 1px solid rgb(var(--v-theme-borderLight));
    border-radius: 0;
    &.v-expansion-panel--active {
      .v-expansion-panel-title--active {
        .v-expansion-panel-title__overlay {
          background: transparent;
        }
      }
    }
    .v-expansion-panel-text__wrapper {
      padding: 16px;
      border-top: none;
    }
  }
  .v-expansion-panel-title {
    &:hover {
      > .v-expansion-panel-title__overlay {
        opacity: 0;
      }
    }
  }
}
.custom-radio {
  .v-selection-control-group {
    flex-direction: row;
    .v-selection-control {
      align-items: center;
      justify-content: center;
      flex: 1 0 0%;
      display: block;
      border-radius: 12px;
      box-shadow: 0 0 0 2px rgb(var(--v-theme-borderLight));
      .v-label {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }
      &.v-selection-control--dirty {
        box-shadow: 0 0 0 2px rgb(var(--v-theme-primary));
        width: 100%;
        flex: 1;
      }
      .v-selection-control__wrapper {
        z-index: 1;
        width: unset;
        height: unset;
        display: block;
        img {
          height: 62px;
          margin: 8px;
        }
        .v-selection-control__input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
.custom-radio-with-label {
  .v-selection-control-group {
    flex-direction: row;
    .v-selection-control {
      align-items: center;
      justify-content: center;
      flex: 1 0 0%;
      flex-direction: column;
      .v-selection-control__wrapper {
        border-radius: 12px;
        box-shadow: 0 0 0 2px rgb(var(--v-theme-borderLight));
      }
      .v-label {
        height: auto;
        font-size: 12px;
        margin-top: 8px;
      }
      &.v-selection-control--dirty {
        width: 100%;
        flex: 1;
        .v-selection-control__wrapper {
          box-shadow: 0 0 0 2px rgb(var(--v-theme-primary));
        }
      }
      .v-selection-control__wrapper {
        z-index: 1;
        width: unset;
        height: unset;
        img {
          height: 62px;
          margin: 8px;
        }
        .v-selection-control__input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
      }
    }
  }
}
.custom-radio-icon {
  .v-selection-control-group {
    .v-selection-control {
      .v-selection-control__wrapper {
        width: 100%;
        height: 58px;
      }
    }
  }
}
.colors-scheme {
  .Selected {
    width: 78px;
  }
}
.input-bg {
  background-color: rgb(var(--v-theme-containerBg)) !important;
}
.without-bg {
  background-color: rgb(var(--v-theme-surface)) !important;
}
.input-radio {
  .v-selection-control-group {
    .v-selection-control {
      height: 30px;
      width: 100%;
      border-radius: 4px;
      .v-label {
        padding-top: 0;
        opacity: 1;
        position: relative;
        font-size: 0.75rem;
      }
    }
  }
}
.custom-font {
  .v-selection-control-group {
    flex-direction: row;
    flex-wrap: wrap;
    .v-selection-control__wrapper {
      display: none;
    }
    .v-selection-control {
      border-radius: 4px;
      margin: 6px;
      padding: 8px;
      min-width: 80px;
      box-shadow: 0 0 0 2px rgb(var(--v-theme-borderLight));
      .v-label {
        display: block;
        text-align: center;
        --v-medium-emphasis-opacity: 1;
      }
      &.v-selection-control--dirty {
        box-shadow: 0 0 0 2px rgb(var(--v-theme-primary));
      }
    }
  }
  .v-selection-control {
    justify-content: center;
  }
}
</style>
