<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

import Avatar1 from '@/assets/images/users/avatar-1.png';
import Avatar2 from '@/assets/images/users/avatar-2.png';
import Avatar3 from '@/assets/images/users/avatar-3.png';
import Avatar4 from '@/assets/images/users/avatar-4.png';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const teams = shallowRef([
  {
    avatar: Avatar1,
    name: 'David Jones',
    time: '5 min ago',
    role: 'Project Leader'
  },
  {
    avatar: Avatar2,
    name: 'David Jones',
    time: '1 hour ago',
    role: 'HR Manager'
  },
  {
    avatar: Avatar3,
    name: 'David Jones',
    time: 'Yesterday',
    role: 'Developer'
  },
  {
    avatar: Avatar4,
    name: 'David Jones',
    time: '02-05-2022',
    role: 'UI/UX Designer'
  }
]);
</script>

<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-1">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Team Members</h5>
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
      <v-list lines="two" class="py-0 border-0" rounded="lg" aria-label="member list" aria-busy="true" border>
        <v-list-item v-for="(team, i) in teams" :key="i" rounded="0" class="no-spacer px-6">
          <template v-slot:prepend>
            <v-avatar size="52" class="me-3 py-2" rounded="md">
              <img :src="team.avatar" width="52" alt="Julia" />
            </v-avatar>
          </template>
          <div class="d-inline-flex align-center justify-space-between w-100">
            <div>
              <h6 class="text-subtitle-1 mb-0">{{ team.name }}</h6>
              <p class="text-body-1 mb-0">{{ team.role }}</p>
            </div>
            <span class="text-body-1 text-lightText">{{ team.time }}</span>
          </div>
        </v-list-item>
      </v-list>
    </v-card-item>
  </v-card>
</template>
