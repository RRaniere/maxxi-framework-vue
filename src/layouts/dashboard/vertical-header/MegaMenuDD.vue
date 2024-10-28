<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';

// assets
import imageChart from '@/assets/images/mega-menu/chart.svg';

const dropdownMenu = shallowRef([
  { header: 'Authentication' },
  { header: 'Other pages' },
  { header: 'SASS Pages' },
  {
    link: 'Login',
    href: 'auth/login1'
  },
  {
    link: 'FAQs',
    href: 'pages/faq'
  },
  {
    link: '404 Error',
    href: 'pages/error'
  },
  {
    link: 'Register',
    href: 'auth/register1'
  },
  {
    link: 'Contact us',
    href: 'pages/contact-us'
  },
  {
    link: 'Landing',
    href: ''
  },
  {
    link: 'Reset Password',
    href: 'auth/reset-pwd1'
  },
  {
    link: 'Pricing',
    href: 'pages/pricing1'
  },
  {},
  {
    link: 'Forgot Password',
    href: 'auth/forgot-pwd1'
  },
  {
    link: 'Privacy policy',
    href: 'pages/privacy-policy'
  },
  {},
  {
    link: 'Verification code',
    href: 'auth/code-verify1'
  },
  {
    link: 'Construction',
    href: 'pages/construction'
  },
  {},
  {},
  {
    link: 'Coming soon',
    href: 'pages/comingsoon1'
  }
]);

const relativeURL = ref<string | null>(null);

onMounted(async () => {
  try {
    relativeURL.value = await import.meta.env.BASE_URL;
  } catch (error) {
    console.error('Error url not found:', error);
  }
});
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- mega menu DD -->
  <!-- ---------------------------------------------- -->
  <div>
    <v-row class="ma-0">
      <v-col cols="12" lg="4" class="pa-0">
        <div class="megamenu-banner pa-9">
          <h2 class="text-h2 text-surface mb-1">Explore Components</h2>
          <p class="text-h6 text-surface mb-0">Try Able Pro's component pages to check how it feels and suits as per your need.</p>
          <div class="d-flex justify-between align-end">
            <v-btn rounded="md" variant="flat" class="scale-hover" :href="`${relativeURL}components/buttons`" target="_">
              View All
              <svg class="pc-icon ms-1 text-primary">
                <use xlink:href="/assets/svg/sprite.svg#custom-chevron-right"></use>
              </svg>
            </v-btn>
            <v-img :src="imageChart" alt="chart" width="124" height="126" />
          </div>
        </div>
      </v-col>
      <v-col cols="12" lg="8" class="pa-0">
        <v-list density="compact" class="overflow-hidden pt-6 px-4" aria-label="mega menu list" aria-busy="true">
          <v-row no-gutters>
            <template v-for="(item, i) in dropdownMenu" :key="i">
              <v-col cols="6" sm="4">
                <v-list-item v-if="item.header" rounded="md">
                  <v-list-item-title class="text-subtitle-1">{{ item.header }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  v-if="item.link"
                  :href="`${relativeURL}${item.href}`"
                  rounded="md"
                  variant="plain"
                  color="lightText"
                  target="_blank"
                  class="no-spacer"
                >
                  <template v-slot:prepend>
                    <v-icon class="text-8 me-4 text-lightText" icon="$circleOutline"></v-icon>
                  </template>
                  <v-list-item-title class="text-subtitle-1 font-weight-regular text-lightText">{{ item.link }} </v-list-item-title>
                </v-list-item>
              </v-col>
            </template>
          </v-row>
        </v-list>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss">
.megamenu-banner {
  background: rgb(var(--v-theme-darkprimary));
  height: 100%;
  padding-bottom: 37px !important;
  background-repeat: no-repeat;
  background-position: bottom;
  width: 100%;
  position: relative;
  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 70%;
    background: url('@/assets/images/mega-menu/back.svg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: bottom;
    bottom: 0;
    left: 0;
    opacity: 0.5;
  }
  .d-flex {
    position: relative;
    z-index: 1;
    .v-img {
      object-fit: cover;
      margin-right: -90px;
      margin-bottom: -20px;
      width: 124px;
      [dir='rtl'] & {
        margin-right: unset;
        margin-left: -90px;
      }
    }
  }
}
.v-btn {
  &.scale-hover {
    &:hover {
      transform: scale(1.05);
    }
  }
}
.v-menu {
  .v-list-item__prepend {
    > .v-icon {
      --v-medium-emphasis-opacity: 1;
    }
  }
  .v-list[aria-label='mega menu list'] {
    .v-list-item--link {
      .text-lightText {
        &:hover {
          color: rgb(var(--v-theme-primary)) !important;
        }
      }
    }
  }

  .v-list-item--variant-plain {
    opacity: 1;
    &:hover {
      color: rgb(var(--v-theme-primary));
    }
  }
}
</style>