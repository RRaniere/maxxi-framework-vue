<script setup lang="ts">
import { shallowRef, computed, onMounted, ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useCustomizerStore } from '@/stores/customizer';
import { useChatStore } from '@/stores/apps/chat';

const customizer = useCustomizerStore();

const attach = shallowRef([
  {
    color: 'success',
    icon: 'custom-file-outline-2',
    name: 'Document',
    size: '123 files, 193MB'
  },
  {
    color: 'warning',
    icon: 'custom-picture-outline',
    name: 'Photos',
    size: '53 files, 321MB'
  },
  {
    color: 'primary',
    icon: 'custom-document-outline-1',
    name: 'Other',
    size: '49 files, 193MB'
  }
]);

const store = useChatStore();
onMounted(() => {
  store.fetchChats();
});

interface ChatItem {
  // Define the properties of a chat item here
  thumb: string;
  status: string;
  name: string;
  excerpt: string;
  // ... other properties as needed
}

const chatDetail = computed<ChatItem | undefined>(() => {
  return store.chats[store.chatContent];
});

const panel1 = ref([0]);
</script>
<template>
  <div v-if="chatDetail" class="customHeight pa-4">
    <div class="text-end">
      <v-btn color="error" aria-label="close" variant="text" icon rounded="md" size="small" @click="$emit('sToggle')">
        <SvgSprite name="custom-close" style="width: 16px; height: 16px; transform: rotate(45deg)" />
      </v-btn>
    </div>
    <div class="py-4">
      <div class="text-center">
        <v-avatar size="88" variant="outlined" color="primary">
          <img :src="chatDetail.thumb" alt="pro" width="88" height="88" class="rounded-circle" />
        </v-avatar>
        <h4 class="text-h5 mt-3 mb-0">{{ chatDetail.name }}</h4>
        <p class="text-caption text-lightText">{{ chatDetail.excerpt }}</p>
        <div class="d-flex ga-2 align-center justify-center">
          <SvgSprite
            :name="
              chatDetail.status === 'away'
                ? 'custom-away-fill'
                : chatDetail.status === 'do not disturb'
                  ? 'custom-disturb-fill'
                  : chatDetail.status === 'active'
                    ? 'custom-check-circle-fill'
                    : 'containerBg'
            "
            :class="
              chatDetail.status === 'away'
                ? 'text-warning'
                : chatDetail.status === 'do not disturb'
                  ? 'text-secondary'
                  : chatDetail.status === 'active'
                    ? 'text-success'
                    : 'text-containerBg'
            "
            style="width: 14px; height: 14px"
          />
          <v-chip
            :color="
              chatDetail.status === 'away'
                ? 'warning'
                : chatDetail.status === 'do not disturb'
                  ? 'secondary'
                  : chatDetail.status === 'active'
                    ? 'success'
                    : 'text-containerBg'
            "
            size="small"
            >{{
              chatDetail.status === 'away'
                ? 'Offline'
                : chatDetail.status === 'do not disturb'
                  ? 'Do not disturb'
                  : chatDetail.status === 'active'
                    ? 'Available'
                    : 'Offline'
            }}</v-chip
          >
        </div>
      </div>
      <div class="d-flex align-center justify-center ga-4 mt-6">
        <v-btn elevation="24" aria-label="mobile" icon rounded="md" size="small">
          <SvgSprite name="custom-mobile-outline-2" class="text-lightText ml-1" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn elevation="24" aria-label="mail" icon rounded="md" size="small">
          <SvgSprite name="custom-mail-outline" class="text-lightText" style="width: 20px; height: 20px" />
        </v-btn>
        <v-btn elevation="24" aria-label="camera" icon rounded="md" size="small">
          <SvgSprite name="custom-camera-outline" class="text-lightText" style="width: 20px; height: 20px" />
        </v-btn>
      </div>
      <div class="d-flex ga-4 mt-6">
        <div class="bg-lightprimary w-100 pa-4 rounded-lg">
          <h6 class="text-h6 text-primary mb-0">All File</h6>
          <div class="d-flex align-center">
            <SvgSprite name="custom-folder-open-outline" class="text-primary" />
            <h4 class="text-h4 mb-0 ms-2">231</h4>
          </div>
        </div>
        <div class="w-100 pa-4 rounded-lg" :class="customizer.actTheme === 'dark' ? 'bg-containerBg' : 'bg-gray100'">
          <h6 class="text-h6 mb-0">All Link</h6>
          <div class="d-flex align-center">
            <SvgSprite name="custom-link3" />
            <h4 class="text-h4 mb-0 ms-2">231</h4>
          </div>
        </div>
      </div>
    </div>
    <v-expansion-panels v-model="panel1" class="accordionWithoutBorder mt-2">
      <v-expansion-panel elevation="0">
        <v-expansion-panel-title class="text-h5 pa-0 pb-3" color="surface">Information</v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-list density="compact" class="pa-0" aria-label="information list" aria-busy="true" nav>
            <v-list-item class="pa-0">
              <div class="d-flex">
                <p class="mb-0 text-h6">Address</p>
                <p class="mb-0 text-h6 text-lightText ms-auto">Afghanistan</p>
              </div>
            </v-list-item>
            <v-list-item class="pa-0">
              <div class="d-flex">
                <p class="mb-0 text-h6">Email</p>
                <p class="mb-0 text-h6 text-lightText ms-auto">keefe@gmil.com</p>
              </div>
            </v-list-item>
            <v-list-item class="pa-0">
              <div class="d-flex">
                <p class="mb-0 text-h6">Phone</p>
                <p class="mb-0 text-h6 text-lightText ms-auto">253-418-5940</p>
              </div>
            </v-list-item>
            <v-list-item class="pa-0">
              <div class="d-flex">
                <p class="mb-0 text-h6">Last visited</p>
                <p class="mb-0 text-h6 text-lightText ms-auto">1:20 AM</p>
              </div>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div class="d-flex justify-space-between align-center mt-4 mb-1">
      <h5 class="text-h5 mb-0">Notification</h5>
      <v-switch color="primary" aria-label="switch" class="switchRight" :model-value="true" hide-details></v-switch>
    </div>
    <v-divider></v-divider>
    <div class="d-flex justify-space-between align-center py-2">
      <h5 class="text-h5 mb-0">File type</h5>
      <v-btn icon rounded="md" aria-label="menu" variant="text" size="small">
        <SvgSprite name="custom-more-outline" class="text-lightText" style="width: 20px; height: 20px" />
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list density="compact" lines="two" aria-label="files list" aria-busy="true">
      <v-list-item v-for="(file, i) in attach" :key="i" rounded="sm" color="secondary" class="pa-0">
        <template v-slot:prepend>
          <div class="me-3">
            <v-avatar size="40" :color="file.color" variant="tonal" rounded="md">
              <SvgSprite :name="file.icon || ''" :class="'text-' + file.color" style="width: 20px; height: 20px" />
            </v-avatar>
          </div>
        </template>
        <template v-slot:append>
          <v-btn icon size="x-small" aria-label="arrow" variant="text" rounded="md">
            <SvgSprite name="custom-chevron-outline" class="text-lightText" style="width: 16px; height: 16px" />
          </v-btn>
        </template>
        <div class="w-100">
          <h6 class="text-h6 mb-0">{{ file.name }}</h6>
          <span class="text-h6 text-lightText">{{ file.size }}</span>
        </div>
      </v-list-item>
    </v-list>
  </div>
</template>
<style lang="scss">
.accordionWithoutBorder {
  .v-expansion-panel {
    border: none;
    .v-expansion-panel-title {
      border-bottom: 1px solid rgb(var(--v-theme-borderLight));
      min-height: unset;
      &:hover {
        > .v-expansion-panel-title__overlay {
          opacity: 0;
        }
      }
    }
    &.v-expansion-panel--active {
      .v-expansion-panel-title--active {
        .v-expansion-panel-title__overlay {
          background: transparent;
        }
      }
    }
    .v-expansion-panel-text__wrapper {
      border-top: none;
      padding: 0;
      padding-top: 15px;
    }
  }
}
</style>
