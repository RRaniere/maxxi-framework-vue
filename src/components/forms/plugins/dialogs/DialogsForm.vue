<script setup lang="ts">
import { ref } from 'vue';

const dialog = ref(false);
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Form -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-caption text-grey-darken-1">A simple example of a form in a dialog.</p>
  <div class="text-center mt-6">
    <v-dialog v-model="dialog" persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" variant="flat" v-bind="props"> Open Dialog </v-btn>
      </template>
      <v-card style="height: 300px" class="overflow-auto">
        <v-card-title class="pa-5">
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-label class="mb-2">Legal first name*</v-label>
                <v-text-field single-line variant="outlined" placeholder="Enter first name*" required rounded="0"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-label class="mb-2">Legal middle name</v-label>
                <v-text-field
                  single-line
                  variant="outlined"
                  placeholder="Enter middle name"
                  hint="example of helper text only on focus"
                  rounded="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-label class="mb-2">Legal last name*</v-label>
                <v-text-field
                  placeholder="Enter last name*"
                  single-line
                  variant="outlined"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  rounded="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Email*</v-label>
                <v-text-field single-line variant="outlined" placeholder="Enter your email*" required rounded="0"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-label class="mb-2">Password*</v-label>
                <v-text-field
                  single-line
                  variant="outlined"
                  placeholder="Enter your Password*"
                  type="password"
                  required
                  rounded="0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="mb-2">Age*</v-label>
                <v-select
                  single-line
                  role="link"
                  variant="outlined"
                  :items="['0-17', '18-29', '30-54', '54+']"
                  placeholder="Enter Age"
                  required
                  rounded="0"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-label class="mb-2">Interests</v-label>
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  single-line
                  variant="outlined"
                  multiple
                  rounded="0"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" variant="text" @click="dialog = false"> Close </v-btn>
          <v-btn color="success" variant="text" @click="dialog = false"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
