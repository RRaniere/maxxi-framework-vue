<script setup lang="ts">
import { shallowRef } from 'vue';

const languageDD = shallowRef([
  { title: 'English', subtext: 'UK', value: 'en' },
  { title: 'français', subtext: 'French', value: 'fr' },
  { title: 'Română', subtext: 'Romanian', value: 'ro' },
  { title: '中国人', subtext: 'Chinese', value: 'zh' }
]);
</script>

<template>
  <!-- ---------------------------------------------- -->
  <!-- language DD -->
  <!-- ---------------------------------------------- -->
  <v-list class="px-2" aria-label="language list" aria-busy="true">
    <v-list-item
      v-for="(item, index) in languageDD"
      :key="index"
      color="primary"
      rounded="md"
      :active="$i18n.locale == item.value"
      class="d-flex align-center"
      @click="() => ($i18n.locale = item.value)"
    >
      <v-list-item-title class="text-h6">
        {{ item.title }}
        <span class="text-lightText text-caption pl-2">({{ item.subtext }})</span>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
