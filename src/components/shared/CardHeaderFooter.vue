<script setup lang="ts">
const props = defineProps({
  title: String
});
</script>

<template>
  <!-- -------------------------------------------------------------------- -->
  <!-- Card with Header & Footer -->
  <!-- -------------------------------------------------------------------- -->
  <v-card variant="outlined" elevation="0" class="bg-surface">
    <v-card-item>
      <v-card-title class="text-h6">{{ props.title }}</v-card-title>
    </v-card-item>
    <v-divider></v-divider>
    <v-card-text>
      <slot />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <slot name="footer" />
    </v-card-actions>
  </v-card>
</template>
