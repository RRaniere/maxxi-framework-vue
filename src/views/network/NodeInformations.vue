<script setup lang="ts">

import { defineProps } from 'vue';
import { ref } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  root: { type: Boolean, default: false },
  username: { type: String, default: null },
  parentUsername: { type: String, default: null },
  sponsorUsername: { type: String, default: null },
  level: { type: Number, default: null },
  position: { type: Number, default: null },
  status: { type: String, default: null },
});

</script>

<template>

<v-dialog max-width="400" v-model="props.show">
        <v-card 
        :title="props.username"
        >
            <v-card-text>
                <div class="">
                    <v-row class="">
                        <v-col cols="6">
                            <v-row >
                                <v-col cols="12">
                                    <span class="text-subtitle-2 text-disabled font-weight-medium">Sponsor</span>
                                    <p class="text-subtitle-2 font-weight-medium">
                                        {{props.sponsorUsername}}
                                    </p>
                                </v-col>
                                <v-col cols="12">
                                    <span class="text-subtitle-2 text-disabled font-weight-medium">Parent</span>
                                    <p class="text-subtitle-2 font-weight-medium">
                                        {{ props.parentUsername }}
                                    </p>
                                </v-col>
                                <v-col cols="12">
                                    <span class="text-subtitle-2 text-disabled font-weight-medium">Activation Date:</span>
                                    <p class="text-subtitle-2 font-weight-medium">
                                        20/09/2024
                                    </p>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="6">
                            <v-row >
                                <v-col cols="12">
                                    <img src="" alt="">
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
              </v-card-text>
            <v-card-actions>
            <!-- <v-btn color="primary" block @click="show = false">Close</v-btn> -->
            </v-card-actions>
        </v-card>
    </v-dialog>
</template> 


