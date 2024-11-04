<script setup lang="ts">

import ManageTwoFa from '@/views/profile/components/ManageTwoFa.vue';
import ManagePasskeys from './components/ManagePasskeys.vue';

</script>

<template>
  <v-row >
    
      <v-col cols="12">
        <ManageTwoFa />
      </v-col>
      <v-col cols="12">
        <ManagePasskeys />
      </v-col>


  </v-row>


</template>
