<script setup lang="ts">
import { shallowRef } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';

// third-party
import { format } from 'date-fns';
const props = defineProps({
  selectedMail: Object || Array
});
const sorting = shallowRef([{ title: 'Name' }, { title: 'Date' }, { title: 'Rating' }, { title: 'Unread' }]);

defineEmits(['toggleDetail']);
</script>

<template>
  <div class="topbarMail d-flex ga-4 align-center w-100">
    <v-btn icon rounded="md" flat @click="$emit('toggleDetail')" size="small"
      ><SvgSprite name="custom-chevron-outline" style="width: 16px; height: 16px; transform: rotate(180deg)"
    /></v-btn>
    <div class="d-flex align-center ga-4 w-100">
      <img :src="props.selectedMail?.profile.avatar" class="rounded-md" :alt="props.selectedMail?.profile.avatar" width="40" />
      <div>
        <h4 class="text-md-h4 text-h5 mb-n1">{{ props.selectedMail?.profile.name }}</h4>
        <small>From: {{ props.selectedMail?.profile.email }}</small>
      </div>
      <div class="ms-auto text-subtitle-2 text-medium-emphasis">{{ format(new Date(selectedMail?.time!), 'd MMM') }}</div>
    </div>
  </div>
  <div class="d-flex align-center ga-2 mt-3">
    <h3 class="text-lg-h3 text-h5 py-4 me-auto">{{ selectedMail?.subject }}</h3>
    <v-btn icon size="small" flat rounded="md">
      <SvgSprite v-if="selectedMail?.starred" name="custom-star-outline" class="text-warning" style="width: 16px; height: 16px" />
      <SvgSprite v-else name="custom-star-outline" style="width: 16px; height: 16px" />
    </v-btn>
    <v-btn icon size="small" flat rounded="md">
      <SvgSprite v-if="selectedMail?.important" name="custom-tag-fill" class="text-secondary" style="width: 16px; height: 16px" />
      <SvgSprite v-else name="custom-tag-outline" style="width: 16px; height: 16px" />
    </v-btn>
    <v-btn icon size="small" aria-label="menu" flat id="menu-activator" rounded="md"
      ><SvgSprite name="custom-more-outline" style="width: 16px; height: 16px"
    /></v-btn>
    <v-menu activator="#menu-activator" width="100" rounded="md">
      <v-list elevation="24" density="compact" aria-label="list" aria-busy="true" class="py-0" rounded="md">
        <v-list-item v-for="(item, index) in sorting" :key="index" :value="index">
          <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
  <div class="py-4 text-subtitle-1 font-weight-light">
    Dear {{ selectedMail?.profile.name }},<br /><br />
    <p>{{ selectedMail?.message }}</p>
    <br />
    <p>Kindly Regards,</p>
    <p>{{ selectedMail?.sender.name }}</p>
  </div>
  <div class="py-3">
    <h5 class="text-h5">
      <SvgSprite name="custom-paper-clip-2" style="width: 16px; height: 16px; vertical-align: -3px" />
      {{ selectedMail?.attachments.length }} Attachement
    </h5>
    <v-row class="mt-4">
      <v-col cols="6" sm="3" v-for="attach in selectedMail?.attachments" :key="attach.title">
        <v-card class="overflow-hidden" variant="outlined">
          <v-img :src="attach.image" height="100px" cover></v-img>
          <div class="pa-3">
            <div class="d-flex align-center">
              <h5 class="me-auto text-truncate">{{ attach.title }}</h5>
              <v-btn icon size="small" flat rounded="md"
                ><SvgSprite name="custom-download-outline" style="width: 16px; height: 16px"
              /></v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
  <div class="py-3 d-flex ga-4">
    <v-btn color="primary" variant="outlined" rounded="md"
      ><SvgSprite name="custom-edit-outline" class="me-1" style="width: 16px; height: 16px" /> Reply</v-btn
    >
    <v-btn color="primary" variant="outlined" rounded="md"
      ><SvgSprite name="custom-forward-outline" class="me-1" style="width: 16px; height: 16px" /> Forward</v-btn
    >
  </div>
</template>
