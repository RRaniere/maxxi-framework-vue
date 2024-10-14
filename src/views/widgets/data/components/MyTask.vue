<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const taskData = shallowRef([
  {
    title: 'Follow up client for feedback',
    content: 'Sending report',
    icon: 'custom-send-outline-1',
    color: 'error',
    color1: 'success',
    name: 'Incoming requests'
  },
  {
    title: 'Follow up client for feedback',
    content: 'Sending report',
    icon: 'custom-folder-outline',
    color: 'success',
    color1: 'secondary',
    name: 'You have 2 pending requests..'
  },
  {
    title: 'Follow up client for feedback',
    content: 'Received report',
    icon: 'custom-send-outline-1',
    color: 'error',
    color1: 'secondary',
    name: 'You have 3 pending tasks'
  }
]);
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">My Task</h5>
        <v-menu width="150">
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
    <v-card-item class="pa-0">
      <v-list border rounded="lg" class="pt-0 border-0" aria-label="task list" aria-busy="true">
        <v-list-item class="py-3 px-6" v-for="(item, i) in taskData" :key="i">
          <h6 class="text-subtitle-1 mb-0">{{ item.title }}</h6>
          <div class="d-flex align-center mb-1">
            <SvgSprite :name="item.icon || ''" style="width: 12px; height: 12px" />
            <p class="text-body-1 mb-0 ms-1">{{ item.content }}</p>
          </div>
          <v-chip :color="item.color" size="small" variant="flat">00:15</v-chip>
          <template v-slot:append>
            <v-btn icon rounded="md" aria-label="check" :color="item.color1" size="small" variant="text">
              <SvgSprite name="custom-circle-check-outline" style="width: 20px; height: 20px" />
            </v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>
