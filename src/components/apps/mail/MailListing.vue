<script setup lang="ts">
import { ref, shallowRef, onMounted, computed } from 'vue';
import SvgSprite from '@/components/shared/SvgSprite.vue';
import { useMailStore } from '@/stores/apps/mail';

// third-party
import { format } from 'date-fns';
import MailDetail from './MailDetail.vue';

const store = useMailStore();

onMounted(() => {
  store.fetchMails();
  store.filterMails(store.activeFilter);
});

type MailItem = {
  id: number;
  isChecked: boolean;
  isRead: boolean;
  starred: boolean;
  important: boolean;
  profile: {
    avatar: string;
    name: string;
  };
  subject: string;
  promotions: string;
  forums: string;
  attachments: string;
  time: number;
  // Add other properties as needed
};
const getMails = computed<MailItem[]>(() => {
  return store.mails;
});

const searchValue = ref('');
const compact = ref(false);
const sorting = shallowRef([{ title: 'Name' }, { title: 'Date' }, { title: 'Rating' }, { title: 'Unread' }]);

const emailDetails = ref(false);
const selectedMail = ref<MailItem | null>(null);

const handleFilter = async (string: string) => {
  store.SelectFilter(string);
  await store.filterMails(string);
};

const handleImportantChange = async (id: string) => {
  await store.setImportant(id);
  handleFilter(store.activeFilter);
};
const handleStarredChange = async (id: string) => {
  if (id) {
    await store.setStarred(id);
    handleFilter(store.activeFilter);
  }
};
const countSelectedMail = computed(() => {
  return getMails.value.filter((i) => i.isChecked).length;
});

const handleUserChange = async (data: MailItem | null) => {
  if (data) {
    await store.setRead(data.id.toString()); // Ensure id is converted to string if necessary
    handleFilter(store.activeFilter);
    emailDetails.value = true;
    selectedMail.value = data;
  }
};
const filteredMails = computed(() => {
  return getMails.value.filter((mail) => {
    return mail.profile.name.toLowerCase().includes(searchValue.value.toLowerCase());
  });
});

defineEmits(['sToggle']);
</script>
<template>
  <div v-if="!emailDetails">
    <!---Topbar Row-->
    <div class="pa-3 d-flex align-center">
      <v-btn icon size="small" aria-label="menu" class="d-lg-block d-none" rounded="md" variant="text" @click="$emit('sToggle')"
        ><SvgSprite name="custom-menu-outline" style="width: 18px; height: 18px"
      /></v-btn>
      <v-btn icon size="small" aria-label="fullscreen" rounded="md" flat @click="compact = !compact"
        ><SvgSprite name="custom-full-screen-outline" style="width: 16px; height: 16px"
      /></v-btn>
      <v-btn icon size="small" aria-label="menu" rounded="md" flat id="menu-activator"
        ><SvgSprite name="custom-more-outline" style="width: 16px; height: 16px"
      /></v-btn>
      <v-menu activator="#menu-activator" width="100" rounded="md">
        <v-list density="compact" elevation="24" aria-label="list" aria-busy="true" rounded="md">
          <v-list-item v-for="(item, index) in sorting" :key="index" :value="index">
            <v-list-item-title class="text-body-1">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="ms-auto">
        <v-text-field
          variant="outlined"
          v-model="searchValue"
          persistent-placeholder
          placeholder="Search Mail"
          hide-details
          density="comfortable"
          class="max-width-230"
        >
          <template v-slot:prepend-inner>
            <SvgSprite name="custom-search" class="text-lightText" style="width: 16px; height: 16px" />
          </template>
        </v-text-field>
      </div>
    </div>
    <!---End Topbar Row-->
    <v-divider />
    <!---If Mail selected-->
    <div v-if="countSelectedMail > 0" class="px-4 pt-3">
      <h3 class="text-h4 text-secondary">{{ countSelectedMail }} Mail Selected</h3>
    </div>
    <!---Mail Listing Table-->
    <v-table class="mt-3 mailTable bordered-table">
      <tbody>
        <tr
          v-for="mail in filteredMails"
          :key="mail.id"
          :class="`cursor-pointer ${mail.isChecked ? 'bg-lightprimary' : ''} ${
            mail.isRead ? 'text-medium-emphasis' : 'font-weight-medium'
          }`"
        >
          <td :class="`checkboxWidth d-table ${compact ? 'py-1' : 'py-2'}`">
            <v-checkbox v-model="mail.isChecked" aria-label="checkbox" hide-details color="primary"></v-checkbox>
          </td>
          <td :class="`checkboxWidth ${compact ? 'py-1' : 'py-2'}`">
            <v-btn icon size="small" aria-label="starred" rounded="md" flat @click="handleStarredChange(`${mail.id}`)">
              <SvgSprite v-if="mail.starred" name="custom-star-outline" class="text-warning" style="width: 16px; height: 16px" />
              <SvgSprite v-else name="custom-star-outline" style="width: 16px; height: 16px" />
            </v-btn>
          </td>
          <td width="30" :class="`${compact ? 'py-1' : 'py-2'}`">
            <v-btn icon size="small" aria-label="tag" rounded="md" flat @click="handleImportantChange(`${mail.id}`)">
              <SvgSprite v-if="mail.important" name="custom-tag-fill" class="text-primary" style="width: 16px; height: 16px" />
              <SvgSprite v-else name="custom-tag-outline" class="text-lightText" style="width: 16px; height: 16px" />
            </v-btn>
          </td>
          <td @click="handleUserChange(mail)" :class="`${compact ? 'py-1' : 'py-2'}`">
            <img :src="mail.profile.avatar" class="rounded-md" :alt="mail.profile.avatar" width="36" />
          </td>
          <td :class="`text-no-wrap text-subtitle-1 ${compact ? 'py-1' : 'py-2'}`" @click="handleUserChange(mail)">
            {{ mail.profile.name }}
          </td>
          <td @click="handleUserChange(mail)" :class="`${compact ? 'py-1' : 'py-2'}`">
            <div class="d-flex align-center ga-2">
              <div class="text-no-wrap text-truncate text-h6">{{ mail.subject }}</div>
              <v-chip size="small" color="primary" v-if="mail.promotions">Promotions</v-chip>
              <v-chip size="small" color="warning" v-if="mail.forums">Forums</v-chip>
              <v-btn icon aria-label="attach" v-if="mail.attachments.length > 0" size="small" rounded="md" flat>
                <SvgSprite name="custom-paper-clip-2" style="width: 16px; height: 16px" />
              </v-btn>
            </div>
          </td>
          <td :class="`text-no-wrap text-caption text-end ${compact ? 'py-1' : 'py-2'}`">
            {{ format(new Date(mail.time), 'd MMM yy HH:mm a') }}
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <!---If Email Detail-->
  <div v-if="emailDetails && selectedMail" class="pa-5">
    <MailDetail @toggleDetail="emailDetails = false" :selectedMail="selectedMail" />
  </div>
</template>
<style lang="scss">
.checkboxWidth {
  width: 50px;
  .v-input--density-default {
    --v-input-control-height: 50px;
  }
}
.v-table.mailTable > .v-table__wrapper > table > tbody > tr > td {
  padding: 0 8px;
}
.max-width-230 {
  width: 230px;
}
</style>
