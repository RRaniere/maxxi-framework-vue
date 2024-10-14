<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const menulist = ref(['Today', 'Weekly', 'Monthly']);

const tasks = shallowRef([
  {
    color: 'warning',
    name: 'Introduction for client',
    task: '2'
  },
  {
    color: 'primary',
    name: 'Creating wireframes',
    task: '8'
  }
]);
</script>
<template>
  <v-card variant="outlined" class="bg-surface" rounded="lg">
    <v-card-text class="pb-2">
      <div class="d-flex justify-space-between align-center">
        <h5 class="text-h5 mb-0">Add new task</h5>
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
    <v-card-item class="pt-0">
      <v-list class="pb-0 pt-1" aria-label="task" aria-busy="true">
        <v-list-item class="pa-0">
          <template v-slot:prepend>
            <v-avatar variant="tonal" color="success" rounded="md">
              <SvgSprite name="custom-list-outline" style="width: 20px; height: 20px" />
            </v-avatar>
          </template>
          <h5 class="text-h5 mb-0">New Task <v-chip color="secondary" class="ms-1" size="small" variant="tonal">20</v-chip></h5>
        </v-list-item>
      </v-list>
      <div class="d-flex justify-space-between py-2">
        <p class="text-body-1 mb-0">Tasks done</p>
        <p class="text-body-1 mb-0">42%</p>
      </div>
      <v-progress-linear aria-label="progressbar" rounded color="primary" model-value="50" height="6"></v-progress-linear>
      <v-list class="py-5" aria-label="task list" aria-busy="true">
        <v-list-item class="no-spacer" v-for="(item, i) in tasks" :key="i" :value="item" rounded="md">
          <template v-slot:prepend>
            <v-avatar size="8" :color="item.color" variant="flat" class="me-3"> </v-avatar>
          </template>
          <h6 class="text-h6 mb-0">{{ item.name }}</h6>
          <template v-slot:append>
            <v-chip size="small" rounded="md">
              <template v-slot:prepend>
                <SvgSprite name="custom-link1" class="me-1" style="width: 12px; height: 12px" />
              </template>
              {{ item.task }}
            </v-chip>
          </template>
        </v-list-item>
      </v-list>
      <v-btn color="primary" rounded="md" block>
        <template v-slot:prepend>
          <SvgSprite name="custom-plus" style="width: 18px; height: 18px" />
        </template>
        Add task
      </v-btn>
    </v-card-item>
  </v-card>
</template>
