<template>
  <div class="logo">
    <RouterLink to="/dashboard/analytics" aria-label="logo">
      <img src="../../../../public/assets/images/logo/logo.png" alt="" width="200px">
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const primary = ref('rgb(var(--v-theme-primary))');
</script>
