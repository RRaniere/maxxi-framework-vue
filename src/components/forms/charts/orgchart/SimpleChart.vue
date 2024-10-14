<script setup>
//This is for Chart data
import data from './data.ts';
import { ref } from 'vue';
import { VueFlow } from '@vue-flow/core';
import { Controls } from '@vue-flow/controls';

const ds = ref(data);
</script>

<template>
  <div>
    <VueFlow v-model="ds" :default-zoom="1.2" :min-zoom="0.2" :max-zoom="4">
      <Controls />
    </VueFlow>
  </div>
</template>
<style>
/* import the required styles */
@import '@vue-flow/core/dist/style.css';
/* import the default theme (optional) */
@import '@vue-flow/core/dist/theme-default.css';
@import 'https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css';
:root {
  --vf-node-bg: transparent;
  --vf-node-text: inherit;
  --vf-connection-path: rgb(var(--v-theme-secondary));
  --vf-handle: rgba(85, 85, 85, 0.386);
}
.vue-flow {
  min-height: 500px;
  [dir='rtl'] & {
    direction: ltr;
  }
}
</style>
