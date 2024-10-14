<script setup lang="ts">
import { shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
const props = defineProps({
  task: Object
});
const items = shallowRef([
  {
    title: 'Edit'
  },
  {
    title: 'Delete'
  }
]);
</script>
<template>
  <v-card variant="outlined" class="bg-surface cursor-move" rounded="lg">
    <v-card-text class="pa-4">
      <div class="d-flex align-start ga-2">
        <div class="d-block text-truncate">
          <h5 class="text-subtitle-1 text-truncate mb-0">{{ props.task?.title }}</h5>
          <a class="text-primary text-caption d-flex align-center cursor-pointer">
            <SvgSprite name="custom-user-story-outline" class="me-1" style="width: 16px; height: 16px" /> User Story #{{
              props.task?.userStory
            }}
          </a>
        </div>
        <v-btn icon size="x-small" aria-label="menu" variant="text" rounded="md" class="ms-auto">
          <SvgSprite name="custom-more-outline" class="text-lightText" style="width: 16px; height: 16px; transform: rotate(90deg)" />
          <v-menu activator="parent" class="rounded-md" location="start">
            <v-list density="compact" elevation="24" class="py-0">
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </div>
      <img v-if="task?.image" :src="props.task?.image" class="w-100 mt-3 rounded-lg" alt="Avatar" />
    </v-card-text>
  </v-card>
</template>
<style>
.cursor-move {
  cursor: move;
}
</style>
