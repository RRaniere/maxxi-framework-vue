<script setup lang="ts">
import { ref } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

const dialog = ref(false);
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Fullscreen -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption text-grey-darken-1">
    Due to limited space, full-screen dialogs may be more appropriate for mobile devices than dialogs used on devices with larger screens.
  </p>
  <div class="text-center mt-6">
    <v-dialog v-model="dialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" variant="flat" dark v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card rounded="0">
        <v-toolbar dark color="primary" style="flex: unset">
          <v-btn icon color="inherit" aria-label="close" size="small" @click="dialog = false">
            <SvgSprite name="custom-close" style="width: 20px; height: 20px; transform: rotate(45deg)" />
          </v-btn>
          <v-toolbar-title class="text-h6">Set Backup Account</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark variant="text" @click="dialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-item>
          <v-list lines="two" subheader aria-label="list" aria-busy="true" border>
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar size="40" variant="outlined" color="surface">
                  <img src="@/assets/images/users/avatar-1.png" width="40" alt="vector" />
                </v-avatar>
              </template>
              <h6 class="text-h6 mb-0">Phone ringtone</h6>
              <span class="text-caption text-lightText">Default</span>
            </v-list-item>
            <v-list-item>
              <template v-slot:prepend>
                <v-avatar size="40" variant="outlined" color="surface">
                  <img src="@/assets/images/users/avatar-2.png" width="40" alt="vector" />
                </v-avatar>
              </template>
              <h6 class="text-h6 mb-0">Default notification ringtone</h6>
              <span class="text-caption text-lightText">Tethys</span>
            </v-list-item>
          </v-list>
        </v-card-item>
      </v-card>
    </v-dialog>
  </div>
</template>
