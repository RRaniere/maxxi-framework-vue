<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Model -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption text-grey-darken-1">
    You can also trigger a dialog by simply updating the v-model, without using either <b>activator</b> slot or prop. In this case, the
    dialog will not appear to be activated by any specific element, and will simply appear in the middle of the screen.
  </p>
  <div class="text-center mt-6">
    <v-btn color="primary" variant="flat" @click="dialog = true"> Open Dialog </v-btn>

    <v-dialog v-model="dialog">
      <v-card>
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
