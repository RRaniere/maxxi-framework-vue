<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Activator -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption text-grey-darken-1">
    In addition using the <b>activator</b> slot, we can instead use the <b>activator</b> prop to activate a dialog. By placing the dialog
    component inside the button, and setting the <b>activator</b> prop value to <b>“parent”</b> we can designate the parent (button) as the
    activator.
  </p>
  <div class="text-center mt-4">
    <v-btn color="primary" variant="flat">
      Open Dialog

      <v-dialog v-model="dialog" activator="parent">
        <v-card>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Dialog</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-btn>
  </div>
</template>
