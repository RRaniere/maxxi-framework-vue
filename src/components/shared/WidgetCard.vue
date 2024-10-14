<script setup lang="ts">
const props = defineProps({
  title: String,
  subtitle: String
});
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- Card with Header & Footer -->
  <!-- -------------------------------------------------------------------- -->
  <v-card variant="outlined" elevation="0" class="bg-surface mb-6 overflow-hidden" rounded="lg">
    <v-card-item>
      <v-card-title class="text-h6">{{ props.title }}</v-card-title>
      <p class="text-caption text-lightText mb-0">{{ props.subtitle }}</p>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
