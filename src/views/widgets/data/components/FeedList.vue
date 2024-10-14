<script setup lang="ts">
import { shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const feeds = shallowRef([
  {
    color: 'primary',
    icon: 'custom-mail-fill',
    name: 'You have 3 pending tasks.',
    time: 'just now'
  },
  {
    color: 'error',
    icon: 'custom-shopping-cart-fill',
    name: 'New order received',
    time: '1 day ago'
  },
  {
    color: 'success',
    icon: 'custom-file-text-fill',
    name: 'You have 3 pending tasks.',
    time: '3 week ago'
  },
  {
    color: 'primary',
    icon: 'custom-mail-fill',
    name: 'New order received',
    time: 'around month'
  },
  {
    color: 'warning',
    icon: 'custom-shopping-cart-fill',
    name: 'Order cancelled',
    time: '2 month ago'
  }
]);
</script>

<template>
  <v-list class="py-3 px-2" lines="two" density="compact" aria-label="feeds" aria-busy="true">
    <v-list-item v-for="(feed, i) in feeds" :key="i" class="no-spacer">
      <template v-slot:prepend>
        <v-avatar size="32" :color="feed.color" variant="flat" class="me-3 py-2">
          <SvgSprite :name="feed.icon || ''" class="text-surface" style="width: 18px; height: 18px" />
        </v-avatar>
      </template>
      <div class="d-inline-flex align-center justify-space-between w-100">
        <p class="text-caption mb-0">{{ feed.name }}</p>
        <p class="text-caption text-lightText ms-auto mb-0">{{ feed.time }}</p>
      </div>
    </v-list-item>
  </v-list>
</template>
